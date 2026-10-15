import { writeContract, readContract } from "wagmi/actions";
import { wagmiConfig } from "@/lib/web3/wagmi.config";
import { addresses } from "@/contracts/addresses";
import { nftCollectionAbi } from "@/contracts/abi";

export const nftCollectionContract = {
  address: addresses.nftCollection,
  abi: nftCollectionAbi,
};

export function mintNFT({ recipient, tokenUri }) {
  return writeContract(wagmiConfig, {
    ...nftCollectionContract,
    functionName: "mintNFT",
    args: [recipient, tokenUri],
    gas: 800_000n,
  });
}

export function getNftBalance(owner) {
  return readContract(wagmiConfig, {
    ...nftCollectionContract,
    functionName: "balanceOf",
    args: [owner],
  });
}

export function getTokenOwner(tokenId) {
  return readContract(wagmiConfig, {
    ...nftCollectionContract,
    functionName: "ownerOf",
    args: [tokenId],
  });
}
