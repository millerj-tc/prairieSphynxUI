import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";


import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import {UpdateCardForUser} from "./updateFirebase.js";

import {charData} from "../data/charData.js";

///
///// IMPORTANT: Rather than having a "flow" subsequent functions are called within the callback/promise/whatever to makes sure that each step completes before moving on 
///

///
///// IMPORTANT: Currently only updates cards owned by user. NPCS (Fey, etc.) not udpated 
///

export function GAG101Login(){ //this is what gets called by a Login button or similar
    
    const email = document.getElementById("existingUserEmail").value;
    const pass = document.getElementById("existingPass").value;
    const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    //RetrieveUserData()
    
    
  })
  .catch((error) => {
    window.alert("Could not login :(");
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

export function RetrieveUserData(loginCallback=false){
    const db = getDatabase();
    const dbRef = ref(db);
    const uid = window.gameHandler.playerId;
    get(child(dbRef, `users/` + uid + `/name`)).then((snapshot) => {
      if (snapshot.exists()) {
         
          
          window.gameHandler.playerUsername = snapshot.val();

          
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
        
    const cardRef = ref(db, 'users/' + uid + '/cards');
    onValue(cardRef, (snapshot) => {
        const data = snapshot.val();
        
        // if it's the first time logging in, upload each owned card

        
        if(data == null){
            
             for (const c of window.gameHandler.collectionCardHandler.GetCards("player")){
            
                UpdateCardForUser(c);
            }    
            
        }
        
        else{
            
            window.gameHandler.collectionCardHandler.EmptyCards(uid);

        
            // otherwise, download the user's collection
            
            for(const cardKey in data){ //MUST BE "IN" NOT "OF" BECAUSE DATA IS TECHNICALLY NOT ARR

                window.gameHandler.collectionCardHandler.MakeCardFromJSON(data[cardKey].card,uid);
            }
            
            // add any new cards that were patched into the game by checking charData for any cards that don't exist in cardHandler after updating from server
            
            for(const card of charData){
                
                if(card.unlockedForPlayer){
                    
                    let match = false
                    
                    for(const downloadedCard of window.gameHandler.collectionCardHandler.GetCards(uid)){
                        
                        
                        
                        if(downloadedCard.name == card.name) match = true
                        
                    }
                    
                    if(!match) {
                        
                        const newCardJSON = JSON.stringify(card);
                        
                        const newCard = window.gameHandler.collectionCardHandler.MakeCardFromJSON(newCardJSON);
                        
                        UpdateCardForUser(newCard);
                    }
                }
            }
        }
        


    });
}

export function UnlockServerUnlockedScenarios(){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    for(const s of scenarioHandler.scenarios){
        
        const db = getDatabase();
    const dbRef = ref(db);
    
    get(child(dbRef, `/users/` + window.gameHandler.playerId + `/scenarioAchivements/` + s.scenarioName + `/` + s.scenarioName + "Unlocked")).then((snapshot) => {
      if (snapshot.exists()) {

     const data = snapshot.val();

        if(data == "true"){

            s.UnlockScenario();

        }   


      } else {
        console.log("No data available");
      }
    }).catch((error) => {
        
      console.error(error);
    });
    }
}

export function LoadLocalCollectionCards(){
    
    // check cookies, then load from charData
    
    const ghCCH = window.gameHandler.collectionCardHandler;
    
    for(const c of charData){
        
        let fromCookies = false
        
        let cString;
        
        if(localStorage.getItem("player" + c.name) != null) fromCookies = true
        
        if(fromCookies) cString = localStorage.getItem("player" + c.name);
       
        else if(c.unlockedForPlayer) {
            
            
            //only store a local copy of cards that are unlocked
            UpdateCardForUser(c);
            
        }
        
        cString = JSON.stringify(c);
        
        const aiCopy = ghCCH.MakeCardFromJSON(cString, "AI");
            
        if(aiCopy.unlockedForPlayer) ghCCH.MakeCardFromJSON(cString,window.gameHandler.playerId)        
        

        
    }
}

export function UnlockLocalUnlockedScenarios(){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    for(const s of scenarioHandler.scenarios){
        
        if(localStorage.getItem(s.scenarioName + "Unlocked") == true) s.UnlockScenario();
    }
}