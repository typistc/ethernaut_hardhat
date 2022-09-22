import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Reentrance__factory,ReentrancyAttack__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const reentranceAddress = ""

    console.log("Attach Reentrance Contract");
    const Reentrance = await ethers.getContractFactory("Reentrance",(await ethers.getSigners())[0]) as Reentrance__factory;
    const reentrance = Reentrance.attach(reentranceAddress);
    
    console.log("Deploy ReentranceAttack Contract");
    const ReentranceAttack = await ethers.getContractFactory("ReentrancyAttack",(await ethers.getSigners())[0]) as ReentrancyAttack__factory;
    const reentranceAttack = await ReentranceAttack.deploy(reentranceAddress);
    await reentranceAttack.deployed();
    

}