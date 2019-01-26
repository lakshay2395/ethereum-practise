pragma solidity ^0.4.17;

contract CampaignFactory{
    
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public{
        address newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        mapping(address => bool) approvals;
        uint approvalCount;
        bool complete;
    }
    
    Request[] public requests;
    
    address public manager;
    
    uint public minimumContribution;
    
    mapping(address => bool) public approvers;
    
    uint public approversCount;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum,address creator) public{
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    
    function createRequest(string description,uint value,address recipient) 
        public restricted{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount : 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public{
        //To check whether sender has contributed or not
        require(approvers[msg.sender]);
        Request storage request = requests[index]; 
        //To check whether sender has approved before or not
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        require(!requests[index].complete);
        require(requests[index].approvalCount > (approversCount/2));
        requests[index].recipient.transfer(requests[index].value);
        requests[index].complete = true;
    }

    function getSummary() public view returns (uint,uint,uint,uint,address){
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }
}
