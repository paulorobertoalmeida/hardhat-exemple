require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: '.src/artifacts'
  },
  networks: {
    hardhat:{
      chainID: 1337
    }
  }
};
