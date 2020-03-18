pragma solidity ^0.5.0;

import "../TellorMaster.sol";
import "../Tellor.sol";
import "./UserContract.sol";
import "../interfaces/ADOInterface.sol";
/**
* @title UsingTellor
* This contracts creates for easy integration to the Tellor Tellor System
*/
contract UsingTellor is ADOInterface{
    UserContract tellorUserContract;
    address payable public owner;

    event OwnershipTransferred(address _previousOwner, address _newOwner);

    /*Constructor*/
    /**
    * @dev This function sents the owner and userContract address
    * @param _userContract is the UserContract.sol address
    */
    constructor(address _userContract) public {
        tellorUserContract = UserContract(_userContract);
        owner = msg.sender;
    }

    /*Functions*/
    /**
    * @dev Allows the user to get the latest value for the requestId specified
    * @param _requestId is the requestId to look up the value for
    * @return bool true if it is able to retreive a value, the value, and the value's timestamp
    */
    function getCurrentValue(uint256 _requestId) public view returns (bool ifRetrieve, uint256 value, uint256 _timestampRetrieved) {
        return tellorUserContract.getCurrentValue(_requestId);
    }

    /**
    * @dev Allows the user to get the latest value for the requestId specified using the 
    * ADO specification for the standard inteface for price oracles
    * @param _bytesId is the ADO standarized bytes32 price/key value pair identifier
    * @return the timestamp, outcome or value/ and the status code (for retreived, null, etc...)
    */
    function resultFor(bytes32 _bytesId) view external returns (uint256 timestamp,int256 outcome, int256 status){
        return tellorUserContract.resultFor(_bytesId);
    }

    /**
    * @dev Allows the user to get the first verified value for the requestId after the specified timestamp
    * @param _requestId is the requestId to look up the value for
    * @param _timestamp after which to search for first verified value
    * @return bool true if it is able to retreive a value, the value, and the value's timestamp, the timestamp after
    * which it searched for the first verified value
    */
    function getFirstVerifiedDataAfter(uint256 _requestId, uint256 _timestamp) public view returns (bool, uint256, uint256 _timestampRetrieved) {
        return tellorUserContract.getFirstVerifiedDataAfter(_requestId, _timestamp);
    }

    /**
    * @dev Allows the user to get the first value for the requestId after the specified timestamp
    * @param _requestId is the requestId to look up the value for
    * @param _timestamp after which to search for first verified value
    * @return bool true if it is able to retreive a value, the value, and the value's timestamp
    */
    function getAnyDataAfter(uint256 _requestId, uint256 _timestamp)
        public
        view
        returns (bool _ifRetrieve, uint256 _value, uint256 _timestampRetrieved)
    {
        return tellorUserContract.getAnyDataAfter(_requestId, _timestamp);
    }

    /**
    * @dev Allows the user to tip miners for the specified request using Tributes
    * @param _requestId to tip
    * @param _tip amount
    */
    function addTip(uint256 _requestId, uint256 _tip) public {
        Tellor _tellor = Tellor(tellorUserContract.tellorStorageAddress());
        require(_tellor.transferFrom(msg.sender, address(this), _tip), "Transfer failed");
        _tellor.addTip(_requestId, _tip);
    }

    /**
    * @dev Allows user to add tip with Ether by sending the ETH to the userContract and exchanging it for Tributes
    * at the price specified by the userContract owner.
    * @param _requestId to tip
    */
    function addTipWithEther(uint256 _requestId) public payable {
        UserContract(tellorUserContract).addTipWithEther.value(msg.value)(_requestId);
    }

    /**
    * @dev allows owner to set the user contract address
    * @param _userContract address
    */
    function setUserContract(address _userContract) public {
        require(msg.sender == owner, "Sender is not owner"); //who should this be?
        tellorUserContract = UserContract(_userContract);
    }

    /**
    * @dev allows owner to transfer ownership
    * @param _newOwner address
    */
    function transferOwnership(address payable _newOwner) external {
        require(msg.sender == owner, "Sender is not owner");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}
