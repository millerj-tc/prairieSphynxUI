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
    
    
    // assess dupe prefs: deactiveate losing dupes at phase & scenario level
    
    // dupe resolution output
    
    // phase: dig up a Vigonian Crystal
    
    // find highest speed + str
    
    koalas.AddPhase("Remove DupeConk Statuses", RemoveDupeConkStatuses)
        
    //window.gameHandler.scenarioHandler.GotoNextPeriod();
    
    console.log(gh.scenarioHandler);
    
    GenericScenarioPrepWithAI();
    
    const testCharObj = charData[0];
    
    console.log(uiPhaseUtils.OutputTextDivWithNounImages(`[argN[Yetelu]]: Welcome [arg0[]] to the Dance of Riddles, [arg1[]], [arg2[]] arg 0 [p0[are]] [s0[an individual/a group]] and [p0[their]] pronoun is this, arg 1 [p1[are]] [s1[an individual/a group]] and [p1[their]] pronoun is this [s1[singular/plural]] arg 2 [p2[are]] [s2[an individual/a group]] and [p2[their]] pronoun is this`,[testCharObj],[charData[1]],[charData[2],charData[3]]));

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