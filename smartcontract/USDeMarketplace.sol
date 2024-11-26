// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract USDeMarketplace is ReentrancyGuard, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private marketplaceIds;
    Counters.Counter private totalMarketplaceItemsSold;

    IERC20 public usdeToken; // Reference to the USDe stablecoin contract

    constructor(address _usdeTokenAddress) {
        usdeToken = IERC20(_usdeTokenAddress); // Initialize USDe token contract
    }

    struct Listing {
        uint marketplaceId;
        address nftAddress;
        uint tokenId;
        address payable seller;
        address payable owner;
        uint listPrice;
    }

    mapping(uint => Listing) private marketplaceIdToListingItem;

    event ListingCreated(
        uint indexed marketplaceId,
        address indexed nftAddress,
        uint indexed tokenId,
        address seller,
        address owner,
        uint listPrice
    );

    event ListingSold(
        uint indexed marketplaceId,
        address indexed nftAddress,
        uint indexed tokenId,
        address seller,
        address buyer,
        uint price
    );

    // Create a new listing for an NFT
    function createListing(
        uint tokenId,
        address nftAddress,
        uint price
    ) public nonReentrant {
        require(price > 0, "List price must be greater than zero");

        marketplaceIds.increment();
        uint marketplaceItemId = marketplaceIds.current();

        marketplaceIdToListingItem[marketplaceItemId] = Listing(
            marketplaceItemId,
            nftAddress,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price
        );

        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);

        emit ListingCreated(
            marketplaceItemId,
            nftAddress,
            tokenId,
            msg.sender,
            address(0),
            price
        );
    }

    // Buy an NFT using USDe stablecoin
    function buyListing(uint marketplaceItemId) public nonReentrant {
        Listing storage listing = marketplaceIdToListingItem[marketplaceItemId];
        require(listing.owner == address(0), "Item has already been sold");

        uint price = listing.listPrice;
        uint tokenId = listing.tokenId;

        // Ensure the buyer has enough USDe balance and has approved the marketplace to spend USDe
        require(usdeToken.allowance(msg.sender, address(this)) >= price, "Insufficient token allowance");
        require(usdeToken.balanceOf(msg.sender) >= price, "Insufficient token balance");

        // Transfer USDe tokens from buyer to seller
        require(usdeToken.transferFrom(msg.sender, listing.seller, price), "USDe token transfer failed");

        // Transfer the NFT to the buyer
        IERC721(listing.nftAddress).transferFrom(address(this), msg.sender, tokenId);

        // Update listing ownership and increase sold items counter
        listing.owner = payable(msg.sender);
        totalMarketplaceItemsSold.increment();

        emit ListingSold(marketplaceItemId, listing.nftAddress, tokenId, listing.seller, msg.sender, price);
    }

    // Get details of a listed NFT
    function getMarketItem(uint marketplaceItemId) public view returns (Listing memory) {
        return marketplaceIdToListingItem[marketplaceItemId];
    }

    // Get NFTs listed by the caller (seller)
    function getMyListedNFTs() public view returns (Listing[] memory) {
        uint totalListingCount = marketplaceIds.current();
        uint listingCount = 0;
        uint index = 0;

        // Count how many NFTs the caller has listed
        for (uint i = 0; i < totalListingCount; i++) {
            if (marketplaceIdToListingItem[i + 1].owner == msg.sender) {
                listingCount += 1;
            }
        }

        // Create an array to store the caller's listed NFTs
        Listing[] memory items = new Listing[](listingCount);
        for (uint i = 0; i < totalListingCount; i++) {
            if (marketplaceIdToListingItem[i + 1].owner == msg.sender) {
                uint currentId = marketplaceIdToListingItem[i + 1].marketplaceId;
                Listing memory currentItem = marketplaceIdToListingItem[currentId];
                items[index] = currentItem;
                index += 1;
            }
        }
        return items;
    }
}
