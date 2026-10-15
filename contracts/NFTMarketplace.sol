// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price; // Price in USDT
        bool active;
    }

    IERC20 public immutable usdtToken;

    // Fee percentage in basis points (e.g., 250 = 2.5%)
    uint256 public platformFeeBps = 250;
    uint256 public constant MAX_FEE_BPS = 1000; // max 10% fee limit

    // Listing ID -> Listing
    mapping(uint256 => Listing) private _listings;
    uint256 private _listingIds;

    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );

    event NFTBought(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed seller,
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 feePaid
    );

    event ListingCancelled(uint256 indexed listingId);
    event PlatformFeeUpdated(uint256 newFeeBps);

    constructor(address usdtAddress) Ownable(msg.sender) {
        require(usdtAddress != address(0), "Invalid token address");
        usdtToken = IERC20(usdtAddress);
    }

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external nonReentrant returns (uint256) {
        require(price > 0, "Price must be greater than zero");

        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not the owner of the NFT");
        require(
            nft.isApprovedForAll(msg.sender, address(this)) ||
                nft.getApproved(tokenId) == address(this),
            "Marketplace not approved to transfer NFT"
        );

        _listingIds++;
        uint256 listingId = _listingIds;

        _listings[listingId] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            active: true
        });

        emit NFTListed(listingId, msg.sender, nftContract, tokenId, price);
        return listingId;
    }

    function buyNFT(uint256 listingId) external nonReentrant {
        Listing storage listing = _listings[listingId];
        require(listing.active, "Listing is not active");
        require(
            listing.seller != msg.sender,
            "Seller cannot buy their own NFT"
        );

        IERC721 nft = IERC721(listing.nftContract);
        require(
            nft.ownerOf(listing.tokenId) == listing.seller,
            "Seller no longer owns this NFT"
        );
        require(
            nft.isApprovedForAll(listing.seller, address(this)) ||
                nft.getApproved(listing.tokenId) == address(this),
            "Marketplace is not approved to transfer this NFT"
        );

        listing.active = false;

        uint256 fee = (listing.price * platformFeeBps) / 10000;
        uint256 sellerProceeds = listing.price - fee;

        // Collect platform fee
        if (fee > 0) {
            usdtToken.safeTransferFrom(msg.sender, owner(), fee);
        }

        // Send payment to seller
        usdtToken.safeTransferFrom(msg.sender, listing.seller, sellerProceeds);

        // Transfer NFT to buyer
        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        emit NFTBought(
            listingId,
            msg.sender,
            listing.seller,
            listing.nftContract,
            listing.tokenId,
            listing.price,
            fee
        );
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = _listings[listingId];
        require(listing.active, "Listing is not active");
        require(listing.seller == msg.sender, "Not the seller");

        listing.active = false;

        emit ListingCancelled(listingId);
    }

    function setPlatformFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= MAX_FEE_BPS, "Fee cannot exceed 10%");
        platformFeeBps = newFeeBps;
        emit PlatformFeeUpdated(newFeeBps);
    }

    function getListing(
        uint256 listingId
    ) external view returns (Listing memory) {
        return _listings[listingId];
    }

    function totalListings() external view returns (uint256) {
        return _listingIds;
    }
}
