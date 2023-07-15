require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
require("@nomicfoundation/hardhat-ethers");

const APOTHEM_RPC = "https://erpc.apothem.network";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    xdcApothem: {
      url: APOTHEM_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
