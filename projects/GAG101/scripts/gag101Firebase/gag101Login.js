import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";


import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

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

    _RetrieveUsername()
    window.gameHandler.loginWrapperArtist.SetDOMDisplayTo("none");
    
  })
  .catch((error) => {
    window.alert("Could not login :(");
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

function _RetrieveUsername(loginCallback=false){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/` + window.gameHandler.playerId + `/name`)).then((snapshot) => {
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
}


//function GetUserDomeWords(){
//    
//    const db = getDatabase();
//    const domeWords = ref(db, 'users/' + window.uid + '/domeWords');
//    onValue(domeWords, (snapshot) => {
//        const data = snapshot.val();
//
//        PullDomeWordsFromDBIntoMindFlow(data);
//        
//        if(window.gameHandler.loggingIn) GetUserPoems(3);
//    });
//}