pragma solidity ^0.5.16;

import "./PriceOracle.sol";
import "./CErc20.sol";

contract SimplePriceOracle is PriceOracle {
    
    address admin;

    string baseSymbol;

    uint baseTokenPrice;
    
    mapping(address => uint) prices;

    event PricePosted(address asset, uint previousPriceMantissa, uint requestedPriceMantissa);

    constructor() public {
        admin = msg.sender;
    }

    function changeAdmin(address newAdmin) public {
        require(msg.sender == admin, "only the admin may call changeAdmin");
        admin = newAdmin;
    }

    function setBaseSymbol(string memory symbol) public {
        require(msg.sender == admin, "only the admin may call changeAdmin");
        baseSymbol = symbol;
    }

    function getUnderlyingPrice(CToken cToken) public view returns (uint) {
        if (compareStrings(cToken.symbol(), baseSymbol)) {
            return baseTokenPrice;
        } else {
            return prices[address(CErc20(address(cToken)).underlying())];
        }
    }

    function setUnderlyingPrice(CToken cToken, uint underlyingPriceMantissa) public {
        require(msg.sender == admin, "only the admin may call setUnderlyingPrice");
        if (compareStrings(cToken.symbol(), baseSymbol)) {
            baseTokenPrice = underlyingPriceMantissa;
        } else {
            address asset = address(CErc20(address(cToken)).underlying());
            emit PricePosted(asset, prices[asset], underlyingPriceMantissa);
            prices[asset] = underlyingPriceMantissa;
        }
    }

    function setDirectPrice(address asset, uint price) public {
        require(msg.sender == admin, "only the admin may call setDirectPrice");
        emit PricePosted(asset, prices[asset], price);
        prices[asset] = price;
    }

    // v1 price oracle interface for use as backing of proxy
    function assetPrices(address asset) external view returns (uint) {
        return prices[asset];
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}
