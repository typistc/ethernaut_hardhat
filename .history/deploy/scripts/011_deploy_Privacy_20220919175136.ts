import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Privacy__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const privacyAddress = ""

    const Privacy = await ethers.getContractFactory("Privacy",(await ethers.getSigners())[0]) as Privacy__factory；
    const privacy = Privacy.attach(privacyAddress);
    

}

export default func;
func.tags = ['Privacy'];