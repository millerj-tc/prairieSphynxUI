import {SubsequentRunReset} from "./scenarioPhases/scenarioMaintenance.js";
import {DupeConkLosers,RemoveDupeConkStatuses} from "./scenarioPhases/DupeConk.js";
import * as cardInfoPhaseUtils from "./scenarioPhases/cardInfoPhaseUtils.js";
import * as uiPhaseUtils from "./scenarioPhases/uiPhaseUtils.js";
import {scenarioProcessor} from "./scenarioFlow/scenarioProcessor.js";
import * as scenarioPrepUtils from "./scenarioFlow/genericScenarioPrep.js";
import {CollapseButtonOnClick} from "../../../../utils/uiTools/artists/trayArtistTrayMovement.js";


// need something to trigger GenericScenarioPrepWithAI to prep scenario

export function BuildDanceOfRiddlesPvEScenario(){
    
    const gh = window.gameHandler;
    
    const DOR = gh.scenarioHandler.AddScenario("Dance of Riddles");

    gh.scenarioHandler.SetCurrentScenarioByName("Dance of Riddles");
    
    DOR.AddPhase("Subsequent Reset", SubsequentRunReset);
    
    DOR.AddPhase("Intro",uiPhaseUtils.OutputTextDivWithNounImages)
        .SetArguments([`[argN[Holy Fey]] : Welcome to the Dance of Riddles. The fey dance most connivingly -- what of you?`]);
    
    const winners = DOR.AddPhase("Get Winners",_GetDanceofRiddlesWinners);
    
    DOR.AddPhase("Dance Output",_DanceOfRiddlesOutput)
        .SetArguments([winners]);
    
    console.warn("winning dance of riddles should have some kind of game effect");

}

function _GetDanceofRiddlesWinners(){
    
    //highest average across team: speed, charisma, cunning) (Doran can whisper into people's ear for an additional +2)
    
    const gh = window.gameHandler;
    
    const playerCards = cardInfoPhaseUtils.GetSelectedCardsFor(gh.playerId);
    
    const otherPlayerCards = cardInfoPhaseUtils.GetSelectedCardsFor("AI");
    
    let playerScore = 0;
    
    console.warn("doran buff -- anything else?");
    
    for(const char of playerCards){
        
        playerScore += (char.GetProp("speed") + char.GetProp("cunning") + char.GetProp("charisma"))/3
    }
    
    let otherPlayerScore = 0;
    
    for(const char of otherPlayerCards){
        
        otherPlayerScore += (char.GetProp("speed") + char.GetProp("cunning") + char.GetProp("charisma"))/3
    }
    
    if(playerScore > otherPlayerScore) return playerCards
    else if(otherPlayerScore > playerScore) return otherPlayerCards
    else return playerCards.concat(otherPlayerCards)
}

function _DanceOfRiddlesOutput(winnerArr){
    
    if(winnerArr.length > 4){
        
        uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]teamname] gambol vivaciously. For each step there is a counter-step. Every graceful inquiry is answered and matched until all the participants are exhausted. Nothing is decided.",winnerArr); 
    }
    else{
        
       uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]teamname] wriggle, strut, flounce, and prance. They dip and spin, they bend and twist. They pose a question with their bodies, an unanswerable enigma of form and motion.",winnerArr); 
    }
}

export function DanceOfRiddlesPvEPrep(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    gh.narrOutputArtist.ClearAllChildren();
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("block");
    
    CollapseButtonOnClick(gh.cardChoiceTrayArtist);
    
    scenarioPrepUtils.CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(4,gh.playerId,2);
    
    scenarioPrepUtils.CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(2,"AI",3);
    
    scenarioPrepUtils.RandomizePlayerIdCardChoicesForScenario();
    
    //scenarioPrepUtils.RandomizePlayerIdCardChoicesForScenario("AI");
    
    const holyFey = cardHandler.GetCardByName("Holy Fey");
    
    const holyFey2 = cardHandler.GetCardByName("Lesser Holy Fey");
    
    scenarioPrepUtils.SetCardForSlot(holyFey,"AI",0);
    
    scenarioPrepUtils.SetCardForSlot(holyFey2,"AI",1);
    
    scenarioPrepUtils. CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(gh.playerId,1);
    
    scenarioPrepUtils.CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("AI",4);
    
    scenarioPrepUtils.AttachOnClickCardChoiceToDOMs();
    
    scenarioPrepUtils.AddScenarioRunButton();
    
    
}