// const hre = require("hardhat");

async function main(
  WelfDAOToken,
  PropFundManager,
  WelfDAO,
  WelfFunds,
  WelfDAONFT,
  DonationRegistery
) {
  // approve fund manager and DAO
  WelfDAOToken.approve(PropFundManager.address, true);
  WelfDAOToken.approve(WelfDAO.address, true);

  console.log("Token approved Manager and DAO");

  // set NFT contract add
  WelfFunds.setNFTContractAddress(WelfDAONFT.address);

  console.log("NFT Contract set in Funds");

  // approve fund manager in Donation registery
  DonationRegistery.approve(PropFundManager.address, true);

  console.log("Approving the registery ");

  // approve DAO in fund manager
  PropFundManager.approve(WelfDAO.address, true);

  console.log("DAO approved in manager");
}

module.exports = main;

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
