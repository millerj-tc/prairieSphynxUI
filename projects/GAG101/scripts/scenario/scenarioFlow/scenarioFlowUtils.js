export function DisplayInactiveCardsAsChoices(period,owner){
    
    const gh = window.gameHandler;
    
    gh.dimmerArtist.SetDOMDisplayTo("flex");
    
    gh.cardChoiceGridArtist.ClearAllChildren();
        
    const scenarioCards = period.cardHandler.GetCards("inactive");
    
    const ownedCards = scenarioCards.filter(c => c.owner == owner);
    
    for(const c of ownedCards){
        
        const container = document.createElement("div");
        const i = document.createElement("img");
        const nameSpan = document.createElement("div");
        
        i.src = c.imageL;
        
        nameSpan.innerText = c.name;
        nameSpan.classList.add("nameSlot");
        
        gh.cardChoiceGridArtist.AppendElementWithinDOM(container);
        
        container.append(i);
        container.insertAdjacentHTML("beforeend","<br>");
        container.append(nameSpan);
        
        i.onclick = function(){_OnClickCardSelect(c)}
    }
    
}

function _OnClickCardSelect(card){
    
    const gh = window.gameHandler;
    
    gh.dimmerArtist.SetDOMDisplayTo("none");
    
    const scenario = window.gameHandler.scenarioHandler.preppedScenario;
    
    console.log(scenario);
    
    const artist = scenario.lastClickedCardSlotArtist;
    
    scenario.UpdateCardSlotArtist(artist,card);
    
    
}