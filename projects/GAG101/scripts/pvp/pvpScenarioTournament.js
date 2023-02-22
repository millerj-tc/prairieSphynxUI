// load existing submission, if any
// display leaderboard
// allow player to choose from their collection
// warn if submission within the last 24 hours and do not submit (get from user profile, not from gag101scenarios)
// retrieve top 5 submissions
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

import {GenerateCombinations} from "/utils/mathAndLogicUtils/miscUtils.js";

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
    
    const gh = window.gameHandler;
    
    const cardHandler = gh.collectionCardHandler;
    
    const scenario =  gh.scenarioHandler.GetCurrentScenario();
    
    for(const submission of leaderboardArrAsJSON){
            
       const newContender =  gh.tournamentHandler.AddContender(submission.teamAsJSONArr,submission.userId,submission.username);
       
    }
    
    const matchesArr = GenerateCombinations(gh.tournamentHandler.contenders,2)
    
    for(const match of matchesArr){
        
        scenario.QueueProcess(match);
    }
    
    const playerContender = gh.tournamentHandler.AddContender(false,gh.playerId,gh.playerUsername);
    
    for(const serverContender of gh.tournamentHandler.contenders){
        
        if(serverContender.playerId == playerContender.playerId) continue
        
        scenario.QueueProcess([playerContender,serverContender]);
    }
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("none");
    
    scenario.ProcessNextInQueue();
    
    
}