// display leaderboard
// allow player to choose from their collection
// warn if submission within the last 24 hours and do not submit (get from user profile, not from gag101scenarios)
// give user timestamp of submission for that scenario

//firebase scenario structure:
//gag101scenarios
//-scenario name
//--submissions (same as leaderboard)
//---submission (numbered)
//----timestamp
//----username
//----winrate
//----team
//-----member01,etc. (MAKE SAME AS CARDS IN USER PROFILES)

import { getDatabase, ref, child, get, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import {PushCurrentScenarioSubmissionToFirebase} from "./pushSubmission.js";

import {GenerateCombinations} from "/utils/mathAndLogicUtils/miscUtils.js";

export function RunPvPTournament(){
    
    _CheckLastSubmissionDate();
    
 }

function _CheckLastSubmissionDate(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const db = getDatabase();
    const dbRef = ref(db);
    
    get(child(dbRef, `/users/` + window.gameHandler.playerId + `/` + scenario.scenarioName + `LastSubmissionTimestamp`)).then((snapshot) => {
      if (snapshot.exists()) {
          
          const data = snapshot.val();
          
          if((data + 86400) < Number(Date.now())){ 
              
              _GetScenarioLeaderboardSubmissionsAsJSON();
            }
          
          else{
              
              window.alert("Last submission was less than 24 hours ago");
              return
          }
          
          console.log("finish");

          
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

function _GetScenarioLeaderboardSubmissionsAsJSON(){
    
    const returnArr = [];
    
    const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, 'GAG101Scenarios/' + window.gameHandler.scenarioHandler.GetCurrentScenario().scenarioName + '/submissions')).then((snapshot) => {
      if (snapshot.exists()) {
         
          
     const data = snapshot.val();
          
        if(data == ""){
            
            PushCurrentScenarioSubmissionToFirebase();
            return
          
        }

            
        for(const userSubmission in data){
            
            const userSubmissionObj = data[userSubmission];
            
            const submissionTeamArr = [];
            
            for(const member in userSubmissionObj.team){
                
                const memberObj = userSubmissionObj.team[member];
                
                submissionTeamArr.push(memberObj.card);
            }
            
            console.log(userSubmissionObj);
            
            returnArr.push({teamAsJSONArr:submissionTeamArr, username:userSubmissionObj["submittingUser"],userId:"server" + userSubmission,submissionTimestamp: userSubmissionObj["submissionTimestamp"]});
                  
        }
        
        _RunSubmissionVsLeaderboard(returnArr);    

          
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

function _RunSubmissionVsLeaderboard(leaderboardArrAsJSON){
    
    const gh = window.gameHandler;
    
    const cardHandler = gh.collectionCardHandler;
    
    const scenario =  gh.scenarioHandler.GetCurrentScenario();
    
    for(const submission of leaderboardArrAsJSON){
            
       const newContender =  gh.tournamentHandler.AddContender(submission.teamAsJSONArr,submission.userId,submission.username,submission.submissionTimestamp);
       
    }
    
    const matchesArr = GenerateCombinations(gh.tournamentHandler.contenders,2)
    
    for(const match of matchesArr){
        
        scenario.QueueProcess(match);
    }
    
    const playerContender = gh.tournamentHandler.AddContender(false,gh.playerId,gh.playerUsername,Date.now());
    
    for(const serverContender of gh.tournamentHandler.contenders){
        
        if(serverContender.playerId == playerContender.playerId) continue
        
        scenario.QueueProcess([playerContender,serverContender]);
    }
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("none");
    
    scenario.queuedProcessors.reverse(); // reverse so it runs the actual player scenarios first. Otherwise server matches will replace the player's choices in the card choice tray.
    
    console.log(scenario.queuedProcessors);
    
    scenario.ProcessNextInQueue();
    
    
}