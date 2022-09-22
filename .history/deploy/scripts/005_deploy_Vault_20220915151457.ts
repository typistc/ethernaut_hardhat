import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Vault__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const vaultAddress = "0xF135ce3F3A25ed50F04D5EE8f0DDaf9EB45f6b6A"
    const Vault=await ethers.getContractFactory("Vault",(await ethers.getSigners())[0])as Vault__factory;
    const value = await Vault.attach(vaultAddress);
    console.log(">> lock",await value.locked());
    const solt1 = await ethers.provider.getStorageAt(vaultAddress,0);
    console.log(">> solt1 info",ethers.utils.formatBytes32String(solt1))
    await value.unlock(ethers.utils.formatBytes32String(solt1))
    console.log(">> lock",await value.locked());

}

export default func;
func.tags = ['Vault'];