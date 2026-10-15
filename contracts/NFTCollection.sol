// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTCollection is ERC721URIStorage, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 private _tokenIds;
    IERC20 public immutable usdtToken;
    uint256 public constant MINT_FEE = 10 * 10 ** 6; // 10 USDT (assuming 6 decimals)

    event NFTMinted(
        address indexed user,
        uint256 indexed tokenId,
        string tokenURI
    );

    constructor(
        address usdtAddress
    ) ERC721("My NFT Collection", "MNFT") Ownable(msg.sender) {
        require(usdtAddress != address(0), "Invalid token address");
        usdtToken = IERC20(usdtAddress);
    }

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public nonReentrant returns (uint256) {
        // Charge 10 USDT from the caller (msg.sender)
        // Note: caller must approve this NFT contract to spend USDT first
        usdtToken.safeTransferFrom(msg.sender, address(this), MINT_FEE);

        _tokenIds++;

        uint256 newTokenId = _tokenIds;

        _safeMint(recipient, newTokenId);

        _setTokenURI(newTokenId, tokenURI);

        emit NFTMinted(
            recipient,
            newTokenId,
            tokenURI
        );

        return newTokenId;
    }

    // Allow owner to withdraw accumulated USDT fees
    function withdrawUSDT() external onlyOwner nonReentrant {
        uint256 balance = usdtToken.balanceOf(address(this));
        require(balance > 0, "No USDT to withdraw");
        usdtToken.safeTransfer(owner(), balance);
    }
}
