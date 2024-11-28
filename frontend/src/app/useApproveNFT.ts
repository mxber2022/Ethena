// import { useWriteContract } from "wagmi";
// import { BigNumber } from "ethers";

// interface ApproveNFTProps {
//   contractAddress: string; // NFT contract address
//   abi: any; // ABI of the NFT contract
//   approvedAddress: string; // Address to approve
//   tokenId: string; // Token ID to approve
// }

// export function approveNFT({
//   contractAddress,
//   abi,
//   approvedAddress,
//   tokenId,
// }: ApproveNFTProps) {
//   const { writeContract } = useWriteContract();

//   const x = writeContract({
//     abi: abi,
//     functionName: "approve",
//     args: [tokenId],
//   });

//   return {
//     writeContract,
//     data,
//     isSuccess,
//     error,
//   };
// }
