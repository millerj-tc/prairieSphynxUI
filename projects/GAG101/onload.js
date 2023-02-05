import {AddGag101Scenario} from "./scripts/periods/gagScenario.js";
import {gameHandler} from "./scripts/gameHandler.js";
import {charData} from "./scripts/data/charData.js";
import {ScenarioFlow} from "./scripts/scenario/scenarioFlow/scenarioFlow.js";
import {DisplayActiveCardsAsChoices} from "./scripts/scenario/scenarioFlow/scenarioFlowUtils.js";

export function onload(){
    
    window.gameHandler = new gameHandler();
    
    const koalas = AddGag101Scenario("Time Koala Rescue");
    
    _LoadCollectionCards();
    
    DisplayActiveCardsAsChoices(koalas);
    
    //ScenarioFlow(koalas);

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