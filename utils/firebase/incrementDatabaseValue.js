import { getDatabase, ref, child, push, update } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function IncrementDatabaseValue(value,amount) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    uid: window.uid,
    poemText: poemText,
    memorizationDate: Date.now(),

  };

  // Get a key for a new Post.
  const newPoemKey = push(child(ref(db), 'poems ')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + window.uid + `/poems/` + newPoemKey + `/` ] = postData;

  return update(ref(db), updates);
}

function _GetDatabaseCurrentValue(value){
    
    
}