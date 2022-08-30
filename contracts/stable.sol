// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// Import this file to use console.log
import "hardhat/console.sol";
import "./IERC20.sol";

contract SteveToken is ERC20Interface {
    bytes32 public symbol;
    bytes32 public name;
    uint8 public decimals;
    uint256 public _totalSupply;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    constructor() public {
        symbol = "AST";
        name = "AST";
        decimals = 2;
        _totalSupply = 10000;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() public returns (uint256) {
        return _totalSupply - balances[address(0)];
    }

    function balanceOf(address tokenOwner) public returns (uint256 balance) {
        return balances[tokenOwner];
    }

    function transfer(address _to, uint256 _tokens)
        public
        returns (bool success)
    {
        require(balances[msg.sender] >= _tokens, "insufficient funds");
        balances[msg.sender] = balances[msg.sender] - _tokens;
        balances[_to] = balances[_to] + _tokens;
    }

    function approve(address spender, uint256 tokens)
        public
        returns (bool success)
    {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
}
