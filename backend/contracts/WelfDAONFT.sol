// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface WelfFunds {
    // to stake the amount to join the DAO
    function intiateStake(address _from, uint256 amount) external payable;

    // function to return the joining fees
    function returnStake(address _userAddress) external returns (bool success);
}

// NFT Contract to allot the Memberships
// Manager can control the User Memberships
// User can also burn the NFT and withdraw the staked Amount
contract WelfDAONFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    uint256 public price = 0.05 ether;

    Counters.Counter private _tokenIdCounter;
    string baseURI;

    address public manager;
    address public welfFundAddress;

    WelfFunds _funds;

    mapping(address => bool) public approved;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    constructor(string memory _base, address welfFunds)
        ERC721("Welf DAO Member", "WelfMember")
    {
        baseURI = _base;
        manager = msg.sender;

        require(welfFunds != address(0), "Not a Valid Address");
        welfFundAddress = welfFunds;
        _funds = WelfFunds(welfFunds);
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only Manager Authorised");
        _;
    }

    function changeManager(address newManager) public onlyOwner {
        manager = newManager;
    }

    // to change the URI at any point of time , the URI is same for all the tokens as we DAO NFT is same for all
    function changeURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    /// for every token ID we have the same metadata as the DAO NFT is same for everybody
    ///  we can create dynmaic on Chain NFT data too which is dynamic for users input
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return baseURI;
    }

    // to mint the token ID for the DAO user to join the DAO
    // User needs to stake some amount to enter the DAO
    // only 1 NFT can be minted per User
    function safeMint(address to) public payable {
        require(msg.value >= price, "Payment required to mint the NFT");
        require(balanceOf(to) == 0, "You are already a DAO Member");

        // Send the fee to the Funds Contract
        (bool success, ) = welfFundAddress.call{value: msg.value}("");
        _funds.intiateStake(msg.sender, msg.value);

        // then mint the NFT to the address respectively
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    // we will allow to call transfer only when the nft is either minted or burnt
    // So the to and fro address will be the 0 address
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        require(
            to == address(0) || from == address(0),
            "The NFT is non transferrable"
        );
        // super._beforeTokenTransfer(from, to, tokenId);
    }

    /// can be called by the owner of token to exit the DAO
    /// Burns the token ID from the users Account
    function burn(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only owner of the token can burn it"
        );
        _burn(tokenId);

        // we need to send back the amount from Funds to the user
        bool success = _funds.returnStake(msg.sender);
        require(success, "Burn could not be Completed");
    }

    /// function to remove someone from the DAO  , called only by the owner
    /// will burn the token ID from the users account
    /// No refund allowed here
    function revoke(uint256 tokenId) external onlyManager {
        _burn(tokenId);
    }

    /// after any token transfer , events are emitted, revoke show when the NFT is burnt
    /// attest when NFT is minted
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
