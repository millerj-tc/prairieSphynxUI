import {AnnounceTournamentResults} from "./uiPhaseUtils.js";
import {SetCardForContenderSlot, GetAndAnnouncePvPLeaderboard} from "../scenarioFlow/genericScenarioPrep.js";
import {PlayerSubmissionToFirebaseFlow} from "../../pvp/pushSubmission.js";

export function SubsequentRunReset(){
    
    const gh = window.gameHandler;
    
    if(gh.tournamentHandler.contenders.length == 0){
        
        if(!gh.tournamentHandler.tournamentAnalysisMode)gh.narrOutputArtist.ClearAllChildren();

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
        
        artist.InsertHTMLAdjacentToDOM("beforeend",`<br><br><br><br>`);
        
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
            SetCardForContenderSlot(card,userId,contenderIndex,contenderCardIndex);
        }
        
        
    }
}

function _EndTournament(){
    
    AnnounceTournamentResults();
    
    const th = window.gameHandler.tournamentHandler;
    
    th.SortContendersByWinscore(); //this is where .ws (winscore) is assigned for next step
    
    if(!th.tournamentAnalysisMode) PlayerSubmissionToFirebaseFlow();
            
    th.EmptyContenders();
    
    if(!th.tournamentAnalysisMode) GetAndAnnouncePvPLeaderboard();

}

export function SetPlayer1Username(username){
    
    window.gameHandler.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor().contenders[1].playerUsername = username;
}