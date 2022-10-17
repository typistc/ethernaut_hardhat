import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Buyer__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const shopAddress = "0xf6878C2e9A8190c7079268598e3AF93965cB8aA9";

    console.log(">> Deploy ShapAttack Contract");
    const Buyer = await ethers.getContractFactory("Buyer",(await ethers.getSigners())[0]) as Buyer__factory
    const buyer = await Buyer.deploy(shopAddress);
    await buyer.deployed();

    const buyResult = await buyer.buy();
    await buyResult.wait();

    console.log("✅ Done");
}

export default func;
func.tags = ['Shop'];