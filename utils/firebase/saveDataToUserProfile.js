import { getDatabase, ref, child, push, update } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function MemorizePoemToProfile(poemText) {
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

export function SaveDomeWordToProfile(text,frequency) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    uid: window.uid,
    text: text,
    frequency: frequency,  
    learnDate: Date.now(),

  };

  // Get a key for a new Post.
  const newWordKey = push(child(ref(db), 'domeWords ')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + window.uid + `/domeWords/` + newWordKey + `/` ] = postData;

  return update(ref(db), updates);
}