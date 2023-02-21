export function SubsequentRunReset(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    if(scenario.runProcessors.length > 1){
        
        window.gameHandler.narrOutputArtist.ClearAllChildren();

    }
}

export function PauseAtEndOfScenarioForPvP(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const runP = scenario.GetCurrentRunProcessor();
    
    const otherPlayerId = runP.otherPlayerId;
    
    const artist = window.gameHandler.narrOutputArtist;
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    if(otherPlayerId == null) return
    
    const button = document.createElement("button");
    
    button.innerText = "Continue";
    
    button.onclick = function(){
        
        console.log(cardHandler.GetCards(otherPlayerId));
        
        cardHandler.EmptyCards(otherPlayerId);
                
        console.warn(`finished against ${otherPlayerId}`);
        
        artist.InsertHTMLAdjacentToDOM("beforeend",`<br><br>`);
        
        button.remove();
        
        scenario.ProcessNextInQueue();
        
        
    }
    
    artist.AppendElementWithinDOM(button);
}