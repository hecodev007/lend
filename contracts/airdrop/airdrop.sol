// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
//import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


contract BatchTransfer is Ownable {
    using SafeMath for uint256;

    // bytes32 public root;

    IERC20  public tokenERC20;

    event BuyEvent(address owner, uint token, uint256 amount);

    receive() external payable {
        revert("R");
    }

    constructor(address _tokenERC20) {
        tokenERC20 = IERC20(_tokenERC20);
        //tokenList[0] = true;
    }

    //    function setRoot(bytes32 _root) public onlyOwner returns (bool) {
    //        root = _root;
    //        return true;
    //    }

    function setToken(address _tokenERC20) public onlyOwner {
        tokenERC20 = IERC20(_tokenERC20);
    }


    function withdraw() external onlyOwner {
        SafeERC20.safeTransfer(
            tokenERC20,
            owner(),
            tokenERC20.balanceOf(address(this))
        );
    }

    function withdrawBnb() external onlyOwner {
        address payable recipient = payable(msg.sender);
        recipient.transfer(address(this).balance);
    }


    function transfer(
        uint256 amount, address[]  memory addr
    ) public {
        for (uint256 i = 0; i < addr.length; i++) {
            SafeERC20.safeTransferFrom(tokenERC20, msg.sender, addr[i], amount);
        }

    }
}
