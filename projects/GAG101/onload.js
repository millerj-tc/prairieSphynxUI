import {AddGag101Scenario,AddGag101Phase, AddGag101Step, AddGag101StepRunFunction} from "./scripts/periods/periodDesignFunctions.js";
import {gameHandler} from "./scripts/gameHandler.js";
import {charData} from "./scripts/data/charData.js";
import {ScenarioFlow} from "./scripts/scenario/scenarioFlow/scenarioFlow.js";
import * as gagStepRunFunctions from "./scripts/periods/gagStepRunFunctions.js";

export function onload(){
    
    window.gameHandler = new gameHandler();
    
    const koalas = AddGag101Scenario("Time Koala Rescue");
    
    AddGag101Phase("Resolve Dupes");
    
    AddGag101Step("Get All Phase Cards");
    
    AddGag101StepRunFunction(gagStepRunFunctions.GetAndActivateAllPhaseCards);  
    
    AddGag101Step("Deactivate Duped Chars Who Lose Contest");
    
    AddGag101StepRunFunction(gagStepRunFunctions.DupeConkLosers);
    
    // assess dupe prefs: deactiveate losing dupes at phase & scenario level
    
    // dupe resolution output
    
    // phase: dig up a Vigonian Crystal
    
    // find highest speed + str
    
    _LoadCollectionCards();
    
    //window.gameHandler.scenarioHandler.GotoNextPeriod();
        
    koalas.PrepScenario();

}

function _LoadCollectionCards(){
    
    console.warn("player collections data should be housed on firebase so they can be retrieved if the player clears their cookies");
    
    const ghCCH = window.gameHandler.collectionCardHandler;
    
    for(const c of charData){
        
        const cString = JSON.stringify(c)
        
        const card = ghCCH.MakeCardFromJSON(cString);
        
        card.owner = window.gameHandler.playerId;
        
    }
}