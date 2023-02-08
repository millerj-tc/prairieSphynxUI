export function LoadCardArrIntoObjCardHandler(cardArr,obj,owner=null){

    for(const c of cardArr){

        const card = obj.cardHandler.AddCard(c); //It's important to use AddCard() rather than just declaring cardHandler.cards = [arr] in order to get disposable copies
        
        card.Deactivate(); //cards must be deactivated as they are passed so that the next period can determine whether or not they need them
        
        if(owner != null) card.owner = owner;
    }
}

export function StunCard(card,duration){
    
    const runId = window.gameHandler.scenarioHandler.preppedScenario.runId;
    
    console.error("scenario handler needs runcount -- use Date.now?");
    
    const sfx = card.cardFxHandler.ApplyFx("stun",duration);
    
    sfx.gamestateMarker = new gagGamestateMarker(runId,)
    
    // have an object that runs through an array of functions [func,args] with .apply you can get name with .toString and id# with position in array. Also gives you an easy way to check what is "after" or "before" any step in a scenario;
}
    
    