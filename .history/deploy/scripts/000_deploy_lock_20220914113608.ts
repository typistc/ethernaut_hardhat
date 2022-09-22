import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Lock__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {


  console.log(">> Deploying Lock contract");
  const Lock = (await ethers.getContractFactory(
    "Lock",
    (await ethers.getSigners())[0])) as Lock__factory;
  const lock = await Lock.deploy(1800);
  await lock.deployed();
  console.log(`>> Deployed at ${lock.address}`);
  console.log("✅ Done");
};

export default func;
func.tags = ['LOCK'];