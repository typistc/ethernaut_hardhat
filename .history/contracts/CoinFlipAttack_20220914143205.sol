pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

interface CoinFlipInteface {
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipAttack{
    uint256 public consecutiveWins;
    uint256 lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
}