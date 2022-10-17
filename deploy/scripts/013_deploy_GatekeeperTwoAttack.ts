import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { GatekeeperTwoAttack__factory, GatekeeperTwo__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const gatekeeperTwoAddress = "0xd8e063036F8bD5709f71013a6874f7B97F0b0b40"

    console.log(">>>Attach GatekeeperTwo contract");
    const GatekeeperTwo = await ethers.getContractFactory("GatekeeperTwo",(await ethers.getSigners())[0]) as GatekeeperTwo__factory
    const gatekeeperTwo = await GatekeeperTwo.attach(gatekeeperTwoAddress);
    console.log("GatekeeperTwo entrant:",await gatekeeperTwo.entrant());
    

    console.log(">>>Deploy GatekeeperTwoAttack contract");
    const GatekeeperTwoAttack = await ethers.getContractFactory("GatekeeperTwoAttack",(await ethers.getSigners())[0]) as GatekeeperTwoAttack__factory
    const gatekeeperTwoAttack = await GatekeeperTwoAttack.deploy(gatekeeperTwoAddress)
    const results = await gatekeeperTwoAttack.deployed();
    console.log("results:",results);
    
    console.log("GatekeeperTwo entrant:",await gatekeeperTwo.entrant());
    
    console.log("✅ Done");
}

export default func;
func.tags = ['GatekeeperTwo'];