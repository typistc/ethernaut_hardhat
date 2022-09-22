import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction, FacetCutAction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Fallback__factory} from '../../typechain-types';

const func:DeployFunction = async function (hre:HardhatRuntimeEnvironment) {
    const fallbackAddress = "0xdC5357A72cDF22F85048530fD2b288a13B4B0238"

    const Fallback = await ethers.getContractFactory("Fallback",(await ethers.getSigners())[0]) as Fallback__factory
    const fallback = await 

    
}