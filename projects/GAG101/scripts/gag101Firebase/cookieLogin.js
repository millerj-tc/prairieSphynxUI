import{getAuth} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import { getDatabase, ref, set, child, push, update, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function LoginWithCookie(){
    
    console.error("allow only the user ID list to be read without a valid cookie");
    
    const auth = getAuth();
    
    const db = getDatabase();
    
    _GetCookie();
    
     const poems = ref(db, 'characters/berin/heardPoems');
    onValue(poems, (snapshot) => {
        const data = snapshot.val();

        console.log(data);
    });
}

function _GetCookie(){
    
    let uid = localStorage.getItem("gag101FirebaseKey");//null//
    
     const db = getDatabase();
    
    if(uid == null){
        uid = (Number(Date.now()) + (Math.random()*1000)).toFixed(0);
        localStorage.setItem("gag101FirebaseKey",uid);
        _AddUIDToRegistry(uid);
        
    }
    
    const users = ref(db, 'GAG101Users');
     onValue(users, (snapshot) => {
        const data = snapshot.val();

    });
        
    return uid
}

function _AddUIDToRegistry(uid){
    
    const db = getDatabase();
    
    const postData = {
    uid: uid

  };

  // Get a key for a new Post.
  const newUidKey = push(child(ref(db), 'GAG101Users ')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/GAG101Users/' + newUidKey + `/` ] = postData;

  return update(ref(db), updates);
}