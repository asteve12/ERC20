import "@nomicfoundation/hardhat-toolbox";
import { ethers } from "hardhat";

async function main() {


  const Token = await ethers.getContractFactory("SteveToken");
  const token = await Token.deploy();

  await token.deployed();
  
//@ts-ignore
  console.log(`deployed to ${token.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
