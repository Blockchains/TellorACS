// /** 
// * This contract tests the Tellor functions
// */ 

// const Web3 = require('web3')
// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
// const helper = require("./helpers/test_helpers");
// const Tellor = artifacts.require("./Tellor.sol"); // globally injected artifacts helper
// var ERC20 = artifacts.require("./ERC20.sol");
// var oracleAbi = Tellor.abi;

// contract('Oracle Tests', function(accounts) {
//   let oracle;
//   let tellorToken;
//   let res; 
//     beforeEach('Setup contract for each test', async function () {
//         tellorToken = await ERC20.new();
//         for(var i = 0;i<10;i++){
//           await tellorToken.mint(accounts[i],web3.utils.toWei('300','ether'));
//         }
//         oracle = await Tellor.new(tellorToken.address);
//         for(var i = 0;i<5;i++){
//           await tellorToken.approve(oracle.address,web3.utils.toWei('100','ether'),{from:accounts[i]});
//           await oracle.depositStake(web3.utils.toWei('100'),{from:accounts[i],gas:2000000,})
//         }
//         await oracle.theLazyCoon(accounts[0],web3.utils.toWei("500"));
//         await tellorToken.approve(oracle.address,5,{from:accounts[0]});
//         await oracle.addTip(1,5,{from:accounts[0],gas:2000000})
//     });  
//     it("Get Symbol,Name, Decimals", async function(){
// 		let symbol = await oracle.symbol();
//         assert.equal(symbol,"TRB","the Symbol should be TRB");
//         let name = await oracle.name();
//         assert.equal(name,"Tellor Tributes","the name should be Tellor Tributes");
//         let decimals = await oracle.decimals()
//         assert.equal(decimals,18,"the decimals should be 18");
//     });
  //  it("getStakersInfo", async function(){
		// let info = await oracle.getStakerInfo(accounts[1])
  //       let stake = web3.utils.hexToNumberString(info['0']);
  //       let startDate = web3.utils.hexToNumberString(info['1']);
  //       let _date = new Date();
  //       let d = (_date - (_date % 86400000))/1000;
  //       console.log(_date,d,startDate);
  //       assert(d*1==startDate, "startDate is today");
  //       assert(stake*1 == 1, "Should be 1 for staked address");
  //    });
 	// it("Test 5 Mines", async function () {
		// for(var i = 0;i < 5;i++){
  //           logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //           await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,0).encodeABI()});
  //       }

  //       res = web3.eth.abi.decodeParameters(['uint256','uint256'],logMineWatcher.data);
  //       assert(res[0] > 0, "value should be positive");
  //   });
  //   it("Test Is Data", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  // 		data = await oracle.getMinedBlockNum(1,res[0]);
  //       assert(data > 0, "Should be true if Data exist for that point in time");
  //   });
  //   it("Test Get Last Query", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)     
		// res2 = await oracle.getLastNewValue();
  //       assert(res2 = res[1], "Ensure data exist for the last mine value");
  //   });
  //   it("Test Data Read", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)     
  //       res2 = await oracle.retrieveData(1,res[0]);
 	// 	assert(res2 = res[1], "Ensure data exist for the last mine value");
  //       res2 = await oracle.getTimestampbyRequestIDandIndex(1,0);
  //       assert(res2 == res[0]);
  //   });
  //  it("Test Miner Payout", async function () {
  //       balances = []
  //       for(var i = 0;i<6;i++){
  //           balances[i] = await oracle.balanceOf(accounts[i]);
  //       }
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       new_balances = []
		// for(var i = 0;i<6;i++){
  //           new_balances[i] = await oracle.balanceOf(accounts[i]);
  //       }
  //       assert((web3.utils.hexToNumberString(new_balances[5]) - web3.utils.hexToNumberString(balances[5])) == web3.utils.toWei('5', 'ether'));
  //       assert((web3.utils.hexToNumberString(new_balances[1]) - web3.utils.hexToNumberString(balances[1])) == web3.utils.toWei('5', 'ether'));
  //       assert((web3.utils.hexToNumberString(new_balances[2]) - web3.utils.hexToNumberString(balances[2])) == web3.utils.toWei('5', 'ether'));
  //       assert((web3.utils.hexToNumberString(new_balances[3]) - web3.utils.hexToNumberString(balances[3])) == web3.utils.toWei('5', 'ether'));
  //       assert((web3.utils.hexToNumberString(new_balances[4]) - web3.utils.hexToNumberString(balances[4])) == web3.utils.toWei('5', 'ether'));
  //       //assert((web3.utils.hexToNumberString(new_balances[4]) - web3.utils.hexToNumberString(balances[4])) == web3.utils.toWei('1.1', 'ether'));
  //   });
  //  it("Test Difficulty Adjustment", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       diff1 =await oracle.getCurrentVariables();
		// assert((web3.utils.hexToNumberString(diff1[2])*1) > 1, "difficulty greater than 1");//difficulty not changing.....
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,0).encodeABI()});
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       vars = await oracle.getCurrentVariables();
  //       assert((web3.utils.hexToNumberString(vars[2])*1) > (web3.utils.hexToNumberString(diff1[2])*1), "difficulty should continue to move up");
  //   });
  //   it("Test didMine ", async function () {
		// vars = await oracle.getCurrentVariables();
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       didMine = oracle.didMine(vars[0],accounts[1]);
  //       assert(didMine);
  //   });
  //   it("Test Get MinersbyValue ", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)     
		// miners = await oracle.getMinersByRequestIdAndTimestamp(1, res[0]);
  //       assert(miners = [accounts[4],accounts[3],accounts[2],accounts[1],accounts[5]])
  //   });
  //   it("Test miner, alternating api request on Q and auto select", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,0).encodeABI()});
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,1).encodeABI()});  
  //       data = await oracle.getVariablesOnDeck();
  //       assert(data[0] == 0, 'There should be no API on Q');
  //       var vars = await oracle.getCurrentVariables();
  //       assert(vars[1] == 1, "miningApiId should be 1");
  //                   newOracle = await Tellor.new();
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:master.methods.changeTellorContract(newOracle.address).encodeABI()})
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api2,"ETH/USD",1000,5).encodeABI()});  
  //       data = await oracle.getVariablesOnDeck();
  //       assert(data[0] == 2, "API on q should be #2");
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,6).encodeABI()});
  //       data = await oracle.getVariablesOnDeck();
  //       assert(data[0] == 1, "API on q should be #1");
  //   });
    
  //   it("Test dispute", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)     
  //       balance1 = await oracle.balanceOf(accounts[2]);
  //       blocknum = await oracle.getMinedBlockNum(1,res[0]);
  //       await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[1],web3.utils.toWei('5000', 'ether')).encodeABI()})
  //       dispBal1 = await oracle.balanceOf(accounts[1])
		// await  web3.eth.sendTransaction({to: oracle.address,from:accounts[1],gas:7000000,data:oracle2.methods.beginDispute(1,res[0],2).encodeABI()});
  //       count = await oracle.getUintVar(web3.utils.keccak256("disputeCount"));
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[3],gas:7000000,data:oracle2.methods.vote(1,true).encodeABI()});
  //       await helper.advanceTime(86400 * 22);
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.tallyVotes(1).encodeABI()});
  //       dispInfo = await oracle.getAllDisputeVars(1);
  //       assert(dispInfo[7][0] == 1)
  //       assert(dispInfo[7][1] == res[0])
  //       assert(dispInfo[7][2] == res[1])
  //       assert(dispInfo[2] == true,"Dispute Vote passed")
  //       voted = await oracle.didVote(1, accounts[3]);
  //       assert(voted == true, "account 3 voted");
  //       voted = await oracle.didVote(1, accounts[5]);
  //       assert(voted == false, "account 5 did not vote");
  //       apid2valueF = await oracle.retrieveData(1,res[0]);
  //       assert(apid2valueF == 0 ,"value should now be zero this checks updateDisputeValue-internal fx  works");
  //       balance2 = await oracle.balanceOf(accounts[2]);
  //       dispBal2 = await oracle.balanceOf(accounts[1])
  //       assert(balance1 - balance2 == await oracle.getUintVar(web3.utils.keccak256("stakeAmount")),"reported miner's balance should change correctly");
  //       assert(dispBal2 - dispBal1 == await oracle.getUintVar(web3.utils.keccak256("stakeAmount")), "disputing party's balance should change correctly")
  //       s =  await oracle.getStakerInfo(accounts[2])
  //       assert(s != 1, " Not staked" );
  //   });
  //   it("Test multiple dispute to one miner", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)     
  //       balance1 = await oracle.balanceOf(accounts[2]);
  //       blocknum = await oracle.getMinedBlockNum(1,res[0]);
  //       await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[0],web3.utils.toWei('5000', 'ether')).encodeABI()})
  //       await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[1],web3.utils.toWei('5000', 'ether')).encodeABI()})
  //       await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[4],web3.utils.toWei('5000', 'ether')).encodeABI()})
  //       resVars = []
  //       for(i=0;i<3;i++){
  //          await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,0).encodeABI()})
  //           logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //           resVars[i] = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //           await helper.advanceTime(1000);
  //       }
  //       dispBal1 = await oracle.balanceOf(accounts[1])
  //       orig_dispBal4 = await oracle.balanceOf(accounts[4])
  //       await  web3.eth.sendTransaction({to: oracle.address,from:accounts[1],gas:7000000,data:oracle2.methods.beginDispute(1,resVars[0][0],2).encodeABI()});
  //       count = await oracle.getUintVar(web3.utils.keccak256("disputeCount"));
  //       await  web3.eth.sendTransaction({to: oracle.address,from:accounts[4],gas:7000000,data:oracle2.methods.beginDispute(1,resVars[1][0],2).encodeABI()});
  //       count2 = await oracle.getUintVar(web3.utils.keccak256("disputeCount"));
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.beginDispute(1,resVars[2][0],2).encodeABI()});
  //       count2 = await oracle.getUintVar(web3.utils.keccak256("disputeCount"));
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[3],gas:7000000,data:oracle2.methods.vote(1,true).encodeABI()});
  //       await helper.advanceTime(86400 * 22);
  //       balance1 = await oracle.balanceOf(accounts[2]);
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.tallyVotes(1).encodeABI()});
  //       dispInfo = await oracle.getAllDisputeVars(1);
  //       assert(dispInfo[7][0] == 1)
  //       assert(dispInfo[7][1] == resVars[0][0])
  //       assert(dispInfo[7][2] == resVars[0][1])
  //       assert(dispInfo[2] == true,"Dispute Vote passed")
  //       voted = await oracle.didVote(1, accounts[3]);
  //       assert(voted == true, "account 3 voted");
  //       voted = await oracle.didVote(1, accounts[5]);
  //       assert(voted == false, "account 5 did not vote");
  //       apid2valueF = await oracle.retrieveData(1,resVars[0][0]);
  //       assert(apid2valueF == 0 ,"value should now be zero this checks updateDisputeValue-internal fx  works");
  //       //checks balances after dispute 1
  //       balance2 = await oracle.balanceOf(accounts[2]);
  //       dispBal2 = await oracle.balanceOf(accounts[1])
  //       assert(balance1 - balance2 == await oracle.getUintVar(web3.utils.keccak256("stakeAmount")),"reported miner's balance should change correctly");
  //       assert(dispBal2 - dispBal1 == await oracle.getUintVar(web3.utils.keccak256("stakeAmount")), "disputing party's balance should change correctly")
  //       s =  await oracle.getStakerInfo(accounts[2])
  //       assert(s != 1, " Not staked" );
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[3],gas:7000000,data:oracle2.methods.vote(2,true).encodeABI()});
  //       await helper.advanceTime(86400 * 22);
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.tallyVotes(2).encodeABI()});
  //       dispBal4 = await oracle.balanceOf(accounts[4])
  //       assert(dispBal4 - orig_dispBal4 == 0,"a4 shouldn't change'")
  //       });

  //   it("Test 50 requests, proper booting, and mining of 5", async function () {
  //        this.timeout(0) 
  //        logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api2,"ETH/USD",1000,0).encodeABI()});
  //       console.log("10 then mine requests....");
  //        for(var i = 1;i <=10 ;i++){
  //           apix= ("api" + i);
  //           await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(apix,"t",1000,i).encodeABI()});
  //       }
		// await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,11).encodeABI()});
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //       data = await oracle.getMinedBlockNum(2,res[0]);

  //       assert(data>0, "Should be true if Data exist for that point in time");
  //       console.log("10 then mine requests....");
  //        for(var i = 11;i <=20 ;i++){
  //           apix= ("api" + i);
  //           await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(apix,"test",1000,i).encodeABI()});
  //       }
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api2,"ETH/USD",1000,21).encodeABI()});
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //       data = await oracle.getMinedBlockNum(1,res[0]);
  //       assert(data > 0, "Should be true if Data exist for that point in time");
  //       console.log("10 then mine requests....");
  //        for(var i = 21;i <=30 ;i++){
  //           apix= ("api" + i);
  //           await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(apix,"test",1000,i).encodeABI()});
  //       }
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,31).encodeABI()});
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //       data = await oracle.getMinedBlockNum(2,res[0]);
  //       assert(data > 0, "Should be true if Data exist for that point in time");
  //       console.log("10 then mine requests....");
  //        for(var i = 31;i <=40 ;i++){
  //           apix= ("api" + i);
  //           await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(apix,"test",1000,i).encodeABI()});
  //       }
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api2,"ETH/USD",1000,41).encodeABI()});
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //       data = await oracle.getMinedBlockNum(1,res[0]);
  //       assert(data > 0, "Should be true if Data exist for that point in time");
  //       console.log("10 then mine requests....");
  //        for(var i =41;i <=55 ;i++){
  //           apix= ("api" + i);
  //           await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(apix,"test",1000,i).encodeABI()});
  //       }
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,56).encodeABI()});
  //       vars = await oracle.getVariablesOnDeck();
  //       let sapi = vars['2'];
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //       data = await oracle.getMinedBlockNum(2,res[0]);
  //       assert(data > 0, "Should be true if Data exist for that point in time");
  //       apiVars = await oracle.getRequestVars(52)
  //       apiIdforpayoutPoolIndex = await oracle.getRequestIdByRequestQIndex(50);
  //       vars = await oracle.getVariablesOnDeck();
  //       let apiOnQ = web3.utils.hexToNumberString(vars['0']);
  //       let apiPayout = web3.utils.hexToNumberString(vars['1']);
  //       sapi = vars['2'];
  //       apiIdforpayoutPoolIndex2 = await oracle.getRequestIdByRequestQIndex(49);
  //       assert(apiIdforpayoutPoolIndex == 53, "position 1 should be booted"); 
  //       assert(sapi == "api55", "API on Q string should be correct"); 
  //       assert(apiPayout == 55 , "API on Q payout should be 51"); 
  //       assert(apiOnQ == 57, "API on Q should be 51"); 
  //       assert(apiVars[5] == 50, "value at position 52 should have correct value"); 
  //       assert(apiIdforpayoutPoolIndex2 == 54, "position 2 should be in same place"); 
  //   });
  //   it("Test Throw on Multiple Disputes", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)     
		// balance1 = await (oracle.balanceOf(accounts[2],{from:accounts[4]}));
  //       blocknum = await oracle.getMinedBlockNum(1,res[0]);
  //       await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[1],web3.utils.toWei('5000', 'ether')).encodeABI()})
  //       await  web3.eth.sendTransaction({to: oracle.address,from:accounts[1],gas:7000000,data:oracle2.methods.beginDispute(1,res[0],2).encodeABI()});
  //       await helper.expectThrow(web3.eth.sendTransaction({to: oracle.address,from:accounts[1],gas:7000000,data:oracle2.methods.beginDispute(1,res[0],2).encodeABI()}));
  //       let miners =await oracle.getMinersByRequestIdAndTimestamp(1,res[0]);
  //       let _var = await oracle.getDisputeIdByDisputeHash( web3.utils.soliditySha3({t:'address',v:miners[2]},{t:'uint256',v:1},{t:'uint256',v:res[0]}));
  //       assert(_var == 1, "hash should be same");
  //   });
  //   it("Test Dispute of different miner Indexes", async function () {
		// for(var i = 0;i<4;i++){
  //       	var k;
  //       	var j;
  //       	if(i>0){
  //       		j = i -1;
  //       		if(j>0){
	 //        		k = j -1;
	 //        	}
	 //        	else{
	 //        		k = 4;
  //       		}
  //       	}
  //       	else{
  //       		j = 4;
  //       		k = j -1;
  //       	}
	 //        oracle = await TellorMaster.new(oracleBase.address);
	 //        oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);///will this instance work for logWatch? hopefully...
  //      		//await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.init().encodeABI()})
	 //        await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,0).encodeABI()})
	 //        logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
	 //        res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
	 //        let miners =await oracle.getMinersByRequestIdAndTimestamp(1,res[0]);
	 //        await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(miners[j],web3.utils.toWei('5000', 'ether')).encodeABI()})
	 //        await  web3.eth.sendTransaction({to: oracle.address,from:miners[j],gas:7000000,data:oracle2.methods.beginDispute(1,res[0],i).encodeABI()});
	 //        let disputeVars = await oracle.getAllDisputeVars(1);
	 //        let vals = await oracle.getSubmissionsByTimestamp(1,res[0]);
	 //        assert(disputeVars['0'] == web3.utils.soliditySha3({t:'address',v:miners[i]},{t:'uint256',v:1},{t:'uint256',v:res[0]}),"hash Should be correct");
	 //        assert(disputeVars['1'] == false);
	 //        assert(disputeVars['2'] == false);
	 //        assert(disputeVars['5'] == miners[j], "reporter should be correct");
	 //        assert(disputeVars['7'][0] == 1)
	 //        assert(disputeVars['7'][1] == res[0], "timestamp should be correct")
	 //        assert(disputeVars['7'][2] -  vals[i] == 0, "value should be correct")
	 //        assert(disputeVars['7'][4] == 0)
	 //        assert(disputeVars['7'][6] == i, "index should be correct")
	 //        assert(disputeVars['7'][7] == 0)
	 //        assert(disputeVars['8'] == 0, "Tally should be correct")
	 //        balance1 = await oracle.balanceOf(miners[i]);

	 //        assert(disputeVars['4'] == miners[i],"miner should be correct")
	 //        await web3.eth.sendTransaction({to: oracle.address,from:miners[k],gas:7000000,data:oracle2.methods.vote(1,true).encodeABI()});
	 //        await helper.advanceTime(86400 * 22);
	 //        await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.tallyVotes(1).encodeABI()});
	 //        if(i==2){
	 //        	assert(await oracle.isInDispute(1,res[0]) == true)
	 //        }
	 //        else{
	 //        	assert(await oracle.isInDispute(1,res[0]) == false,"isInDispute should be correct")
	 //        }
	 //         balance2 = await oracle.balanceOf(miners[i]);
	 //        assert(balance1 - balance2 == await oracle.getUintVar(web3.utils.keccak256("stakeAmount")),"reported miner's balance should change correctly");
	 //        s =  await oracle.getStakerInfo(miners[i])
  //       	assert(s[0] !=1, " Staked" );
	 //        }

  //   });
    
  //       it("Ensure Miner staked after failed dispute", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)     
  //       balance1 = await oracle.balanceOf(accounts[2]);
  //       blocknum = await oracle.getMinedBlockNum(0,res[0]);
  //       await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[1],web3.utils.toWei('5000', 'ether')).encodeABI()})
  //       dispBal1 = await oracle.balanceOf(accounts[1])
  //       await  web3.eth.sendTransaction({to: oracle.address,from:accounts[1],gas:7000000,data:oracle2.methods.beginDispute(1,res[0],2).encodeABI()});
  //       count = await await oracle.getUintVar(web3.utils.keccak256("disputeCount"));
	 //    await web3.eth.sendTransaction({to: oracle.address,from:accounts[3],gas:7000000,data:oracle2.methods.vote(1,false).encodeABI()});
  //       await helper.advanceTime(86400 * 22);
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.tallyVotes(1).encodeABI()});
  //       balance2 = await oracle.balanceOf(accounts[2]);
  //       dispBal2 = await oracle.balanceOf(accounts[1])
  //       assert(balance2 - balance1 == await oracle.getUintVar(web3.utils.keccak256("disputeFee")),"balance1 should equal balance2")
  //       assert(dispBal1 - dispBal2 == await oracle.getUintVar(web3.utils.keccak256("disputeFee")))
  //               s =  await oracle.getStakerInfo(accounts[2])
  //       assert(s[0] ==1, " Staked" );
  //   });
    
  //  it("Test failed Dispute of different miner Indexes", async function () {
		//  for(var i = 0;i<4;i++){
  //       	var k;
  //       	var j;
  //       	if(i>0){
  //       		j = i -1;
  //       		if(j>0){
	 //        		k = j -1;
	 //        	}
	 //        	else{
	 //        		k = 4;
  //       		}
  //       	}
  //       	else{
  //       		j = 4;
  //       		k = j -1;
  //       	}
  //       	oracle = await TellorMaster.new(oracleBase.address);
	 //        oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);///will this instance work for logWatch? hopefully...
	 //        //await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.init().encodeABI()})
	 //        await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(api,"BTC/USD",1000,0).encodeABI()})
	 //        logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
	 //        res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
	 //        let miners =await oracle.getMinersByRequestIdAndTimestamp(1,res[0]);
	 //        await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(miners[j],web3.utils.toWei('5000', 'ether')).encodeABI()})
	 //        await  web3.eth.sendTransaction({to: oracle.address,from:miners[j],gas:7000000,data:oracle2.methods.beginDispute(1,res[0],i).encodeABI()});
	 //        let disputeVars = await oracle.getAllDisputeVars(1);
	 //        balance1 = await oracle.balanceOf(miners[i]);
	 //        assert(disputeVars['4'] == miners[i],"miner should be correct")
	 //        await web3.eth.sendTransaction({to: oracle.address,from:miners[k],gas:7000000,data:oracle2.methods.vote(1,false).encodeABI()});
	 //        await helper.advanceTime(86400 * 22);
	 //        await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.tallyVotes(1).encodeABI()});
	 //        assert(await oracle.isInDispute(1,res[0]) == false)
	 //     	balance2 = await oracle.balanceOf(miners[i]);
	 //        assert(balance2-balance1 == await oracle.getUintVar(web3.utils.keccak256("disputeFee")),"reported miner's balance should change correctly");
	 //        s =  await oracle.getStakerInfo(miners[i])
  //       	assert(s[0] ==1, " Staked" );
	 //     }
  //   })
  //   it("Test zero addTip", async function () {
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.addTip(1,0).encodeABI()})
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
		// res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //       data = await oracle.getMinedBlockNum(1,res[0]);
  //       assert(data > 0, "Should be true if Data exist for that point in time");
  //   });
  //   it("Test Proper zeroing of Payout Test", async function () {
  //   	logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api2,"ETH/USD",1000,22).encodeABI()})
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
		// vars = await oracle.getRequestVars(2)
  //       assert(vars['5'] == 0  , "api payout should be zero")
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.requestData(api2,"ETH/USD",1000,11).encodeABI()})
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       vars = await oracle.getUintVar(web3.utils.keccak256("currentTotalTips"))
  //       assert(vars == 0, "api payout should be zero")
  //   });

  //   it("Test Same ID mining and OnQ", async function () {
  //   	logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.addTip(1,3).encodeABI()});
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.addTip(1,3).encodeABI()})
  //       await web3.eth.sendTransaction({to: oracle.address,from:accounts[2],gas:7000000,data:oracle2.methods.addTip(1,3).encodeABI()})
		// let vars  = await oracle.getCurrentVariables();
  //       assert(vars[1] == 1 , "mining APIID is 1")
  //       vars = await oracle.getVariablesOnDeck();
  //       assert(vars[0] == 1, "apiOnQ is 1")
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
  //       res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //       assert(res['2'] == 0 , "last payout had a tip of 0")
  //       vars  = await  oracle.getCurrentVariables();
  //       assert(vars[1]==1, "mining APIID is 1")
  //       vars = await oracle.getVariablesOnDeck();
  //       assert(vars[0] == 0 , "apiOnQ is 0");
  //       logMineWatcher = await promisifyLogWatch(oracle.address, 'NewValue(uint256,uint256,uint256,uint256,bytes32)');//or Event Mine?
		// res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256'],logMineWatcher.data)
  //       console.log(res['2'])
  //       assert(res['2'] == 5 , "last payout had a tip of 5")
  //   });
 // });    