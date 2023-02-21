import {AnnounceTournamentResults} from "./uiPhaseUtils.js";

export function SubsequentRunReset(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    console.log(scenario.runProcessors);
    
    if(scenario.runProcessors.length > 1 && window.gameHandler.tournamentHandler.matches.length == 0){
        
        window.gameHandler.narrOutputArtist.ClearAllChildren();

    }
}

export function PauseAtEndOfScenarioForPvP(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const runP = scenario.GetCurrentRunProcessor();
    
    const otherPlayerId = runP.otherPlayerId;
    
    const artist = window.gameHandler.narrOutputArtist;
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    if(otherPlayerId == "AI") return
    
    const button = document.createElement("button");
    
    button.innerText = "Continue";
    
    button.onclick = function(){
        
        console.log(cardHandler.GetCards(otherPlayerId));
        
        cardHandler.EmptyCards(otherPlayerId);
                
        console.warn(`finished against ${otherPlayerId}`);
        
        artist.InsertHTMLAdjacentToDOM("beforeend",`<br><br>`);
        
        button.remove();
        
        if(scenario.queuedProcessors.length == 0){
            
            _EndTournament();
        }
        else{
        
        scenario.ProcessNextInQueue();
        
        }
        
        
    }
    
    artist.AppendElementWithinDOM(button);
}

export function MarkWinnerForPvP(string){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const rp = scenario.GetCurrentRunProcessor();
    
    if(rp.match.serverCards == null) return
    
    if(string != "server" && string != "player") console.error("Mark Winner must be passed 'server' or 'player'");
    
    rp.match.winner = string;
    
    console.log(rp.match);
    
    console.log(window.gameHandler.tournamentHandler);
    
    
}

function _EndTournament(){
    
    AnnounceTournamentResults();
            
    window.gameHandler.tournamentHandler.EmptyMatches();
    
    console.warn("figure out player winrate, compare with server winrates, etc.")

}