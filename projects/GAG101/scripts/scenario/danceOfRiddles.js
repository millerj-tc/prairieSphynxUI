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
    
    DOR.playerCardSlots = 4;
    
    gh.scenarioHandler.SetCurrentScenarioByName("Dance of Riddles");
    
    DOR.AddPhase("Subsequent Reset", SubsequentRunReset);
    
    DOR.AddPhase("Intro",uiPhaseUtils.OutputTextDivWithNounImages)
        .SetArguments([`[argN[Holy Fey]]: Welcome to the Dance of Riddles. The fey dance most connivingly -- what of you?`]);
    
    

}

export function DanceOfRiddlesPvEPrep(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    gh.narrOutputArtist.ClearAllChildren();
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("block");
    
    CollapseButtonOnClick(gh.cardChoiceTrayArtist);
    
    scenarioPrepUtils.CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(scenario.playerCardSlots,gh.playerId,2);
    
    scenarioPrepUtils.CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(scenario.otherPlayerCardSlots,"AI",3);
    
    scenarioPrepUtils.RandomizePlayerIdCardChoicesForScenario();
    
    scenarioPrepUtils.RandomizePlayerIdCardChoicesForScenario("AI");
    
    console.error("choose fey characters");
    
    scenarioPrepUtils. CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(gh.playerId,1);
    
    scenarioPrepUtils.CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("AI",4);
    
    scenarioPrepUtils.AttachOnClickCardChoiceToDOMs();
    
    scenarioPrepUtils.AddScenarioRunButton();
    
    
}