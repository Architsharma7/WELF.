/// Stores the Data of all the profiles
/// Records of each ande every donor
/// Who donated to which Campaigns  , to show on the profile of the user

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "@openzeppelin/contracts/access/Ownable.sol";

contract DonationRegistery is Ownable {
    /// We can add some tags to the Donor Profile , to make them Certified and some other Perks
    /*
     *  ########  VARIABLES   #########
     */
    struct Donor {
        uint256 totalDonations;
        uint256[] campaignIDs;
        uint256 totalAmountDonated;
        string profileCID;
    }

    mapping(address => Donor) public donorRecords;

    mapping(address => bool) public approved;

    constructor() {
        approved[msg.sender] = true;
    }

    modifier onlyApproved() {
        require(approved[msg.sender], "NOT AUTHORISED");
        _;
    }

    function approve(address user, bool status) public onlyOwner {
        approved[user] = status;
    }

    /*
     *  ########  SETTER FUNCTIONS   #########
     */

    // only the Fund manager can add the donor Recorded
    function addDonorRecord(
        address _user,
        uint256 campaignID,
        uint256 amountDonated
    ) public onlyApproved {
        // require(  ); Implement conditions on who can add donor Record ,  maybe just the PropFundManager can add these

        Donor storage _donorRecord = donorRecords[_user];

        _donorRecord.campaignIDs.push(campaignID);
        _donorRecord.totalAmountDonated += amountDonated;
        _donorRecord.totalDonations += 1;

        donorRecords[_user] = _donorRecord;

        /// maybe mint some tokens here itself after donation is completed
    }

    function setProfileCID(address _user, string memory _profileCID) external {
        // require(  ); Implement conditions on who can add donor Record ,  maybe just the PropFundManager can add these

        donorRecords[_user].profileCID = _profileCID;
    }

    /*
     *  ########  GETTER FUNCTIONS   #########
     */

    function getProfileCID(address _user)
        public
        view
        returns (string memory _profieCID)
    {
        _profieCID = donorRecords[_user].profileCID;
    }

    function getUserData(address _user)
        public
        view
        returns (Donor memory _donorData)
    {
        _donorData = donorRecords[_user];
    }
}
