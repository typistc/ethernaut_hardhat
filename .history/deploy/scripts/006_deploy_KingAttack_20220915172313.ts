import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { KingAttack__factory, King__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const kingAddress = "0xC5F2cc21e6EE9Ad18017eb75FcFA1BA6C6344623"
    const amount = ethers.utils.parseEther("0.00000000001");

    console.log(">> Attach KingAttack Contrac");
    const King = await ethers.getContractFactory("King",(await ethers.getSigners())[0]) as King__factory
    const king = King.attach(kingAddress);
    console.log("King",await king._king());
    console.log("King",await king.prize());

    console.log(">> Deploy KingAttack Contrac");
    const KingAttack = await ethers.getContractFactory("KingAttack",(await ethers.getSigners())[0])as KingAttack__factory;
    const kingAttack =await KingAttack.deploy(kingAddress,{value:amount})
    await kingAttack.deployed()

    console.log("King",await king._king());
    console.log("King",await king.prize());


}

export default func;
func.tags = ['King'];