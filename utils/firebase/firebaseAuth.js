import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import { getDatabase, ref, set, child, push, update } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function Register(){
    
    SignOut(false);
    
    const email = document.getElementById("newUserEmail").value;
    const pass = document.getElementById("newUserPass").value;
    
    if(pass.length < 7) window.alert("Password is too few characters :(");

    const auth = getAuth();   

    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        _PushUserNameToDatabase();
        _EstablishSession();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }

function _PushUserNameToDatabase(){
    
    const db = getDatabase();
    

    const name = document.getElementById("newUserName").value
    
    set(ref(db, 'users/' + window.uid), {
        name: name
  });

}

export function Login(){ //this is what gets called by a Login button or similar
    
    const email = document.getElementById("existingUserEmail").value;
    const pass = document.getElementById("existingPass").value;
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

export function EstablishSession(){ //this is only necessary if using actionLogger
    
    const db = getDatabase();

  // A post entry.
  const postData = {

    loginDate: Date.now(),

  };

  // Get a key for a new Post.
  const newSessionKey = push(child(ref(db), 'sessions ')).key;
    
    if(window.actionLogger != null) window.actionLogger.SetSessionKey(newSessionKey);
    
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

