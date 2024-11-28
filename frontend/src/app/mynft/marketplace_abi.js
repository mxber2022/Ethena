module.exports = {
  marketplace_abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_usdeTokenAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "marketplaceId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "listPrice",
          type: "uint256",
        },
      ],
      name: "ListingCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "marketplaceId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "ListingSold",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "marketplaceItemId",
          type: "uint256",
        },
      ],
      name: "buyListing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "createListing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "marketplaceItemId",
          type: "uint256",
        },
      ],
      name: "getMarketItem",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "marketplaceId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "nftAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "address payable",
              name: "seller",
              type: "address",
            },
            {
              internalType: "address payable",
              name: "owner",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "listPrice",
              type: "uint256",
            },
          ],
          internalType: "struct USDeMarketplace.Listing",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getMyListedNFTs",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "marketplaceId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "nftAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "address payable",
              name: "seller",
              type: "address",
            },
            {
              internalType: "address payable",
              name: "owner",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "listPrice",
              type: "uint256",
            },
          ],
          internalType: "struct USDeMarketplace.Listing[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "usdeToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
