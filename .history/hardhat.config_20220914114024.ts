import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

var GOERLI_RPC="https://goerli.infura.io/v3/7181e0b072e840bfa3d968bf487ba71d"

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: "0.8.9",
  networks:{
    goerli: {
      url: GOERLI_RPC,
      accounts: [process.env.BSC_TESTNET_PRIVATE_KEY!],
    }
  }

};

export default config;
