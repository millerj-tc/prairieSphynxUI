import {SubsequentRunReset} from "./scenarioPhases/scenarioMaintenance.js";
import {DupeConkLosers,RemoveDupeConkStatuses} from "./scenarioPhases/DupeConk.js";
import * as cardInfoPhaseUtils from "./scenarioPhases/cardInfoPhaseUtils.js";
import * as uiPhaseUtils from "./scenarioPhases/uiPhaseUtils.js";
import {scenarioProcessor} from "./scenarioFlow/scenarioProcessor.js";
import * as scenarioPrepUtils from "./scenarioFlow/genericScenarioPrep.js";
import {CollapseButtonOnClick} from "../../../../utils/uiTools/artists/trayArtistTrayMovement.js";
import {GenerateCombinations} from "../../../../utils/mathAndLogicUtils/miscUtils.js";
import {charData} from "../data/charData.js";

// need something to trigger GenericScenarioPrepWithAI to prep scenario

export function BuildDanceOfRiddlesPvEScenario(){
    
    const gh = window.gameHandler;
    
    const DOR = gh.scenarioHandler.AddScenario("Dance of Riddles");
    
    DOR.AddPhase("Subsequent Reset", SubsequentRunReset);
    
    DOR.AddPhase("Get Winners",_GetDanceofRiddlesWinners);
    
    DOR.AddPhase("Dance Output",_DanceOfRiddlesOutput);
    
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
        
        playerScore += (char.GetProp("speed") + char.GetProp("cunning") + char.GetProp("charisma"));
    }
    
    playerScore = playerScore/playerCards.length;
    
    let otherPlayerScore = 0;
    
    for(const char of otherPlayerCards){
        
        otherPlayerScore += (char.GetProp("speed") + char.GetProp("cunning") + char.GetProp("charisma"));
    }
    
    otherPlayerScore = otherPlayerScore/otherPlayerCards.length;
    
    console.log(`${playerScore} vs ${otherPlayerScore}`);
    
    if(playerScore > otherPlayerScore) gh.scenarioHandler.GetCurrentScenario().SetCurrentRunProcessorProp("winnerArr",playerCards);
    else if(otherPlayerScore > playerScore) gh.scenarioHandler.GetCurrentScenario().SetCurrentRunProcessorProp("winnerArr",otherPlayerCards);
    else  gh.scenarioHandler.GetCurrentScenario().SetCurrentRunProcessorProp("winnerArr",playerCards.concat(otherPlayerCards));
}

function _DanceOfRiddlesOutput(){
    
    const winnerArr = window.gameHandler.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessorProp("winnerArr");
    
    const artist = window.gameHandler.narrOutputArtist;
    
    artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    if(winnerArr.length > 4){
        
        uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]teamname] gambol vivaciously. For each step there is a counter-step. Every graceful inquiry is answered and matched until all the participants are exhausted. Nothing is decided.",winnerArr); 
    }
    else{
        
       uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]teamname] wriggle, strut, flounce, and prance. They dip and spin, they bend and twist. They pose a question with their bodies, an unanswerable enigma of form and motion.",winnerArr); 
    }
    
    let consoleString = "";
    
    for(const char of winnerArr){
        
        consoleString += char.name + " ";
    }
    
    console.error(consoleString);
}

export function DanceOfRiddlesPvEPrep(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;
    
    gh.scenarioHandler.SetCurrentScenarioByName("Dance of Riddles")

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    gh.narrOutputArtist.ClearAllChildren();
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("block");
    
    //CollapseButtonOnClick(gh.cardChoiceTrayArtist);
    
    scenarioPrepUtils.CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(4,gh.playerId,2);
    
    scenarioPrepUtils.CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(2,"AI",3);
    
    scenarioPrepUtils.RandomizePlayerIdCardChoicesForScenario();
    
    //scenarioPrepUtils.RandomizePlayerIdCardChoicesForScenario("AI");
    
    const holyFey = cardHandler.GetCardByName("Holy Fey","any",false);
    
    const holyFey2 = cardHandler.GetCardByName("Lesser Holy Fey","any",false);
    
    scenarioPrepUtils.SetCardForSlot(holyFey,"AI",0);
    
    scenarioPrepUtils.SetCardForSlot(holyFey2,"AI",1);
    
    scenarioPrepUtils. CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(gh.playerId,1);
    
    scenarioPrepUtils.CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("AI",4);
    
    scenarioPrepUtils.AttachOnClickCardChoiceToDOMs();
    
    scenarioPrepUtils.AddScenarioRunButton();
    
    uiPhaseUtils.OutputTextDivWithNounImages("[argN[Holy Fey]] : Welcome to the Dance of Riddles. The fey dance most connivingly -- what of you?");
    
    // below is debug
    
    const validChars = charData.filter(c => c.unlockedForPlayer);
    
    const teamIterations = GenerateCombinations(validChars,4);
    
    for(let i = 0; i < teamIterations.length; i++){
        
        const iterationArr = teamIterations[i];
        
        const slot0Name = iterationArr[0].name
              
        const slot1Name = iterationArr[1].name
            
        const slot2Name = iterationArr[2].name
            
        const slot3Name = iterationArr[3].name
        
        console.log(`testing ${slot0Name} ${slot1Name} ${slot2Name} ${slot3Name}`);
        
        const playerCard0 = cardHandler.GetCardByName(slot0Name,gh.playerId);
        
        const playerCard1 = cardHandler.GetCardByName(slot1Name,gh.playerId);
        
        const playerCard2 = cardHandler.GetCardByName(slot2Name,gh.playerId);
        
        const playerCard3 = cardHandler.GetCardByName(slot3Name,gh.playerId);
        
        scenarioPrepUtils.SetCardForSlot(playerCard0,gh.playerId,0);
        
        scenarioPrepUtils.SetCardForSlot(playerCard1,gh.playerId,1);
        
        scenarioPrepUtils.SetCardForSlot(playerCard2,gh.playerId,2);
        
        scenarioPrepUtils.SetCardForSlot(playerCard3,gh.playerId,3);
        
        console.log(slot0Name);
        
        console.log(playerCard0);
        
        console.log(slot1Name);
        
        console.log(playerCard1);
        
        console.log(cardInfoPhaseUtils.GetSelectedCardsFor(gh.playerId));
        
        scenario.BeginProcess();
        
        break
    }
    
}