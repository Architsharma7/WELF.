// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// Token can be used for incentives and other purposes
/// Need to implement proper tokens
/// plan is to give tokens to the DAO members who verify the propsals
/// Also to the Members Creating proposals and handling the request offline depending upon the scale of the rescue operations
/// The tokens awarded can be used to get some monetary rewards , reedemed for original money , or can be used to pay the partial amount of the Donations
/// The tokens also need to be burnt on some method , maybe while donating

/// DAO will take some amount out of the Users donated amount to handle these incentives

contract WelfDAOToken is ERC20, Ownable {
    address public manager;

    constructor() ERC20("Welf Token", "Welf") {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only Manager Authorised");
        _;
    }

    function changeManager(address newManager) public onlyOwner {
        manager = newManager;
    }

    /// Manager can only Award the tokens for certain purposes ,handled on the frontend
    function mint(address _to, uint256 _amount) external onlyManager {
        _mint(_to, _amount);
    }

    /// Manager can only burn the tokens form certain address to handle the supply based upon some conditions
    function burn(address _from, uint256 _amount) external onlyManager {
        _burn(_from, _amount);
    }
}
