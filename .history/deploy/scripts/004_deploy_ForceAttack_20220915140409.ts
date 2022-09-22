import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { ForceAttack__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const forceAddresss = "";

    const amount = ethers.utils.parseEther("0.000000001");
    const ForceAttack = (await ethers.getContractFactory("ForceAttack",(await ethers.getSigners())[0])) as ForceAttack__factory;
    const forceAttack = await ForceAttack.deploy(forceAddresss,{value:amount})

}