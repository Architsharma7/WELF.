// const { ethers } = require("hardhat");

// const hardhat = require("hardhat");
const TOKEN_CONTRACT_ADDRESS = "0xD703206243Ac047d04eE1f8775bd79029DB4B260";
const NFT_CONTRACT_ADDRESS = "0x55b147b9613fC6f04B84Ba4E00d47FEEcBfF65EB";
const REGISTERY_CONTRACT_ADDRESS = "0x6e67bd734f58B2155fe94354662E84C3E8A008Eb";
const DAO_CONTRACT_ADDRESS = "0x847C0fd877876F9f5FB207E7D7C68d8846259238";
const DAOFUND_CONTRACT_ADDRESS = "0x84D60f1F4b14d46C2123F700DA96f22e7CD3F737";
const FUNDMANAGER_CONTRACT_ADDRESS =
  "0xA74De5a0c69e3f2F86d8AA3b7682AFb26B0f5150";

async function main() {
  // console.log(hre.network);

  const signers = await hre.ethers.getSigners();
  console.log(signers[0]);

  // const WelfDAOToken = await hre.ethers.getContractAt(
  //   "WelfDAOToken",
  //   TOKEN_CONTRACT_ADDRESS
  // );
  // // console.log(WelfDAOToken);

  // // approve fund manager and DAO
  // await WelfDAOToken.approve(FUNDMANAGER_CONTRACT_ADDRESS, true);
  // await WelfDAOToken.approve(DAO_CONTRACT_ADDRESS, true);

  // console.log("Token approved Manager and DAO");

  const WelfFunds = await hre.ethers.getContractAt(
    "WelfFunds",
    DAOFUND_CONTRACT_ADDRESS
  );

  // set NFT contract add
  await WelfFunds.setNFTContractAddress(NFT_CONTRACT_ADDRESS);

  console.log("NFT Contract set in Funds");

  const DonationRegistery = await hre.ethers.getContractAt(
    "DonationRegistery",
    REGISTERY_CONTRACT_ADDRESS
  );

  // approve fund manager in Donation registery
  await DonationRegistery.approve(FUNDMANAGER_CONTRACT_ADDRESS, true);

  console.log("Approving the registery ");

  const PropFundManager = await hre.ethers.getContractAt(
    "PropFundManager",
    FUNDMANAGER_CONTRACT_ADDRESS
  );
  // approve DAO in fund manager
  await PropFundManager.approve(DAO_CONTRACT_ADDRESS, true);

  console.log("DAO approved in manager");
}

module.exports = main;

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
