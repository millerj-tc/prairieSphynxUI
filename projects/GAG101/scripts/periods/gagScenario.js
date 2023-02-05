import {LoadCardArrIntoObjCardHandler} from "../cards/gagCardUtils.js";

export function AddGag101Scenario(scenarioName){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    scenarioHandler.AddPeriod(scenarioName); //should be a gagPeriodHandler
    
    const scenario =  scenarioHandler.GetLastCreatedPeriod();
    
    scenario.AddSubPeriodHandlerToPeriod("phase");
    
    scenario.LoadCards = _DefaultScenarioLoadCardsFunction;
    
    scenario.playerCardSlots = 5;
    
    return scenarioHandler.GetLastCreatedPeriod()
    
    // scenario needs a listener to update active cards based on player choices. It can cycle through scenario cards and compare image references with what is selected
    
    // scenario begin period can also have a function that can load in random/neutral/possible cards
    
    // also respond to player choices for other team for sim arena
    
}

function _DefaultScenarioLoadCardsFunction(){
    
    const activeCollectionCards = window.gameHandler.collectionCardHandler.GetCards("active");
    
    LoadCardArrIntoObjCardHandler(activeCollectionCards,this);
}

function _RandomizePlayerCardChoices(){
    
    
}