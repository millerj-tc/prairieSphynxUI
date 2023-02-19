import {UpdateCardForUser} from "projects/GAG101/scripts/gag101Firebase/updateFirebase.js";

export function UnlockCardForPlayer(card){
    
    const ghCCH = window.gameHandler.collectionCardHandler;
    
    const newCard = ghCCH.AddCard(card);
    
    newCard.owner = window.gameHandler.playerId;
    
    newCard.unlockedForPlayer = true;
    
    UpdateCardForUser(card);
}