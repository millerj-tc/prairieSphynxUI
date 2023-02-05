export function DisplayInactiveCardsAsChoices(period,owner){
    
    const gh = window.gameHandler;
    
    gh.dimmerArtist.SetDOMDisplayTo("flex");
        
    const scenarioCards = period.cardHandler.GetCards("inactive");
    
    const ownedCards = scenarioCards.filter(c => c.owner == owner);
    
    for(const c of ownedCards){
        
        const i = document.createElement("img");
        
        i.src = c.imageL;
        
        gh.cardChoiceGridArtist.AppendElementWithinDOM(i);
        
        i.onclick = function(){_OnClickCardSelect(c)}
    }
    
}

function _OnClickCardSelect(card){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentActivePeriod();
    
    console.log(scenario);
    
    const artist = scenario.lastClickedCardSlotArtist;
    
    scenario.UpdateCardSlotArtist(artist,card);
    
    
}