"use client";
import React, { useEffect, useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { readContract } from "wagmi/actions";
import { marketplace_abi } from "../../mynft/marketplace_abi";
import { nft_abi } from "../../mynft/nft_abi";
import myconfig from "../../../../myconfig.json";
import { Address } from "viem";
import { config } from "@/app/mynft/config";

function GetMarketPlaceNFT() {
  const [marketplaceNFTs, setMarketplaceNFTs] = useState<any[]>([]);
  const [currentId, setCurrentId] = useState(1); // Start fetching from ID 1
  const [isFetching, setIsFetching] = useState(true);
  const [tokenURIs, setTokenURIs] = useState<Record<number, string>>({});

  const { data, isError } = useReadContract({
    abi: marketplace_abi,
    address: myconfig.MARKET_PLACE as Address,
    functionName: "getMarketItem",
    args: [currentId],
  });

  const { writeContract } = useWriteContract();

  useEffect(() => {
    const fetchTokenURIs = async () => {
      const uris: Record<number, string> = {};
      for (const nft of marketplaceNFTs) {
        try {
          const tokenURI = await readContract(config, {
            abi: nft_abi,
            address: nft.nftAddress as Address,
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
    };

    if (marketplaceNFTs.length > 0) fetchTokenURIs();
  }, [marketplaceNFTs]);

  useEffect(() => {
    if (data) {
      const isDefaultData =
        data.tokenId.toString() === "0" &&
        data.listPrice.toString() === "0" &&
        data.seller === "0x0000000000000000000000000000000000000000" &&
        data.nftAddress === "0x0000000000000000000000000000000000000000";

      if (isDefaultData) {
        setIsFetching(false); // Stop fetching if default values are returned
        return;
      }

      // Append the fetched data to the marketplaceNFTs array
      setMarketplaceNFTs((prevNFTs) => [...prevNFTs, data]);
      setCurrentId((prevId) => prevId + 1); // Increment to fetch the next ID
    } else if (isError) {
      // Stop fetching if there's an error
      setIsFetching(false);
    }
  }, [data, isError]);

  const handleBuyNFT = async (nft: any) => {
    try {
      console.log(`Buying NFT with Token ID: ${nft.tokenId}`);
      writeContract({
        abi: marketplace_abi,
        address: myconfig.MARKET_PLACE as Address,
        functionName: "buyListing",
        args: [nft.tokenId],
      });
      alert(`NFT with Token ID: ${nft.tokenId} purchased successfully!`);
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      alert("Failed to purchase NFT. See console for details.");
    }
  };

  if (isFetching) return <p>Loading marketplace NFTs...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>NFTs Listed in the Marketplace</h2>
      {marketplaceNFTs.length > 0 ? (
        <div style={styles.grid}>
          {marketplaceNFTs.map((nft, index) => (
            <div key={index} style={styles.card}>
              <p>
                <strong>Token ID:</strong> {nft.tokenId}
              </p>
              <p>
                <strong>Price:</strong> {nft.listPrice?.toString()}{" "}
                <strong>USDe</strong>
              </p>
              <p>
                <strong>Seller:</strong> {nft.seller}
              </p>
              <p>
                <strong>Contract:</strong> {nft.nftAddress}
              </p>
              <p>
                {/* <strong>Token URI:</strong>{" "} */}
                {tokenURIs[nft.tokenId] ? (
                  <img
                    src={tokenURIs[nft.tokenId]}
                    alt={`NFT ${nft.tokenId}`}
                    style={styles.image}
                  />
                ) : (
                  "Fetching..."
                )}
              </p>
              <button style={styles.button} onClick={() => handleBuyNFT(nft)}>
                Buy NFT
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found in the marketplace.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxWidth: "250px",
    height: "250px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
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
};

export default GetMarketPlaceNFT;
