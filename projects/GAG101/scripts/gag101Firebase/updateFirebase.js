import { getDatabase, ref, child, push, update, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function UpdateCardForUser(card){
        
    const uid = window.gameHandler.playerId;
    
    card.cardHandler = null;
    
    card.owner = window.gameHandler.playerId;
        
    localStorage.setItem("player" + card.name,JSON.stringify(card));
    
    const db = getDatabase();
    
  // A post entry.
  const postData = {
    card: JSON.stringify(card)

  };

  // Get a key for a new Post.
const newCardKey = push(child(ref(db), 'cards ')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + uid + `/cards/` + newCardKey + `/` ] = postData;

  return update(ref(db), updates);
    
    
}