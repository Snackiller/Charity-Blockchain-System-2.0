// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharityFund {
    struct Fund {
        string name;
        string description;
        address payable manager;
        uint256 goalAmount;
        uint256 totalDonated;
        uint256 donorCount;
        bool isGoalAchieved;
    }

    // Struct of record donor details
    struct Donor {
        address donorAddress;
        uint256 amount;
    }

    Fund[] public funds; // Fund array to store all the funds
    mapping(uint256 => Donor[]) public fundDonors; // map to hold list of donors for each fund
    address public owner; // contract owner's address

    // Event
    event FundCreated(uint256 fundIndex, string name, string description, uint256 goalAmount);
    event DonationReceived(uint256 fundIndex, address donor, uint256 amount);
    event GoalAchieved(uint256 fundIndex); // check if fund has reached goal

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    /**
     * Modifier
     * This modifier checks to make sure the creator is the owner before executing the function. 
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Create new funds
    function createFund(string memory _name, string memory _description, uint256 _goalAmount) public onlyOwner {
        Fund memory newFund = Fund({
            name: _name,
            description: _description,
            manager: payable(msg.sender),
            goalAmount: _goalAmount,
            totalDonated: 0,
            donorCount: 0,
            isGoalAchieved: false
        });
        funds.push(newFund);
        emit FundCreated(funds.length - 1, _name, _description, _goalAmount);
    }

    // Track donors and donations
    function donate(uint256 fundIndex) public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        require(fundIndex < funds.length, "Invalid fund index");
        require(!funds[fundIndex].isGoalAchieved, "Fund goal already achieved");

        Fund storage fund = funds[fundIndex];
        fund.totalDonated += msg.value;
        fund.donorCount++;

        // after donate, check if the fund has reached goal
        if (fund.totalDonated >= fund.goalAmount) {
            fund.isGoalAchieved = true;
            emit GoalAchieved(fundIndex);
        }

        // Record donor details
        fundDonors[fundIndex].push(Donor({donorAddress: msg.sender, amount: msg.value}));
        emit DonationReceived(fundIndex, msg.sender, msg.value);
    }

    // Get fund details for UI
    function getFunds() public view returns (Fund[] memory) {
        return funds;
    }
}