import { network } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const { ethers } = await network.create();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying marketplace with the account: ${deployer.address}`);

  const usdtAddress = process.env.Usdtaddrss || "0x90a1De2cC063786fC7e6C69514988cBb03E6665e";
  console.log(`Using MockUSDT token at: ${usdtAddress}`);

  console.log("Deploying NFTMarketplace...");
  const marketplace = await ethers.deployContract("NFTMarketplace", [usdtAddress]);
  
  await marketplace.waitForDeployment();

  const contractAddress = await marketplace.getAddress();
  console.log(`NFTMarketplace deployed successfully to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//COntract Address : 0x515a86c8e96e093E74fb9cC5D4bfBa0dE7Ee79B8