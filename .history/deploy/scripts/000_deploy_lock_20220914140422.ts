import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Lock__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_HOUR_IN_SECS = 60 * 60;
    const unlockTime = currentTimestampInSeconds + ONE_HOUR_IN_SECS;

    const lockedAmount = ethers.utils.parseEther("0.0002");


  console.log(">> Deploying Lock contract");
  const Lock = (await ethers.getContractFactory(
    "Lock",
    (await ethers.getSigners())[0])) as Lock__factory;
  const lock = await Lock.deploy(unlockTime,{value : lockedAmount});
  await lock.deployed();
  console.log(`>> Deployed at ${lock.address}`);
  console.log("✅ Done");
};

export default func;
func.tags = ['LOCK'];