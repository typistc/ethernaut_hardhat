import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

var GOERLI_RPC="https://goerli.infura.io/v3/7181e0b072e840bfa3d968bf487ba71d"
var RINKEBY_RPC="https://rinkeby.infura.io/v3/7181e0b072e840bfa3d968bf487ba71d"
var PRIVATE_KEY="01684d81933111c886b9f951af383a6e0745fecabe6376296d86a1ce656a82e8"


const config: HardhatUserConfig = {
  defaultNetwork: 'goerli',
  solidity: "0.6.0",
  networks:{
    goerli: {
      url: GOERLI_RPC,
      accounts: [PRIVATE_KEY],
    },
    rinkeby:{
      url: RINKEBY_RPC,
      accounts: [PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    }
  }

};

export default config;
