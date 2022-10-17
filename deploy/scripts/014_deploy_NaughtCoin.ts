import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { NaughtCoin__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const naughtCoinAddress = "0x456EDE398Be1BE5eB003932a0F3dD0a51BA652b3"
    const alice = (await ethers.getSigners())[0]
    const bob = (await ethers.getSigners())[1]

    console.log(">>Attach NaughtCoin contract");
    
    const NaughtCoinAlice = await ethers.getContractFactory("NaughtCoin", alice)as NaughtCoin__factory
    const NaughtCoinBob = await ethers.getContractFactory("NaughtCoin", bob)as NaughtCoin__factory
    const naughtCoinAlice = NaughtCoinAlice.attach(naughtCoinAddress);
    const naughtCoinBob = NaughtCoinBob.attach(naughtCoinAddress);

    console.log("Alice balanceOF:",await naughtCoinAlice.balanceOf(alice.address));
    console.log("Bob balanceOF:",await naughtCoinBob.balanceOf(bob.address));
    
    const approveResults = await naughtCoinAlice.approve(bob.address,"1000000000000000000000000")
    await approveResults.wait();

    console.log("transferFrom");
    const transferResults = await naughtCoinBob.transferFrom(alice.address, bob.address, "1000000000000000000000000")
    await transferResults.wait()

    console.log("Alice balanceOF:",await naughtCoinAlice.balanceOf(alice.address));
    console.log("Bob balanceOF:",await naughtCoinBob.balanceOf(bob.address));

}
export default func;
func.tags = ['NaughtCoin'];