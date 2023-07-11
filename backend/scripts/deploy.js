const hre = require("hardhat");

async function main() {
  const token = await hre.ethers.getContractFactory("WelfDAOToken");
  const TOKEN = await token.deploy();

  await TOKEN.deployed();

  console.log(`Welf DAO Token deployed to ${TOKEN.address}`);

  const fund = await hre.ethers.getContractFactory("WelfFunds");
  const FUND = await fund.deploy();

  await FUND.deployed();

  console.log(`Welf DAO Funds deployed to ${FUND.address}`);

  const nft = await hre.ethers.getContractFactory("WelfDAONFT");
  const NFT = await nft.deploy("", FUND.address);

  await NFT.deployed();

  console.log(`Welf DAO NFT deployed to ${NFT.address}`);

  const registry = await hre.ethers.getContractFactory("DonationRegistery");
  const REGISTRY = await registry.deploy();

  await REGISTRY.deployed();

  console.log(`Welf Donation Registery deployed to ${REGISTRY.address}`);

  const manager = await hre.ethers.getContractFactory("PropFundManager");
  const MANAGER = await manager.deploy(
    "0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f",
    REGISTRY.address,
    TOKEN.address
  );

  await MANAGER.deployed();

  console.log(`Welf Fund Manager deployed to ${MANAGER.address}`);

  const dao = await hre.ethers.getContractFactory("WelfDAO");
  const DAO = await dao.deploy(
    NFT.address,
    TOKEN.address,
    "0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f",
    MANAGER.address
  );

  await DAO.deployed();

  console.log(`Welf Fund Manager deployed to ${DAO.address}`);

  /// Tasks
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
