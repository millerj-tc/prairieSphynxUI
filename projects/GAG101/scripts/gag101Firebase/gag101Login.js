import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";


import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import {UpdateCardForUser} from "./updateFirebase.js";

import {charData} from "../data/charData.js";

///
///// IMPORTANT: Rather than having a "flow" subsequent functions are called within the callback/promise/whatever to makes sure that each step completes before moving on 
///

export function GAG101Login(){ //this is what gets called by a Login button or similar
    
    const email = document.getElementById("existingUserEmail").value;
    const pass = document.getElementById("existingPass").value;
    const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    _RetrieveUserData()
    window.gameHandler.loginWrapperArtist.SetDOMDisplayTo("none");
    
  })
  .catch((error) => {
    window.alert("Could not login :(");
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

function _RetrieveUserData(loginCallback=false){
    const db = getDatabase();
    const dbRef = ref(db);
    const uid = window.gameHandler.playerId;
    get(child(dbRef, `users/` + uid + `/name`)).then((snapshot) => {
      if (snapshot.exists()) {
         
          
          window.gameHandler.playerUsername = snapshot.val();
          
          console.log(window.gameHandler.playerUsername);
          console.log(window.gameHandler.playerId);
          
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
             for (const c of window.gameHandler.collectionCardHandler.GetCards()){
            
                UpdateCardForUser(c);
            }    
            
        }
        
        else{
            
            window.gameHandler.collectionCardHandler.EmptyCards();

        
            // otherwise, download the user's collection

            for(const cardKey in data){ //MUST BE "IN" NOT "OF" BECAUSE DATA IS TECHNICALLY NOT ARR

                window.gameHandler.collectionCardHandler.MakeCardFromJSON(data[cardKey].card,uid);
            }
        }
        


    });
}

export function LoadCollectionCards(){
    
    // check firebase, then cookies, then load from charData
    
    console.warn("player collections data should be housed on firebase so they can be retrieved if the player clears their cookies");
    
    const ghCCH = window.gameHandler.collectionCardHandler;
    
    for(const c of charData){
        
        const cString = JSON.stringify(c)
        
        const card = ghCCH.MakeCardFromJSON(cString);
        
        if(card.unlockedForPlayer == false) continue
        
        const card2 = ghCCH.MakeCardFromJSON(cString);
        
        card.owner = window.gameHandler.playerId;
        
        card2.owner = "AI";
        
    }
}