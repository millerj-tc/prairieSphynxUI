import { getDatabase, ref, child, push, update, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function HeardPoemToCharacterDatabaseEntry(poemText,characterId) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    reciterName: window.gameHandler.playerName,
    poemText: poemText,
    heardPoemDate: Date.now(),

  };

  // Get a key for a new Post.
  const newPoemKey = push(child(ref(db), 'heardPoems ')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/characters/' + characterId + `/heardPoems/` + newPoemKey + `/` ] = postData;

  return update(ref(db), updates);
}

export function GetCharacterHeardPoems(characterObj){
    
    const db = getDatabase();
    const characterId = characterObj.id;
    const poems = ref(db, 'characters/' + characterId + '/heardPoems');
    onValue(poems, (snapshot) => {
        const data = snapshot.val();

        _PassPoemsToCharacterObj(data,characterObj);
    });
}

function _PassPoemsToCharacterObj(data,characterObj){
    
    const poemObjArr = data;

    for(const poemObjString in poemObjArr){
        
        const pulledPoemObj = poemObjArr[poemObjString]; 

        characterObj.AddHeardPoem(pulledPoemObj.poemText,poemObjString,pulledPoemObj.heardPoemDate,pulledPoemObj.reciterName);
    }
}