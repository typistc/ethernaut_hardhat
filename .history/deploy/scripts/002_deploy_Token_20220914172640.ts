import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Token__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const tokenAddress = "0xC4C255Bd08CbfAAF62Fbdc89aE5B124D82d83113"
    
    console.log(">>  TelephoneAttack contract");
    const Token = (await ethers.getContractFactory(
        "Token",
        (await ethers.getSigners())[0])) as Token__factory;
    const token = await Token.attach(tokenAddress);
    console.log(`Token ${token.totalSupply}`)

}