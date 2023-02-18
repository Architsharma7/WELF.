// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
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
// Interaction only Via the Factory or Router
// The funds can be added via the Router only ,to add the rewards and records
// Also the withdrawl is only possible via the Router / Manager

contract PropFund is Ownable {
    /// @dev events to keep track of ether receive and Withdrawl
    event received(address user, uint256 amount);
    event withdrawal(address user, uint256 amount);
    event receivedToken(address token, address user, uint256 amount);
    event withdrawalToken(address token, address user, uint256 amount);

    mapping(address => uint256) contributors;

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
     *  ########   CONTRIBUTORS   #########
     */

    /// @dev check the balance of the DAO at any point of time
    /// @return returns balance of contract address (DAO)
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /// @dev check the balance of the DAO at any point of time
    /// @return returns balance of contract address (DAO)
    function getTokenBalance(address token) public view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    /// @dev Function to check the contribution for the user if they have done or not
    function getContribution(address _user) public view returns (uint256) {
        return contributors[_user];
    }

    /*
     *  ########   TOKENS   #########
     */

    /// @dev Need to provide the allowance first
    function donateTokens(
        address token,
        address from,
        uint256 amount
    ) public onlyManager {
        IERC20(token).transferFrom(from, address(this), amount);
  
    }

    function withdrawTokens(
        address token,
        address to,
        uint256 amount
    ) public onlyManager {
        IERC20(token).transfer(to, amount);
        emit withdrawalToken(token, to, amount);
    }

    /*
     *  ########    ETH RECIEVE AND WITHDRAW #########
     */

    /// @dev withdraw eth to a particular address in case of grants
    function depositETH(address _from)
        public
        payable
        onlyManager
    {
        require(msg.value > 0, "No Value Sent");
        contributors[_from] += msg.value;
        emit received(_from, msg.value);
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

    /// @dev Function to receive Ether. msg.data must be empty
    receive() external payable {
        contributors[msg.sender] += msg.value;
        emit received(msg.sender, msg.value);
    }

    /// @dev Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
