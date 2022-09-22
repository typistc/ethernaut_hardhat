import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Token__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const tokenAddress = "0x2e99b772a137CA4c624947aB11630e15849f09eb"
    
    console.log(">>  TelephoneAttack contract");
    const Token = (await ethers.getContractFactory(
        "Token",
        (await ethers.getSigners())[0])) as Token__factory;
    const token = await Token.attach(tokenAddress);
    console.log(`Token ${await token.balanceOf((await ethers.getSigners())[0].getAddress())}`)

}

export default func;
func.tags = ['Token'];