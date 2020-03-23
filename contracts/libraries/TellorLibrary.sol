pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./Utilities.sol";
import "./TellorStorage.sol";
import "./TellorTransfer.sol";
import "./TellorDispute.sol";
import "./TellorStake.sol";
import "./TellorGettersLibrary.sol";
import "../interfaces/TokenInterface.sol";

/**
 * @title Tellor Oracle System Library
 * @dev Contains the functions' logic for the Tellor contract where miners can submit the proof of work
 * along with the value and smart contracts can requestData and tip miners.
 */
library TellorLibrary {
    using SafeMath for uint256;

    event TipAdded(address indexed _sender, uint256 indexed _requestId, uint256 _tip, uint256 _totalTips);
    //emits when a new challenge is created (either on mined block or when a new request is pushed forward on waiting system)
    event NewChallenge(
        bytes32 _currentChallenge,
        uint256 indexed _currentRequestId,
        uint256 _difficulty,
        uint256 _totalTips
    );
    //emits when a the payout of another request is higher after adding to the payoutPool or submitting a request
    event NewRequestOnDeck(uint256 indexed _requestId, uint256 _onDeckTotalTips);
    //Emits upon a successful Mine, indicates the blocktime at point of the mine and the value mined
    event NewValue(uint256 indexed _requestId, uint256 _time, uint256 _value, uint256 _totalTips, bytes32 _currentChallenge);
    //Emits upon each mine (5 total) and shows the miner, nonce, and value submitted
    event NonceSubmitted(address indexed _miner, string _nonce, uint256 indexed _requestId, uint256 _value, bytes32 _currentChallenge);
    event NewValidatorsSelected(address _validator);

    /*Functions*/

    /*This is a cheat for demo purposes, will delete upon actual launch*/
/*    function theLazyCoon(TellorStorage.TellorStorageStruct storage self,address _address, uint _amount) public {
        self.uintVars[keccak256("total_supply")] += _amount;
        TellorTransfer.updateBalanceAtNow(self.balances[_address],_amount);
    } */

    /**
    * @dev Add tip to Request value from oracle
    * @param _requestId being requested to be mined
    * @param _tip amount the requester is willing to pay to be get on queue. Miners
    * mine the onDeckQueryHash, or the api with the highest payout pool
    */
    function addTip(TellorStorage.TellorStorageStruct storage self, uint256 _requestId, uint256 _tip) public {
        require(_requestId > 0, "RequestId is 0");
        TokenInterface tellorToken = TokenInterface(self.addressVars[keccak256("tellorToken")]);
            
        require(tellorToken.allowance(msg.sender,address(this)) >= _tip);

        //If the tip > 0 transfer the tip to this contract
        if (_tip > 0) {
            tellorToken.transferFrom(msg.sender, address(this), _tip);
        }

        //Update the information for the request that should be mined next based on the tip submitted
        updateOnDeck(self, _requestId, _tip);
        emit TipAdded(msg.sender, _requestId, _tip, self.requestDetails[_requestId].apiUintVars[keccak256("totalTip")]);
    }

     /**
    * @dev This fucntion is called by submitMiningSolution and adjusts the difficulty, sorts and stores the first
    * 5 values received, pays the miners, the dev share and assigns a new challenge
    * @param _nonce or solution for the PoW  for the requestId
    * @param _requestId for the current request being mined
    */
    function newBlock(TellorStorage.TellorStorageStruct storage self, string memory _nonce, uint256 _requestId) internal {
        TellorStorage.Request storage _request = self.requestDetails[_requestId];
        TokenInterface tellorToken = TokenInterface(self.addressVars[keccak256("tellorToken")]);
        selectNewValidators(self,true);
        uint256 _timeOfLastNewValue = now - (now % 1 minutes);
        self.uintVars[keccak256("timeOfLastNewValue")] = _timeOfLastNewValue;
        //The sorting algorithm that sorts the values of the first five values that come in
        TellorStorage.Details[5] memory a = self.currentMiners;
        
                uint256 i;
                for (i = 1; i < 5; i++) {
                    uint256 temp = a[i].value;
                    address temp2 = a[i].miner;
                    uint256 j = i;
                    while (j > 0 && temp < a[j - 1].value) {
                        a[j].value = a[j - 1].value;
                        a[j].miner = a[j - 1].miner;
                        j--;
                    }
                    if (j < i) {
                        a[j].value = temp;
                        a[j].miner = temp2;
                    }
                }

        //keep track of selected miners that submitted a value.
        //and increase missed calls
           uint256 b;
           for (b = 1; b < 5; b++) {
                address temp3 = self.selectedValidators[b];
                if (self.validValidator[temp3] == true){
                    self.missedCalls[temp3]++;
                    reselectNewValidators(self);
                    if (self.missedCalls[temp3] == 5){
                        TellorStake.requestStakingWithdrawInternal(self,temp3,TellorTransfer.balanceOf(self,temp3));
                    }
                }
           }




        //Pay the miners
        for (i = 0; i < 5; i++) {
            tellorToken.transfer(a[i].miner, self.uintVars[keccak256("currentTotalTips")] / 5);
        }
        emit NewValue(
            _requestId,
            _timeOfLastNewValue,
            a[2].value,
            self.uintVars[keccak256("currentTotalTips")] - (self.uintVars[keccak256("currentTotalTips")] % 5),
            self.currentChallenge
        );

        //Save the official(finalValue), timestamp of it, 5 miners and their submitted values for it, and its block number
        _request.finalValues[_timeOfLastNewValue] = a[2].value;
        _request.requestTimestamps.push(_timeOfLastNewValue);
        //these are miners by timestamp
        _request.minersByValue[_timeOfLastNewValue] = [a[0].miner, a[1].miner, a[2].miner, a[3].miner, a[4].miner];
        _request.valuesByTimestamp[_timeOfLastNewValue] = [a[0].value, a[1].value, a[2].value, a[3].value, a[4].value];
        _request.minedBlockNum[_timeOfLastNewValue] = block.number;
        //map the timeOfLastValue to the requestId that was just mined

        self.requestIdByTimestamp[_timeOfLastNewValue] = _requestId;
        //add timeOfLastValue to the newValueTimestamps array
        self.newValueTimestamps.push(_timeOfLastNewValue);
        //re-start the count for the slot progress to zero before the new request mining starts
        self.uintVars[keccak256("slotProgress")] = 0;
        uint256 _topId = TellorGettersLibrary.getTopRequestID(self);
        self.uintVars[keccak256("currentRequestId")] = _topId;
        //if the currentRequestId is not zero(currentRequestId exists/something is being mined) select the requestId with the hightest payout
        //else wait for a new tip to mine
        if (_topId > 0) {
            //Update the current request to be mined to the requestID with the highest payout
            self.uintVars[keccak256("currentTotalTips")] = self.requestDetails[_topId].apiUintVars[keccak256("totalTip")];
            //Remove the currentRequestId/onDeckRequestId from the requestQ array containing the rest of the 50 requests
            self.requestQ[self.requestDetails[_topId].apiUintVars[keccak256("requestQPosition")]] = 0;

            //unmap the currentRequestId/onDeckRequestId from the requestIdByRequestQIndex
            self.requestIdByRequestQIndex[self.requestDetails[_topId].apiUintVars[keccak256("requestQPosition")]] = 0;

            //Remove the requestQposition for the currentRequestId/onDeckRequestId since it will be mined next
            self.requestDetails[_topId].apiUintVars[keccak256("requestQPosition")] = 0;

            //Reset the requestId TotalTip to 0 for the currentRequestId/onDeckRequestId since it will be mined next
            //and the tip is going to the current timestamp miners. The tip for the API needs to be reset to zero
            self.requestDetails[_topId].apiUintVars[keccak256("totalTip")] = 0;

            //gets the max tip in the in the requestQ[51] array and its index within the array??
            uint256 newRequestId = TellorGettersLibrary.getTopRequestID(self);
            //Issue the the next challenge
            self.currentChallenge = keccak256(abi.encodePacked(_nonce, self.currentChallenge, blockhash(block.number - 1))); // Save hash for next proof
            emit NewChallenge(
                self.currentChallenge,
                _topId,
                self.uintVars[keccak256("difficulty")],
                self.uintVars[keccak256("currentTotalTips")]
            );
            emit NewRequestOnDeck(
                newRequestId,
                self.requestDetails[newRequestId].apiUintVars[keccak256("totalTip")]
            );
        } else {
            self.uintVars[keccak256("currentTotalTips")] = 0;
            self.currentChallenge = "";
        }
    }

    /**
    * @dev Proof of work is called by the miner when they submit the solution (proof of work and value)
    * @param _nonce uint submitted by miner
    * @param _requestId the apiId being mined
    * @param _value of api query
    */
    function submitMiningSolution(TellorStorage.TellorStorageStruct storage self, string memory _nonce, uint256 _requestId, uint256 _value)
        public
    {
        //requre miner is staked
        require(self.stakerDetails[msg.sender].currentStatus == 1, "Miner status is not staker");

        //Check the miner is submitting the pow for the current request Id
        require(_requestId == self.uintVars[keccak256("currentRequestId")], "RequestId is wrong");
        
        //Check the validator submitting data is one of the selected validators
        require(self.validValidator[msg.sender] == true, "Not a selected validator");


        //Saving the challenge information as unique by using the msg.sender
        require(
            uint256(
                sha256(abi.encodePacked(ripemd160(abi.encodePacked(keccak256(abi.encodePacked(self.currentChallenge, msg.sender, _nonce))))))
            ) %
                self.uintVars[keccak256("difficulty")] ==
                0,
            "Challenge information is not saved"
        );

        //Make sure the miner does not submit a value more than once
        require(self.minersByChallenge[self.currentChallenge][msg.sender] == false, "Miner already submitted the value");

        //Save the miner and value received
        self.currentMiners[self.uintVars[keccak256("slotProgress")]].value = _value;
        self.currentMiners[self.uintVars[keccak256("slotProgress")]].miner = msg.sender;

        //Add to the count how many values have been submitted, since only 5 are taken per request
        self.uintVars[keccak256("slotProgress")]++;

        //Update the miner status to true once they submit a value so they don't submit more than once
        self.minersByChallenge[self.currentChallenge][msg.sender] = true;

        emit NonceSubmitted(msg.sender, _nonce, _requestId, _value, self.currentChallenge);

        //If 5 values have been received, adjust the difficulty otherwise sort the values until 5 are received
        if (self.uintVars[keccak256("slotProgress")] == 5) {
            newBlock(self, _nonce, _requestId);
        }


        //keep track of selected miners that submitted a value.
        //and increase missed calls for those who didn't
           uint256 b;
           for (b = 1; b < 5; b++) {
                address temp3 = self.selectedValidators[b];
                if (self.validValidator[temp3] == true){
                    reselectNewValidators(self);
                    self.missedCalls[temp3]++;
                    self.validValidator[temp3] == false;
                }
           }

        //Once a validator submits data set their status back to false
        self.validValidator[msg.sender] == false;

    }


   /**
    * @dev This function updates APIonQ and the requestQ when requestData or addTip are ran
    * @param _requestId being requested
    * @param _tip is the tip to add
    */
    function updateOnDeck(TellorStorage.TellorStorageStruct storage self, uint256 _requestId, uint256 _tip) internal {
        TellorStorage.Request storage _request = self.requestDetails[_requestId];
        uint256 onDeckRequestId = TellorGettersLibrary.getTopRequestID(self);
        //If the tip >0 update the tip for the requestId
        if (_tip > 0) {
            _request.apiUintVars[keccak256("totalTip")] = _request.apiUintVars[keccak256("totalTip")].add(_tip);
        }
        //Set _payout for the submitted request
        uint256 _payout = _request.apiUintVars[keccak256("totalTip")];

        //If there is no current request being mined
        //then set the currentRequestId to the requestid of the requestData or addtip requestId submitted,
        // the totalTips to the payout/tip submitted, and issue a new mining challenge
        if (self.uintVars[keccak256("currentRequestId")] == 0) {
            _request.apiUintVars[keccak256("totalTip")] = 0;
            self.uintVars[keccak256("currentRequestId")] = _requestId;
            self.uintVars[keccak256("currentTotalTips")] = _payout;
            self.currentChallenge = keccak256(abi.encodePacked(_payout, self.currentChallenge, blockhash(block.number - 1))); // Save hash for next proof
            emit NewChallenge(
                self.currentChallenge,
                self.uintVars[keccak256("currentRequestId")],
                self.uintVars[keccak256("difficulty")],
                self.uintVars[keccak256("currentTotalTips")]
            );
        } else {
            //If there is no OnDeckRequestId
            //then replace/add the requestId to be the OnDeckRequestId, queryHash and OnDeckTotalTips(current highest payout, aside from what
            //is being currently mined)
            if (_payout > self.requestDetails[onDeckRequestId].apiUintVars[keccak256("totalTip")] || (onDeckRequestId == 0)) {
                //let everyone know the next on queue has been replaced
                emit NewRequestOnDeck(_requestId, _payout);
            }

            //if the request is not part of the requestQ[51] array
            //then add to the requestQ[51] only if the _payout/tip is greater than the minimum(tip) in the requestQ[51] array
            if (_request.apiUintVars[keccak256("requestQPosition")] == 0) {
                uint256 _min;
                uint256 _index;
                (_min, _index) = Utilities.getMin(self.requestQ);
                //we have to zero out the oldOne
                //if the _payout is greater than the current minimum payout in the requestQ[51] or if the minimum is zero
                //then add it to the requestQ array aand map its index information to the requestId and the apiUintvars
                if (_payout > _min || _min == 0) {
                    self.requestQ[_index] = _payout;
                    self.requestDetails[self.requestIdByRequestQIndex[_index]].apiUintVars[keccak256("requestQPosition")] = 0;
                    self.requestIdByRequestQIndex[_index] = _requestId;
                    _request.apiUintVars[keccak256("requestQPosition")] = _index;
                }
                // else if the requestid is part of the requestQ[51] then update the tip for it
            } else if (_tip > 0) {
                self.requestQ[_request.apiUintVars[keccak256("requestQPosition")]] += _tip;
            }
        }
    }
    



    /**
    * @dev Reselects validators if any of the first five fail to submit data
    */
    function reselectNewValidators(TellorStorage.TellorStorageStruct storage self) public{
        require( self.uintVars[keccak256("lastSelection")] < now - 30, "has not been long enough reselect");
        selectNewValidators(self,false);
    }

    /**
    * @dev Generates a random number to select validators
    */
    function randomnumber(TellorStorage.TellorStorageStruct storage self, uint _max, uint _nonce) internal returns (uint){
        return  uint(keccak256(abi.encodePacked(_nonce,now,self.uintVars[keccak256("totalTip")],msg.sender,block.difficulty,self.stakers.length))) % _max +1;
    }

    /**
    * @dev Selects validators
    * @param _reset true if validators need to be selected
    */
    function selectNewValidators(TellorStorage.TellorStorageStruct storage self, bool _reset) internal{
        // if(_reset):
        //     selectedValidators.length = 0
        require(_reset==true);
        self.selectedValidators.length = 0;
        uint j=0;
        uint i=0;
        address potentialValidator;
        while(j < 5){
            potentialValidator = self.stakers[randomnumber(self,self.stakers.length,i)];
            for(uint k=0;k<self.selectedValidators.length;k++){
                if(potentialValidator != self.selectedValidators[k]){
                    self.selectedValidators.push(potentialValidator);
                    emit NewValidatorsSelected(potentialValidator);
                    self.validValidator[potentialValidator] = true;//used to check if they are a selectedvalidator (better than looping through array)
                    j++;
               }
            }
        }
        self.uintVars[keccak256("lastSelected")] = now;
    }

}