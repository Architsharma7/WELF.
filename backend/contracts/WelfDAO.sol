// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";

/// Manage the Members Access and thier Profile Status
/// Manage All the proposals they create and vote on those

interface NFTContrtact {
    function balanceOf(address owner) external view returns (uint256);

    function ownerOf(uint256 tokenId) external view returns (address);

    function revoke(uint256 tokenId) external;
}

contract WelfDAO is Ownable {
    /// Proposal details
    //-> Create new proposals
    //-> Record the pending proposals
    //-> Vote on proposals
    //-> Finally assign the funds contracts
    /*
     *  ########  Proposal VARAIBLES   #########
     */

    enum campaignStatus {
        ACTIVE,
        NOTACTIVE,
        UNDERVOTE,
        VOTED,
        COMPLETED
    }

    struct campaignProposal {
        address creator;
        address fundContract;
        string _infoCID;
        campaignStatus status;
        uint256 startTime;
        uint256 yayVotes;
        uint256 nayVotes;
        bool verified;
    }

    uint256 public totalProposals;

    mapping(uint256 => campaignProposal) public proposals;
    /*
     *#############
     */
    /// Member details
    //-> Add new DAO Members by minting the NFT
    //-> Record user data
    //-> Add all the proposals to their profiles
    //-> Maintain the status
    address public manager;

    address public nftContractAddress;
    NFTContrtact public _nftContract = NFTContrtact(nftContractAddress);
    /*
     *  ########  MEMBER VARAIBLES   #########
     */

    /// implement some level of designation to the members

    enum memberStatus {
        NOTACTIVE,
        ACTIVE,
        REMOVED,
        UNDERWATCH
    }

    enum Vote {
        YES, // YES = 0
        NO // NO = 1
    }

    uint256 public votingDuration = 2 days;

    struct DAOMember {
        bool daoMemberStatus; // mark the id as active and inactive
        memberStatus status;
        uint256 NFTTokenID;
        address memberAddress;
        string profileCID; /// store the name , location , bio pfp,
        bool verified; /// either true or false
        uint256 totalRaised;
        uint256[] proposalIDs;
    }

    mapping(address => DAOMember) public daoMembers;

    constructor(address _nftAddress, address _manager) {
        manager = _manager;
        nftContractAddress = _nftAddress;
    }

    function changeNFTContractAddress(address _newAddress) public onlyOwner {
        require(_newAddress != address(0), "Not a Valid Address");
        nftContractAddress = _newAddress;
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
     *  ########  MEMBER SETTER VARAIBLES   #########
     */

    /// @dev Add Members to the DAO after minting an NFT and add their Record
    /// @dev The member Needs to call the function after minting the NFT
    function addDAOMember(uint256 tokenId, string memory _profileCID) public {
        require(
            _nftContract.ownerOf(tokenId) == msg.sender,
            "NOT THE NFT OWNER"
        );
        require(
            !daoMembers[msg.sender].daoMemberStatus,
            "Already a DAO member once"
        );

        daoMembers[msg.sender] = DAOMember(
            ture,
            memberStatus.ACTIVE,
            tokenId,
            msg.sender,
            _profileCID,
            false,
            0,
            []
        );
    }

    modifier onlyActiveDAOMembers() {
        require(
            daoMembers[msg.sender].status = memberStatus.ACTIVE,
            "NOT A ACTIVE DAO MEMBER"
        );
        _;
    }

    function verifyDAOMember(address user) public onlyManager {
        require(
            daoMembers[user].status = memberStatus.ACTIVE,
            "NOT A ACTIVE DAO MEMBER"
        );
        daoMembers[user].verified = true;
    }

    function removeDAOMember(address user) public onlyManager {
        daoMembers[user].status = memberStatus.REMOVED;

        // burning the NFT from the frontend itself
        // _nftContract.revoke(daoMembers[user].NFTTokenID);
    }

    function inspectDAOMember(address user) public onlyManager {
        daoMembers[user].status = memberStatus.UNDERWATCH;
    }

    /*
     *  ########  MEMBER GETTER VARAIBLES   #########
     */

    function getMemberData(address user)
        public
        view
        returns (DAOMember memory _member)
    {
        _member = daoMembers[user];
    }

    function getMemberStatus(address user)
        public
        view
        returns (memberStatus memory _status)
    {
        _status = daoMembers[user].status;
    }

    /*
     *  ########  CAMPAIGN SETTER VARAIBLES   #########
     */

    function createProposal(string memory _ipfsCID)
        public
        onlyActiveDAOMembers
        returns (uint256 proposalID)
    {
        /// add the info into proposal mapping

        proposalID = totalProposals;

        proposals[proposalID] = campaignProposal(
            msg.sender,
            address(0),
            _ipfsCID,
            campaignStatus.UNDERVOTE,
            block.timestamp,
            0,
            0,
            false
        );
        /// add record to the Creator profile

        daoMembers[msg.sender].proposalIDs.push(proposalID);

        /// Voting starts as soon as the proposals are added
    }

    /// Intiate Voting
    // voting function for requested member
    // function vote(Vote _vote, uint256 _proposalID) public onlyActiveDAOMembers {
    //     require(
    //         block.timestamp > member.votingStartTime,
    //         "You can't approve this person before the voting starts."
    //     );
    //     require(
    //         block.timestamp < member.votingStartTime + votingDuration,
    //         "Voting has already ended"
    //     );
    //     require(voters[_id][msg.sender] == false, "You have already voted");
    //     if (_vote == Vote.YES) member.yayVotes += 1;
    //     else member.nayVotes += 1;
    //     voters[_id][msg.sender] == true;
    // }

    /// Finalize the Voting and Create the Fund Contract if approved , with marked as verified
}
