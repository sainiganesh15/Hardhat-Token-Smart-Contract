//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";  // it is library through which we can write javascript code in solidity
                               // after we have write console.log in solidity

contract Token{
    string public name="HardHat Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;

    mapping(address=>uint) balances;

    constructor(){
        balances[msg.sender]=totalSupply;  // here we are giving total supply to the person who is deploying the contract
                                            
        owner=msg.sender;

    }

    function transfer(address to, uint amount) external{
        console.log("**Sender balance is % tokens**", balances[msg.sender]);
        console.log("**Sender is sending % tokens to %address**", amount, to);


        require(balances[msg.sender]>=amount,"Not Enough Tokens");
        balances[msg.sender]-=amount;
        balances[to]+=amount;
    }

    function balanceOf(address account) external view returns(uint){
        return balances[account];
    }

}