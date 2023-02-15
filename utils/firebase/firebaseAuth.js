import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import { getDatabase, ref, set, child, push, update } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import {LoginFlow} from "./loginFlow.js";

import {GetElementById} from "./../ui.js";

export function Register(){
    
    SignOut(false);
    
    const email = GetElementById("newUserEmail").value;
    const pass = GetElementById("newUserPass").value;
    
    if(pass.length < 7) window.alert("Password is too few characters :(");

    const auth = getAuth();   

    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        _PushCharacterNameAndOptOutToDatabase();
        _EstablishSession();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }

function _PushCharacterNameAndOptOutToDatabase(){
    
    const db = getDatabase();
    
    const optOutValue = GetElementById("optOutCheckbox").checked;

    const name = GetElementById("newUserChar").value
    
    set(ref(db, 'users/' + window.uid), {
        name: name,
        optOut: optOutValue,
        poems: {}
  });

}

export function Login(){
    
    const email = GetElementById("existingUserEmail").value;
    const pass = GetElementById("existingPass").value;
    const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    //_EstablishSession();
    //LoginFlow();        
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

export function EstablishSession(){
    
    const db = getDatabase();

  // A post entry.
  const postData = {

    loginDate: Date.now(),

  };

  // Get a key for a new Post.
  const newSessionKey = push(child(ref(db), 'sessions ')).key;
    
  window.gameHandler.actionLogger.SetSessionKey(newSessionKey);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/sessions/` + newSessionKey + `/` ] = postData;

  return update(ref(db), updates);
}

export function SignOut(reload = true){

    const auth = getAuth();
    signOut(auth).then(() => {
      if(reload) location.reload();
    }).catch((error) => {
      // An error happened.
    });
}

