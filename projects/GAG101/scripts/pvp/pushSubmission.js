import {GetSelectedCardsFor} from "./../scenario/scenarioPhases/cardInfoPhaseUtils.js";

import { getDatabase, ref, child, push, update, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function PushCurrentScenarioSubmissionToFirebase(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const username = window.gameHandler.playerUsername;
    
    const playerCards = GetSelectedCardsFor(window.gameHandler.playerId);
    
    for(const c of playerCards){
        
        c.cardHandler = null;
    }
    
    const db = getDatabase();
    
    console.log(playerCards);

  // A post entry.
  const postData = {
    submittingUser: username,
    submissionTimestamp: serverTimestamp(),
    team: JSON.stringify(playerCards)

  };

  // Get a key for a new Post.
  const newSubmissionKey = push(child(ref(db), 'submissions ')).key;

  const updates = {};
  updates['/GAG101Scenarios/' + scenario.scenarioName + `/submissions/` + newSubmissionKey + `/` ] = postData;

  return update(ref(db), updates);
    
    
}