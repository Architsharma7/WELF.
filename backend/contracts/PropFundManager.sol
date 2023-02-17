// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PropFund.sol";

/// Allowed only after the req is approved by the DAO
/// This the entry point contract to manage all the new FUND deployements
/// Deploy and Create a Funds Contract
/// Single Point to even send some funds to the contracts and from here itself we manage and add the records
/// Also the single point for withdrawl of any sort from the contracts
/// Set withdraw rules too

contract PropFundManager is Ownable {
    //// Store all the prop Stats , Donors , and other info around the funds

    /*
     *  ########  VARIABLES   #########
     */
    struct Campaign {
        address fundContract;
        uint256 totalRequested;
        address Creator;
        uint256 totalFunds;
        uint256 totalDonors;
        uint256 campaignDuration;
        uint256 campaignStartTime;
        bool status; // ACTIVE ,  COMPLETED , CANCELLED
    }

    uint256 public totalCampaigns;
    mapping(uint256 => Campaign) public fundCampaigns;

    /*
     *  ########  MANAGER CONTROL   #########
     */

    address public manager;

    constructor(address _manager) {
        manager = _manager;
        transferOwnership(manager);
    }

    /*
     *  ########   MODIFIERS AND MANAGERS   #########
     */

    modifier onlyManager() {
        require(msg.sender == manager, "Only Manager Authorised");
        _;
    }

    function changeManager(address newManager) public onlyOwner {
        require(newManager != address(0), "Not a Valid Address");
        manager = newManager;
    }

    /*
     *  ########  PROP FUND CREATOR   #########
     */
}
