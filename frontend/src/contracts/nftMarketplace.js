import { writeContract, readContract } from "wagmi/actions";
import { wagmiConfig } from "@/lib/web3/wagmi.config";
import { addresses } from "@/contracts/addresses";
import { nftMarketplaceAbi } from "@/contracts/abi";

export const nftMarketplaceContract = {
  address: addresses.nftMarketplace,
  abi: nftMarketplaceAbi,
};

export function listNFT({ nftContract, tokenId, price }) {
  return writeContract(wagmiConfig, {
    ...nftMarketplaceContract,
    functionName: "listNFT",
    args: [nftContract, tokenId, price],
    gas: 500_000n,
  });
}

export function buyNFT(listingId) {
  return writeContract(wagmiConfig, {
    ...nftMarketplaceContract,
    functionName: "buyNFT",
    args: [listingId],
    gas: 600_000n,
  });
}

export function cancelListing(listingId) {
  return writeContract(wagmiConfig, {
    ...nftMarketplaceContract,
    functionName: "cancelListing",
    args: [listingId],
    gas: 150_000n,
  });
}

export function getListing(listingId) {
  return readContract(wagmiConfig, {
    ...nftMarketplaceContract,
    functionName: "getListing",
    args: [listingId],
  });
}

export function getTotalListings() {
  return readContract(wagmiConfig, {
    ...nftMarketplaceContract,
    functionName: "totalListings",
  });
}
