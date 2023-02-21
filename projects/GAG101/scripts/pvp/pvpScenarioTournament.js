// load existing submission, if any
// display leaderboard
// allow player to choose from their collection
// warn if submission within the last 24 hours and do not submit (get from user profile, not from gag101scenarios)
// retrieve top 10 submissions
// run each match, pausing between w/"continue" button to keep going
// if new deck did better than any existing deck, adjust win rates
// some kind of overall tournament result message
// adjust leaderboard
// give user timestamp of submission for that scenario
// if user has existing deck in top 10, replace that deck, otherwise add it
// then, if there are 11 decks in the top 10, remove the lowest ranked one (ties broken by earliest submission)

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

import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import {PushCurrentScenarioSubmissionToFirebase} from "./pushSubmission.js";

export function RunPvPTournament(){
    
    _GetScenarioLeaderboardSubmissionsAsJSON();
}

function _GetScenarioLeaderboardSubmissionsAsJSON(){
    
    const returnArr = [];
    
    const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, 'GAG101Scenarios/' + window.gameHandler.scenarioHandler.GetCurrentScenario().scenarioName + '/submissions')).then((snapshot) => {
      if (snapshot.exists()) {
         
          
     const data = snapshot.val();

            
        for(const userSubmission in data){
            
            const userSubmissionObj = data[userSubmission];
            
            const submissionTeamArr = [];
            
            for(const member in userSubmissionObj.team){
                
                const memberObj = userSubmissionObj.team[member];
                
                submissionTeamArr.push(memberObj.card);
            }
            
            console.log(userSubmissionObj);
            
            returnArr.push({teamAsJSONArr:submissionTeamArr, username:userSubmissionObj["submittingUser"],userId:"server" + userSubmission});
                  
        }
          
        PushCurrentScenarioSubmissionToFirebase("3");
        
        _RunSubmissionVsLeaderboard(returnArr);    

          
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

function _RunSubmissionVsLeaderboard(leaderboardArrAsJSON){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    const scenario =  window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    for(const submission of leaderboardArrAsJSON){
        
        let otherPlayerId;
        
        for(const JSONCard of submission.teamAsJSONArr){
            
            const card = cardHandler.MakeCardFromJSON(JSONCard,submission.userId);
            
            otherPlayerId = card.owner;

        }
        
        console.warn("all cards getting loaded in at outset, then slowly removed as you proceed through scenarios. should be loaded in as part of the tournament handler")
        
       scenario.QueueProcess(otherPlayerId,submission.username);
       
    }
    
    console.log(cardHandler);
    
    scenario.ProcessNextInQueue();
    
    
}