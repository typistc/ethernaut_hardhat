import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Privacy__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const privacyAddress = "0x3005eD3b02bb0509DF343E8B92ED846c76513cd5";

    console.log("Attach Privacy Contract");
    const Privacy = await ethers.getContractFactory("Privacy",(await ethers.getSigners())[0]) as Privacy__factory;
    const privacy = Privacy.attach(privacyAddress);
    const solt3 = await ethers.provider.getStorageAt(privacyAddress,3)
    console.log("Privacy data[2](solt[3]):",ethers.utils.formatBytes32String(solt3));
    
    
}

export default func;
func.tags = ['Privacy'];