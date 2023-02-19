// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";

/// Manage the Members Access and thier Profile Status
/// Manage All the proposals they create and vote on those

interface NFTContract {
    function balanceOf(address owner) external view returns (uint256);

    function ownerOf(uint256 tokenId) external view returns (address);

    function revoke(uint256 tokenId) external;
}

interface campaignManager {
    function createFundContract(
        uint256 campaignID,
        uint256 proposalID,
        string memory _infoCID,
        uint256 amount,
        uint256 duration,
        address creatorAddress
    ) external returns (uint256 id);
}

interface TokenContract {
    function mint(address _to, uint256 _amount) external;
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

    // 0-> ACTIVE
    // 1-> NOTACTIVE
    // 2-> UNDERVOTE
    // 3-> VOTED
    // 4-> COMPLETED
    // 5-> CANCELLED
    enum campaignStatus {
        ACTIVE,
        NOTACTIVE,
        UNDERVOTE,
        VOTED,
        COMPLETED,
        CANCELLED
    }

    struct campaignProposal {
        address creator;
        address fundContract;
        string _infoCID;
        uint256 amountReq;
        campaignStatus status;
        uint256 startTime;
        uint256 duration;
        uint256 yayVotes;
        uint256 nayVotes;
        bool verified;
    }

    // these are just all the proposals , not the active ones
    uint256 public totalProposals;
    uint256 public totalCampaigns;

    mapping(uint256 => campaignProposal) public proposals;
    mapping(uint256 => campaignProposal) public campaigns;

    mapping(uint256 => mapping(address => bool)) public voters;
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
    NFTContract public _nftContract;

    address public fundManagerAddress;
    campaignManager public _managerContract;

    address public tokenContractAddress;
    TokenContract public _tokenContract;

    /*
     *  ########  MEMBER VARAIBLES   #########
     */

    /// implement some level of designation to the members
    // 0-> NOTACTIVE
    // 1-> ACTIVE
    // 2-> REMOVED
    // 3-> UNDERWATCH
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

    uint256 public votingDuration = 12 hours;

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

    constructor(
        address _nftAddress,
        address _tokenAddress,
        address _manager,
        address _fundManager
    ) {
        manager = _manager;
        nftContractAddress = _nftAddress;
        fundManagerAddress = _fundManager;
        tokenContractAddress = _tokenAddress;
        _nftContract = NFTContract(nftContractAddress);
        _managerContract = campaignManager(fundManagerAddress);
        _tokenContract = TokenContract(tokenContractAddress);
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
    function addDAOMember(
        uint256 tokenId,
        string memory _profileCID,
        uint256[] memory _proposals
    ) public {
        require(
            _nftContract.ownerOf(tokenId) == msg.sender,
            "NOT THE NFT OWNER"
        );
        require(
            !daoMembers[msg.sender].daoMemberStatus,
            "Already a DAO member once"
        );

        daoMembers[msg.sender] = DAOMember(
            true,
            memberStatus.ACTIVE,
            tokenId,
            msg.sender,
            _profileCID,
            false,
            0,
            _proposals
        );
    }

    modifier onlyActiveDAOMembers() {
        require(
            daoMembers[msg.sender].status == memberStatus.ACTIVE,
            "NOT A ACTIVE DAO MEMBER"
        );
        _;
    }

    function verifyDAOMember(address user) public onlyManager {
        require(
            daoMembers[user].status == memberStatus.ACTIVE,
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
        returns (memberStatus _status)
    {
        _status = daoMembers[user].status;
    }

    /*
     *  ########  CAMPAIGN SETTER VARAIBLES   #########
     */

    function createProposal(
        string memory _ipfsCID,
        uint256 amount,
        uint256 duration
    ) public onlyActiveDAOMembers returns (uint256 proposalID) {
        /// add the info into proposal mapping

        proposalID = totalProposals;

        proposals[proposalID] = campaignProposal(
            msg.sender,
            address(0),
            _ipfsCID,
            amount,
            campaignStatus.UNDERVOTE,
            block.timestamp,
            duration,
            0,
            0,
            false
        );
        /// add record to the Creator profile

        daoMembers[msg.sender].proposalIDs.push(proposalID);

        /// Voting starts as soon as the proposals are added
        totalProposals += 1;
    }

    // Voting on the Active proposals
    function vote(Vote _vote, uint256 _proposalID) public onlyActiveDAOMembers {
        campaignProposal memory _campaign = proposals[_proposalID];
        require(
            block.timestamp > _campaign.startTime,
            "You can't approve this proposal before the voting starts."
        );
        require(
            block.timestamp < _campaign.startTime + votingDuration,
            "Voting has already ended"
        );
        require(
            voters[_proposalID][msg.sender] == false,
            "You have already voted"
        );
        if (_vote == Vote.YES) _campaign.yayVotes += 1;
        else _campaign.nayVotes += 1;
        voters[_proposalID][msg.sender] == true;

        ///mints some token for verifying and voting
        /// 10 tokens for a vote are minted to the user
        _tokenContract.mint(msg.sender, 10);
    }

    /// Finalize the Voting and Create the Fund Contract if approved , with marked as verified
    /// Voting Can be ended only by the manager , without any time Limit for now
    function completeVoting(uint256 _proposalID)
        public
        onlyManager
        returns (uint256 campaignID)
    {
        campaignProposal memory _campaign = proposals[_proposalID];
        require(!_campaign.verified, "ALREADY VERIFIED");
        // require(
        //     block.timestamp > _campaign.startTime + votingDuration,
        //     "Voting hasn't ended yet for this member!"
        // );
        if (_campaign.yayVotes > _campaign.nayVotes) {
            _campaign.verified = true;
            _campaign.status = campaignStatus.ACTIVE;

            /// Add the proposals to active Campaign
            campaignID = totalCampaigns;
            campaigns[campaignID] = _campaign;

            totalCampaigns += 1;
            /// create the funding Contract and details over there

            _managerContract.createFundContract(
                campaignID,
                _proposalID,
                _campaign._infoCID,
                _campaign.amountReq,
                _campaign.duration,
                _campaign.creator
            );

            // This Completed the fund creation method from here , further Campaign Managmenet is handled from the Manager
        } else {
            /// Cancel the campaign
            _campaign.verified = false;
            _campaign.status = campaignStatus.CANCELLED;
        }
    }
}
