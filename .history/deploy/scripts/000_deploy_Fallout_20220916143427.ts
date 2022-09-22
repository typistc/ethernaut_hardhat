import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction, FacetCutAction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Fallout__factory} from '../../typechain-types';

const func:DeployFunction = async function (hre:HardhatRuntimeEnvironment) {
    const falloutAddress = ""

    console.log(">> Attach fallout contract");
    const Fallout = await ethers.getContractFactory("Fallout",(await ethers.getSigners())[0]) as Fallout__factory
    const fallout = Fallout.attach(falloutAddress);
    const res = await fallout.Fal1out();
    await res.wait()
    console.log(">>> owner:", await fallout.owner());
    console.log("✅ Done");
    
    
}