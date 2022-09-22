import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Delegation__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const delegateAddress = "0x889f5955F3747C4e28b49c88139DBC2F93aB105d";

    console.log(">>  Deploy Delegation contract");
    const Delegation = (await ethers.getContractFactory("Delegation",(await ethers.getSigners())[0])) as Delegation__factory;
    const delegation = await Delegation.deploy(delegateAddress);
    await delegation.deployed();
    console.log("✅ Done");
    

}