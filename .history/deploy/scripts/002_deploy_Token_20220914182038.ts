import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { Token__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const tokenAddress = "0x2e99b772a137CA4c624947aB11630e15849f09eb"
    const Bob = "0x1Efd940A0f7bC726a2ad3F0B7197f6bCdf1faC0b"
    
    console.log(">>  Attach Token contract");
    const Token = (await ethers.getContractFactory("Token")) as Token__factory;
    const token = Token.attach(tokenAddress);
    console.log("✅ Done");
    console.log(`oldBalanceOf: ${await token.balanceOf((await ethers.getSigners())[0].getAddress())}`)
    var result = await token.transfer(Bob,ethers.BigNumber.from(21));
    console.log(result)
    console.log(`newBalanceOf: ${await token.balanceOf((await ethers.getSigners())[0].getAddress())}`)

}

export default func;
func.tags = ['Token'];