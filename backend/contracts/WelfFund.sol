// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

// Holds the Entry funds or any other funds protocol recieves
// Can recieve native Coin or other ERC20 tokens
// Amount can be taken out
// Can be staked to become a DAO member
// even Return the stake on burning the NFT

contract WelfFunds is Ownable {
    /// @dev events to keep track of ether receive and Withdrawl
    event received(address user, uint256 amount);
    event withdrawal(address user, uint256 amount);
    event receivedToken(address token, address user, uint256 amount);
    event withdrawalToken(address token, address user, uint256 amount);

    mapping(address => bool) contributors;
    mapping(address => uint256) stakers;

    uint256 public stakedAmount;

    address public manager;
    address public nftContract;

    constructor() {
        manager = msg.sender;
    }

    /*
     *  ########   MODIFIERS AND MANAGERS   #########
     */

    modifier onlyManager() {
        require(msg.sender == manager, "Only Manager Authorised");
        _;
    }

    modifier onlyNFTContract() {
        require(msg.sender == nftContract, "NOT AUTHORISED");
        _;
    }

    function setNFTContractAddress(address nftAddress) public onlyOwner {
        require(nftAddress != address(0), "Not a Valid Address");
        nftContract = nftAddress;
    }

    function changeManager(address newManager) public onlyOwner {
        require(newManager != address(0), "Not a Valid Address");
        manager = newManager;
    }

    /*
     *  ########   CONTRIBUTORS , DONATE TOKENS   #########
     */

    /// @dev check the balance of the DAO at any point of time
    /// @return returns balance of contract address (DAO)
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /// @dev withdraw eth to a particular address in case of grants
    function withdrawEthTo(address payable _to, uint256 _amount)
        public
        onlyManager
        returns (bool)
    {
        (bool success, ) = _to.call{value: _amount}("");
        emit withdrawal(_to, _amount);
        return success;
    }

    /// @dev Function to check the contribution for the user if they have done or not
    function getContribution(address _user) public view returns (bool) {
        return contributors[_user];
    }

    /// @dev Need to provide the allowance first
    function donateTokens(
        address token,
        address from,
        uint256 amount
    ) public {
        IERC20(token).transferFrom(from, address(this), amount);
        emit receivedToken(token, msg.sender, amount);
    }

    function withdrawTokens(
        address token,
        address to,
        uint256 amount
    ) public {
        IERC20(token).transfer(to, amount);
        emit withdrawalToken(token, to, amount);
    }

    /*
     *  ########   STAKING   #########
     */

    // function to add the staking
    function intiateStake(address _from, uint256 amount)
        external
        onlyNFTContract
    {
        // require(msg.value > 0, "NO ETHER SENT ");
        stakers[_from] = amount;

        stakedAmount += amount;
    }

    // function to return the joining fees
    function returnStake(address _userAddress)
        external
        onlyNFTContract
        returns (bool success)
    {
        uint256 amount = stakers[_userAddress];
        require(amount > 0, "NO STAKED AMOUNT FOUND");

        stakedAmount -= amount;
        // send out the Staked Amount back to the User
        (bool success, ) = _userAddress.call{value: amount}("");
        require(success, "Return failed");
        return success;
    }

    /*
     *  ########    ETH RECIEVE AND FALLBACK   #########
     */

    /// @dev Function to receive Ether. msg.data must be empty
    receive() external payable {
        contributors[msg.sender] = true;
        emit received(msg.sender, msg.value);
    }

    /// @dev Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
