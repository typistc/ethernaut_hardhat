import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { CoinFlipAttack__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const coinFlip = "0x21EbD8f0186de089e662BF6157F8E5C1Edc29871"

    console.log(">> Deploying CoinFlipAttack contract");
    const CoinFlipAttack = (await ethers.getContractFactory(
        "CoinFlipAttack",
        (await ethers.getSigners())[0])) as CoinFlipAttack__factory;
      const coinFlipAttack = await CoinFlipAttack.deploy(coinFlip);
      await coinFlipAttack.deployed();
      console.log(`>> Deployed at ${coinFlipAttack.address}`);
      console.log("✅ Done");
      for(var i=0;i<10;i++){
        await coinFlipAttack.attack();
        console.log(`>>Consecutive Wins ${coinFlipAttack.consecutiveWins}`)
      }
}

export default func;
func.tags = ['CoinFlipAttack'];