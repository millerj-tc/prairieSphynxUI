import {GetSelectedCardsFor} from "./../scenario/scenarioPhases/cardInfoPhaseUtils.js";

import { getDatabase, ref, child, push, update, onValue, serverTimestamp,remove,set } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function PlayerSubmissionToFirebaseFlow(){
    
    const th = window.gameHandler.tournamentHandler;
    
    const playerId = window.gameHandler.playerId;
    
    const playerContenderObj = th.GetContenderByUserId(playerId);
    
    const serverContenders = th.contenders.filter(c => c.owner != playerId);
    
    const scenarioName = window.gameHandler.scenarioHandler.GetCurrentScenario().scenarioName;
    
    let match = false;
    
    for(const contender of serverContenders){

        // if current submission is better than an existing submission, replace it
        if(contender.playerId.replace("server","") == playerId && playerContenderObj.ws > contender.ws){
            
            PushCurrentScenarioSubmissionToFirebase();
            
            
            
            // updater serverContender winscore
            
            
        }
        
        const db = getDatabase();
        
        set(ref(db, `/GAG101Scenarios/` + scenarioName + `/submissions/` + contender.playerId.replace("server","") + `/winscore`), contender.ws);
    }
    
    // if there aren't at least 5 server submissions, 
    
    if(serverContenders.length <= 5){
        
        PushCurrentScenarioSubmissionToFirebase();
        return
    }
    
    //if the lowest performing contender doesn't belong to player, push player and delete the lowest performing contender
    
    const lowestPerformingContenderId = th.contenders[0].playerId.replace("server","");
    
    if(lowestPerformingContenderId != playerId){
        
        PushCurrentScenarioSubmissionToFirebase();
        
        const db = getDatabase();
        remove(ref(db, `/GAG101Scenarios/` + scenarioName + `/submissions/` + lowestPerformingContenderId));
        
        return
    }
}

export function PushCurrentScenarioSubmissionToFirebase(dummyUser = "01"){
    
    const th = window.gameHandler.tournamentHandler;
    
    const playerId = window.gameHandler.playerId;
    
    const playerContenderObj = th.GetContenderByUserId(playerId);
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const username = window.gameHandler.playerUsername;
    
    const playerCards = GetSelectedCardsFor(window.gameHandler.playerId);
    
    for(const c of playerCards){
        
        c.cardHandler = null;
        c.protoLevel = "scenario";
    }
    
    const db = getDatabase();

  // A post entry.
  const postData = {
    submittingUser: username + dummyUser,
    submissionTimestamp: serverTimestamp(),
    winscore:playerContenderObj.ws,
    team: {}

  };
    
  for(let i = 0; i < playerCards.length; i++){
      
      postData.team["member" + i] = {card:JSON.stringify(playerCards[i])};
  }

  // Get a key for a new Post.
  //const newSubmissionKey = push(child(ref(db), 'submissions ')).key;

  const updates = {};
  updates['/GAG101Scenarios/' + scenario.scenarioName + `/submissions/` + window.gameHandler.playerId + dummyUser + `/` ] = postData;
    
  updates[`/users/` + window.gameHandler.playerId + `/` + scenario.scenarioName + `LastSubmissionTimestamp`] = serverTimestamp();

  return update(ref(db), updates);
    
    
}