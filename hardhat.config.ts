import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

var GOERLI_RPC="https://goerli.infura.io/v3/1f7fad9b2d3143e2aee2f79da664c778"
var RINKEBY_RPC="https://rinkeby.infura.io/v3/7181e0b072e840bfa3d968bf487ba71d"
var GANACHE_RPC="http://127.0.0.1:9545"
var POLYGON_MUMBAI_RPC = "https://polygon-mumbai.g.alchemy.com/v2/ZZ8XWJBp3OyCeydYR8vZ54BRMdhQW0xO"

var PRIVATE_KEY0="01684d81933111c886b9f951af383a6e0745fecabe6376296d86a1ce656a82e8"
var PRIVATE_KEY1="6c7105a4622ba010ae90e55a58c36600e075e1a78039e1e09238b117e2a57abb"
var GANACHE_PRIVATE_KEY0 = "89d7809e942f624fd4f49813031a8700f24683efdd22a2642a4218964aeb8452"


const config: HardhatUserConfig = {
  defaultNetwork: 'goerli',
  solidity: "0.6.4",
  networks:{
    goerli: {
      url: GOERLI_RPC,
      accounts: [PRIVATE_KEY0,PRIVATE_KEY1],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    rinkeby:{
      url: RINKEBY_RPC,
      accounts: [PRIVATE_KEY0,PRIVATE_KEY1],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    gananch:{
      url: GANACHE_RPC,
      accounts: [GANACHE_PRIVATE_KEY0],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    mumbai:{
      url: POLYGON_MUMBAI_RPC,
      accounts: [PRIVATE_KEY0,PRIVATE_KEY1],
    }
  }

};

export default config;
