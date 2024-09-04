//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    //Define the Donate activity structure
    struct Campaign {
        //Create the owner of the activity
        address owner;
        //Activity title
        string title;
        //Activity description
        string description;
        //Target amount
        uint256 target;
        //deadline
        uint256 deadline;
        //The amount already claimed
        uint256 amountCollected;
        //Crowdfunding donors
        address[] donators;
        //How much each person donated
        uint256[] donations;
    }

    //Define the Donate activity mapping
    mapping(uint256 => Campaign) public campaigns;
    //Number of "Donate" campaigns (initial value is 0)
    uint256 public numberOfCampaign = 0;
    //Create the Donate activity function
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline) public returns (uint256) {

        Campaign storage campaign = campaigns[numberOfCampaign];
        //Validation deadline must be in the future
        require(campaign.deadline < block.timestamp, "The deadline must be in the future");
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;

        numberOfCampaign++;
        return numberOfCampaign - 1;
    }
    //Donate functions to campaign
    function donateToCampaign(uint256 _id) public payable {
        //The donation must be greater than 0
        require(msg.value > 0,"The donate money must be greater than 0");
        //Amount donated
        uint256 amount = msg.value;
        //Get the campaign
        Campaign storage campaign = campaigns[_id];
        //Verify that the activity is over
        require(campaign.deadline > block.timestamp, "The campaign has ended");
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        //Transfer the amount to the creator of the event
        (bool sent,) = payable(campaign.owner).call{value: amount}("");
        //If sent successfully
        if(sent) {
            campaign.amountCollected += amount;
        }
    }
    //Get information about the donors
    function getDonators(uint256 _id) public view returns (address[] memory,uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }
    //Get all the campaigns
    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaign);
        for(uint256 i = 0; i < numberOfCampaign; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

}
