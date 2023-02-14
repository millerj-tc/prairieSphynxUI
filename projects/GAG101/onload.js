import {gameHandler} from "./scripts/gameHandler.js";
import {charData} from "./scripts/data/charData.js";
import {DupeConkLosers,RemoveDupeConkStatuses} from "./scripts/scenario/scenarioPhases/DupeConk.js";
import {GenericScenarioPrepWithAI} from "./scripts/scenario/scenarioFlow/genericScenarioPrep.js";
import * as cardInfoPhaseUtils from "./scripts/scenario/scenarioPhases/cardInfoPhaseUtils.js";
import * as uiPhaseUtils from "./scripts/scenario/scenarioPhases/uiPhaseUtils.js";
import {scenarioProcessor} from "./scripts/scenario/scenarioFlow/scenarioProcessor.js";
import {SubsequentRunReset} from "./scripts/scenario/scenarioPhases/scenarioMaintenance.js";


export function onload(){
    
    window.gameHandler = new gameHandler();
    
    const gh = window.gameHandler;
    
    _LoadCollectionCards();
    
    const koalas = gh.scenarioHandler.AddScenario("Time Koalas");
    
    gh.scenarioHandler.SetCurrentScenarioByName("Time Koalas");
    
    koalas.AddPhase("Subsequent Reset", SubsequentRunReset);

    
    koalas.AddPhase("DupeConk Loser Dupes", DupeConkLosers);

    
    // phase: dig up a Vigonian Crystal
    
    // find highest speed + str
    
    koalas.AddPhase("Remove DupeConk Statuses", RemoveDupeConkStatuses)
        
    //window.gameHandler.scenarioHandler.GotoNextPeriod();
    
    console.log(gh.scenarioHandler);
    
    GenericScenarioPrepWithAI();
    
    const testCharObj = charData[0];
}

function _LoadCollectionCards(){
    
    console.warn("player collections data should be housed on firebase so they can be retrieved if the player clears their cookies");
    
    const ghCCH = window.gameHandler.collectionCardHandler;
    
    for(const c of charData){
        
        const cString = JSON.stringify(c)
        
        const card = ghCCH.MakeCardFromJSON(cString);
        
        if(card.unlockedForPlayer == false) continue
        
        const card2 = ghCCH.MakeCardFromJSON(cString);
        
        card.owner = window.gameHandler.playerId;
        
        card2.owner = "AI";
        
    }
}