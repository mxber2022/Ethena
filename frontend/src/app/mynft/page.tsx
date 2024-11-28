"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { apolloclient_NFT } from "../lib/apolloclient";
import { gql } from "@apollo/client";
import { useWriteContract } from "wagmi";
import { readContract } from "wagmi/actions";
import { nft_abi } from "./nft_abi";
import { marketplace_abi } from "./marketplace_abi";
import myconfig from "../../../myconfig.json";
import { Address } from "viem";
import { config } from "./config";
import { parseEther } from "viem";
import styles from "./page.module.css";

// Define the GraphQL query to fetch user NFTs
const GET_USER_NFTS = gql`
  query GetUserNFTs($owner: String!) {
    transfers(where: { to: $owner }) {
      id
      from
      to
      tokenId
    }
  }
`;

const UserNFTs: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, status, data: dara } = useWriteContract();
  console.log("dara: ", dara);

  const [prices, setPrices] = useState<Record<string, string>>({});
  const [tokenURIs, setTokenURIs] = useState<Record<string, string>>({});

  const { data, loading, error } = useQuery(GET_USER_NFTS, {
    client: apolloclient_NFT,
    variables: { owner: address?.toLowerCase() || "" },
  });

  useEffect(() => {
    const fetchAllTokenURIs = async () => {
      if (data?.transfers?.length > 0) {
        const uris: Record<string, string> = {};
        for (const nft of data.transfers) {
          try {
            const tokenURI = await readContract(config, {
              abi: nft_abi,
              address: myconfig.NFT_CONTRACT_ADDRESS as Address,
              functionName: "tokenURI",
              args: [nft.tokenId],
            });
            uris[nft.tokenId] = tokenURI as string;
          } catch (error) {
            console.error(
              `Failed to fetch tokenURI for Token ID ${nft.tokenId}`,
              error
            );
          }
        }
        setTokenURIs(uris);
      }
    };

    fetchAllTokenURIs();
  }, [data]);

  if (!isConnected || !address) {
    return (
      <div style={styless.message}>
        Please connect your wallet to see your NFTs.
      </div>
    );
  }

  if (loading) return <div style={styless.message}>Loading NFTs...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div style={styless.error}>Error: {error.message}</div>;
  }
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleListToMarketplace = async (nft: any) => {
    const price = prices[nft.tokenId];
    if (!price || isNaN(Number(price))) {
      alert("Please enter a valid price.");
      return;
    }

    console.log(
      `Listing NFT (Token ID: ${nft.tokenId}) to marketplace with price: ${price}...`
    );

    await writeContract({
      abi: nft_abi,
      address: myconfig.NFT_CONTRACT_ADDRESS as Address,
      functionName: "approve",
      args: [myconfig.MARKET_PLACE, nft.tokenId],
    });

    await delay(20000);

    await writeContract({
      abi: marketplace_abi,
      address: myconfig.MARKET_PLACE as Address,
      functionName: "createListing",
      args: [nft.tokenId, myconfig.NFT_CONTRACT_ADDRESS, parseEther(price)],
    });
  };

  const handlePriceChange = (tokenId: string, value: string) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [tokenId]: value,
    }));
  };

  return (
    <div style={styless.container}>
      <div style={styless.grid}>
        {data?.transfers?.length > 0 ? (
          data.transfers.map((nft: any) => (
            <div key={nft.id} style={styless.card}>
              {/* <h3 style={styless.tokenId}>Token ID: {nft.tokenId}</h3> */}
              {/* <p style={styless.detail}>
                <strong className={`font-rajdhani font-medium`}>From:</strong>{" "}
                {nft.from}
              </p>
              <p style={styless.detail}>
                <strong>To:</strong> {nft.to}
              </p> */}
              {tokenURIs[nft.tokenId] ? (
                <img
                  src={tokenURIs[nft.tokenId]}
                  alt={`NFT ${nft.tokenId}`}
                  style={styless.image}
                />
              ) : (
                <p style={styless.detail}>Fetching...</p>
              )}

              <input
                type="text"
                placeholder="Enter listing price in USDe"
                value={prices[nft.tokenId] || ""}
                onChange={(e) => handlePriceChange(nft.tokenId, e.target.value)}
                className={`${styles.input_field} font-rajdhani font-medium`}
              />
              <button
                className={`${styles.buttonRegister} ${styles.fontRajdhani} buttonRegister`}
                onClick={() => handleListToMarketplace(nft)}
              >
                List to Marketplace
              </button>
            </div>
          ))
        ) : (
          <div style={styless.message}>No NFTs found for this address.</div>
        )}
      </div>
    </div>
  );
};

// CSS-in-JS Styles
const styless: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: " #1e2423",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tokenId: {
    fontSize: "20px",

    marginBottom: "10px",
    color: "#555",
  },
  detail: {
    fontSize: "14px",
    color: "#666",
    margin: "5px 0",
    textAlign: "center",
  },
  input: {
    marginTop: "15px",
    padding: "10px",
    fontSize: "14px",
    width: "100%",
    maxWidth: "250px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
    boxSizing: "border-box",
  },

  image: {
    width: "100%",
    maxWidth: "250px",
    height: "250px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
  },
};

export default UserNFTs;
