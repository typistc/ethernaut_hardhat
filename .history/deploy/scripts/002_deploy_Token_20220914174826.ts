import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Token__factory } from '../../typechain-types';
import { toNumber } from 'lodash';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const tokenAddress = "0x2e99b772a137CA4c624947aB11630e15849f09eb"
    
    console.log(">>  Attach Token contract");
    const Token = (await ethers.getContractFactory("Token")) as Token__factory;
    const token = Token.attach(tokenAddress);
    console.log("✅ Done");
    console.log(`oldBalanceOf: ${await token.balanceOf((await ethers.getSigners())[0].getAddress())}`)
    var result = await token.transfer((await ethers.getSigners())[0].getAddress(),ethers.BigNumber.from(21));
    console.log(result)
    console.log(`newBalanceOf: ${await token.balanceOf((await ethers.getSigners())[0].getAddress())}`)

}

export default func;
func.tags = ['Token'];