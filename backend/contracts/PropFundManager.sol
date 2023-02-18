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

interface DonationRegistery {
    function addDonorRecord(
        address _user,
        uint256 campaignID,
        uint256 amountDonated
    ) external;
}

contract PropFundManager is Ownable {
    //// Store all the prop Stats , Donors , and other info around the funds

    /*
     *  ########  VARIABLES   #########
     */
    enum campaignStatus {
        ACTIVE,
        NOTACTIVE,
        COMPLETED,
        CANCELLED,
        UNDERWITHDRAW
    }

    struct Campaign {
        address fundContract;
        uint256 totalRequested;
        address Creator;
        string _infoCID;
        uint256 proposalID;
        uint256 totalFunds;
        uint256 totalDonors;
        uint256 campaignDuration;
        uint256 campaignStartTime; // When the campaign goes Live
        campaignStatus _status;
        string[] cidProofs;
    }

    uint256 public totalCampaigns;
    mapping(uint256 => Campaign) public fundCampaigns;

    /*
     *  ########  MANAGER CONTROL   #########
     */

    address public manager;

    mapping(address => bool) public approved;

    address public registeryAddress;
    DonationRegistery public _donationRegistery =
        DonationRegistery(registeryAddress);

    constructor(address _manager, address _regsiteryAddress) {
        manager = _manager;
        registeryAddress = _regsiteryAddress;
        approved[msg.sender] = true;
        approved[manager] = true;
        transferOwnership(manager);
    }

    /*
     *  ########   MODIFIERS AND MANAGERS   #########
     */

    modifier onlyManager() {
        require(msg.sender == manager, "Only Manager Authorised");
        _;
    }

    modifier onlyApproved() {
        require(approved[msg.sender], "NOT AUTHORISED");
        _;
    }

    function approve(address user, bool status) onlyManager {
        approved[user] = status;
    }

    function changeManager(address newManager) public onlyOwner {
        require(newManager != address(0), "Not a Valid Address");
        manager = newManager;
    }

    /*
     *  ########  PROP FUND CREATOR   #########
     */

    function createFundContract(
        uint256 campaignID,
        uint256 proposalID,
        string memory _infoCID,
        uint256 amount,
        uint256 duration,
        address creatorAddress
    ) public onlyApproved returns (uint256 id) {
        /// deploy the fund Contract

        PropFund storage _fundContract = new PropFund(manager);

        /// add the details to the data here
        require(campaignID == totalCampaigns, "INVALID CAMPAIGN ID");
        id = campaignID;

        fundCampaigns[id] = Campaign(
            address(_fundContract),
            amount,
            creatorAddress,
            _infoCID,
            proposalID,
            0,
            0,
            duration,
            block.timestamp,
            campaignStatus.ACTIVE,
            []
        );

        totalCampaigns += 1;
    }

    function pauseFunding(uint256 campaignID) public onlyApproved {
        Campaign memory _campaign = fundCampaigns[campaignID];

        require(
            _campaign._status == campaignStatus.ACTIVE,
            "Campaign Not Yet Active"
        );

        _campaign._status = campaignStatus.NOTACTIVE;
    }

    function resumeFunding(uint256 campaignID) public onlyApproved {
        Campaign memory _campaign = fundCampaigns[campaignID];

        require(
            _campaign._status == campaignStatus.NOTACTIVE,
            "Campaign Not Yet Active"
        );

        _campaign._status = campaignStatus.ACTIVE;
    }

    function completeCampaign(uint256 campaignID) public onlyApproved {
        Campaign memory _campaign = fundCampaigns[campaignID];

        require(
            _campaign._status != campaignStatus.COMPLETED,
            "Campaign Not Yet Active"
        );
        /// Can put time constraints  to only to close when the time is over
        // require(
        //     block.timestamp >
        //         _campaign.campaignDuration + _campaign.campaignStartTime,
        //     "CAMPAIGN YET ACTIVE"
        // );
        _campaign._status = campaignStatus.COMPLETED;
    }

    /*
     *  ########  PROP FUND GETTER   #########
     */

    function getCampaignData(uint256 campaignId)
        public
        view
        returns (Campaign memory _campaign)
    {
        _campaign = fundCampaigns[campaignId];
    }

    /*
     *  ########  PROP FUND DEPOSIT   #########
     */

    function donateCampaign(
        address user,
        uint256 amount,
        uint256 campaignID
    ) public payable {
        Campaign memory _campaign = fundCampaigns[campaignID];

        require(
            _campaign._status == campaignStatus.ACTIVE,
            "NOT OPEN FOR DONATION "
        );

        require(
            block.timestamp <
                _campaign.campaignStartTime + _campaign.campaignDuration,
            "CAMPAIGN TIME COMPLETED"
        );

        require(msg.value >= amount, "INCORRECT AMOUNT SENT");
        address fundContractAddress = _campaign.fundContract;
        // (bool success, ) = fundContractAddress.call{value: amount}("");

        PropFund(fundContractAddress).depositETH(user){value: amount};
        require(success, "DEPOST NOT COMPLETED");

        _campaign.totalFunds += amount;
        _campaign.totalDonors += 1;

        /// donor record can be directly fetched from incoming and outgoing tx on the chain
        _donationRegistery.addDonorRecord(user, campaignID, amount);
    }

    /*
     *  ########  PROP FUND WITHDRAW   #########
     */

    /// Need to add the Proof for Withdrawl System
    /// Partial withdrawl allowed
    /// Only from the fund creator
    function withdrawForCampaign(
        uint256 campaignID,
        uint256 amount,
        address withdrawAddress
    ) public {
        Campaign memory _campaign = fundCampaigns[campaignID];

        require(_campaign.Creator == msg.sender, "NOT AUTHORISED TO WITHDRAW");

        require(
            block.timestamp >
                _campaign.campaignStartTime + _campaign.campaignDuration,
            "CAMPAIGN TIME COMPLETED"
        );

        require(
            amount <= (_campaign.totalFunds * 0.4),
            "Amount Can only be withdrawn until 40% "
        );

        /// Initiate the withdrawl
        address fundContractAddress = _campaign.fundContract;
        PropFund(fundContractAddress).withdrawEthTo(withdrawAddress, amount);
    }

    function addProof(uint256 campaignID, string memory proofCID) public {
        Campaign memory _campaign = fundCampaigns[campaignID];

        require(_campaign.Creator == msg.sender, "NOT AUTHORISED TO WITHDRAW");

        _campaign.cidProofs.push(proofCID);

        /// Proof addition Complete
    }
}
