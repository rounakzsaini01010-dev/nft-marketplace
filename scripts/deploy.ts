import { network } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const { ethers } = await network.create();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const usdtAddress =
    process.env.Usdtaddrss || "0x90a1De2cC063786fC7e6C69514988cBb03E6665e";
  console.log(`Using MockUSDT token at: ${usdtAddress}`);

  console.log("Deploying NFTCollection...");
  const nftCollection = await ethers.deployContract("NFTCollection", [
    usdtAddress,
  ]);

  await nftCollection.waitForDeployment();

  const contractAddress = await nftCollection.getAddress();
  console.log(`NFTCollection deployed successfully to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Contract Address : 0x4a469a0896Bc492C52722234A733E1f88567b96C
