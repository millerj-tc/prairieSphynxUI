import {AnnounceTournamentResults} from "./uiPhaseUtils.js";
import {SetCardForContenderSlot} from "../scenarioFlow/genericScenarioPrep.js";

export function SubsequentRunReset(){
    
    const gh = window.gameHandler;
    
    if(gh.tournamentHandler.contenders.length == 0){
        
        gh.narrOutputArtist.ClearAllChildren();

    }
}

export function PauseAtEndOfScenarioForPvP(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const runP = scenario.GetCurrentRunProcessor();
    
    const player0Id = runP.contenders[0].playerId;
    
    const player1Id = runP.contenders[1].playerId;
    
    const artist = window.gameHandler.narrOutputArtist;
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    if(player1Id == "AI") return
    
    const button = document.createElement("button");
    
    button.innerText = "Continue";
    
    button.onclick = function(){
        
        if(player0Id != window.gameHandler.playerId) cardHandler.EmptyCards(player0Id); //don't empty the cards if they belong to the actual player
        
        cardHandler.EmptyCards(player1Id);
                
        console.warn(`finished against ${player1Id}`);
        
        artist.InsertHTMLAdjacentToDOM("beforeend",`<br><br><br><br>`);
        
        button.remove();
        
        console.log(scenario.queuedProcessors);
        
        if(scenario.queuedProcessors.length == 0){
            
            console.log("ending tournie");
            
            _EndTournament();
        }
        else{
        
        scenario.ProcessNextInQueue();
        
        }
        
        
    }
    
    artist.AppendElementWithinDOM(button);
}

export function InsertSubmissionCardsIntoCardSlots(){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    const runProcessor = window.gameHandler.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    for(let contenderIndex = 0; contenderIndex < runProcessor.contenders.length; contenderIndex ++){
        
        const contender = runProcessor.contenders[contenderIndex];
        
        if(contender.getCardsFromCollectionCardHandler) continue
        
        const userId = contender.playerId;
        
        const userCards = cardHandler.GetCards(userId);
        
        for(let contenderCardIndex = 0; contenderCardIndex < userCards.length; contenderCardIndex++){
            
            const card = userCards[contenderCardIndex];
            
            console.warn("when you replace contender0 card slots with server stuff it erases the choices of the player -- can fix by running player scenarios first?");
            SetCardForContenderSlot(card,userId,contenderIndex,contenderCardIndex);
        }
        
        
    }
}

function _EndTournament(){
    
    AnnounceTournamentResults();
            
    window.gameHandler.tournamentHandler.EmptyContenders();
    
    console.warn("figure out player winrate, compare with server winrates, etc.")

}

export function SetPlayer1Username(username){
    
    window.gameHandler.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor().contenders[1].playerUsername = username;
}