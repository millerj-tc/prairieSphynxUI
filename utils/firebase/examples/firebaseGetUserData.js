import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import {PullPoemsFromProfileIntoMemoryFlow,PullDomeWordsFromDBIntoMindFlow} from "./pullFromDatabaseIntoHandlersFlows.js";

import {PostUserDataRetrievalFlow} from "./loginFlow.js";

export function GetUserDataAtLoginFlow(){
    
    _RetrieveName(true);
}

function _RetrieveName(loginCallback=false){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/` + window.uid + `/name`)).then((snapshot) => {
      if (snapshot.exists()) {
         window.gameHandler.SetPlayerName(snapshot.val());
          console.log(window.gameHandler.playerName);
          _RetreiveOptOutStatus(loginCallback);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

function _RetreiveOptOutStatus(loginCallback=false){
    
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/` + window.uid + `/optOut`)).then((snapshot) => {
      if (snapshot.exists()) {

        window.gameHandler.actionLogger.SetOptOut(snapshot.val());
          
          if(window.gameHandler.actionLogger.optOut == false) {
              setInterval(function(){window.gameHandler.actionLogger.ReportAndStartNewInterval()},10000);
          }
          
        GetUserDomeWords();  

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

function GetUserDomeWords(){
    
    const db = getDatabase();
    const domeWords = ref(db, 'users/' + window.uid + '/domeWords');
    onValue(domeWords, (snapshot) => {
        const data = snapshot.val();

        PullDomeWordsFromDBIntoMindFlow(data);
        
        if(window.gameHandler.loggingIn) GetUserPoems(3);
    });
}

export function GetUserPoems(n=3,loginCallback=false){
    
    const db = getDatabase();
    const poems = ref(db, 'users/' + window.uid + '/poems');
    onValue(poems, (snapshot) => {
        const data = snapshot.val();

        PullPoemsFromProfileIntoMemoryFlow(data);
        
        if(window.gameHandler.loggingIn) PostUserDataRetrievalFlow();
    });
}