import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Vault__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const vaultAddress = "0x68959D793811321869B717C782bb380253F3CE7d"
    const Vault=await ethers.getContractFactory("Vault",(await ethers.getSigners())[0])as Vault__factory;
    const value = await Vault.attach(vaultAddress);
    console.log(">> lock",await value.locked());
    const solt1 = await ethers.provider.getStorageAt(vaultAddress,1);
    console.log(">> solt1 info",solt1)
    await value.unlock(solt1).then(async()=>console.log(">> lock",await value.locked()))
    // console.log(">> lock",await value.locked());
}

export default func;
func.tags = ['Vault'];