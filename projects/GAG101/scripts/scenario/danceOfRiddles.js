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
    
    

}

function _GetDanceofRiddlesWinners(){
    
    //highest average across team: speed, charisma, cunning) (Doran can whisper into people's ear for an additional +2)
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
    
    scenarioPrepUtils.RandomizePlayerIdCardChoicesForScenario("AI");
    
    console.error("choose fey characters");
    
    scenarioPrepUtils. CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(gh.playerId,1);
    
    scenarioPrepUtils.CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("AI",4);
    
    scenarioPrepUtils.AttachOnClickCardChoiceToDOMs();
    
    scenarioPrepUtils.AddScenarioRunButton();
    
    
}