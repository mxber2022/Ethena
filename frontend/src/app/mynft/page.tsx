// components/UserNFTs.tsx
"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { apolloclient_NFT } from "../lib/apolloclient";
import { gql } from "@apollo/client";
import { useWriteContract } from "wagmi";
import { nft_abi } from "./nft_abi";
import { marketplace_abi } from "./marketplace_abi";
import myconfig from "../../../myconfig.json";
import { Address } from "viem";

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
  const { writeContract, data: mydata, status } = useWriteContract();

  const [prices, setPrices] = useState<Record<string, string>>({});

  if (!isConnected || !address) {
    return (
      <div style={styles.message}>
        Please connect your wallet to see your NFTs.
      </div>
    );
  }

  const { data, loading, error } = useQuery(GET_USER_NFTS, {
    client: apolloclient_NFT,
    variables: { owner: address.toLowerCase() }, // Normalize address
  });

  if (loading) return <div style={styles.message}>Loading NFTs...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  const handleListToMarketplace = async (nft: any) => {
    const price = prices[nft.tokenId];
    if (!price || isNaN(Number(price))) {
      alert("Please enter a valid price.");
      return;
    }

    console.log(
      `Listing NFT (Token ID: ${nft.tokenId}) to marketplace with price: ${price}...`
    );

    writeContract({
      abi: nft_abi,
      address: myconfig.NFT_CONTRACT_ADDRESS as Address,
      functionName: "approve",
      args: [myconfig.MARKET_PLACE, nft.tokenId],
    });
    console.log("status", status);

    writeContract({
      abi: marketplace_abi,
      address: myconfig.MARKET_PLACE as Address,
      functionName: "createListing",
      args: [nft.tokenId, myconfig.NFT_CONTRACT_ADDRESS, price],
    });
  };

  const handlePriceChange = (tokenId: string, value: string) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [tokenId]: value,
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User's NFTs</h2>
      <div style={styles.grid}>
        {data?.transfers?.length > 0 ? (
          data.transfers.map((nft: any) => (
            <div key={nft.id} style={styles.card}>
              <h3 style={styles.tokenId}>Token ID: {nft.tokenId}</h3>
              <p style={styles.detail}>
                <strong>From:</strong> {nft.from}
              </p>
              <p style={styles.detail}>
                <strong>To:</strong> {nft.to}
              </p>
              <input
                type="text"
                placeholder="Enter listing price"
                value={prices[nft.tokenId] || ""}
                onChange={(e) => handlePriceChange(nft.tokenId, e.target.value)}
                style={styles.input}
              />
              <button
                style={styles.button}
                onClick={() => handleListToMarketplace(nft)}
              >
                List to Marketplace
              </button>
            </div>
          ))
        ) : (
          <div style={styles.message}>No NFTs found for this address.</div>
        )}
      </div>
    </div>
  );
};

// CSS-in-JS Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  tokenId: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  detail: {
    fontSize: "14px",
    color: "#555",
    margin: "5px 0",
  },
  input: {
    marginTop: "10px",
    padding: "8px",
    fontSize: "14px",
    width: "80%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  message: {
    textAlign: "center",
    fontSize: "16px",
    color: "#666",
    gridColumn: "span 3",
  },
  error: {
    textAlign: "center",
    fontSize: "16px",
    color: "red",
  },
};

// Add hover and interaction effects
//@ts-ignore
styles.card[":hover"] = {
  transform: "scale(1.05)",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
};
//@ts-ignore
styles.button[":hover"] = {
  backgroundColor: styles.buttonHover.backgroundColor,
};

export default UserNFTs;
