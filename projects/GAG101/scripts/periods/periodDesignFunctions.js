import {LoadCardArrIntoObjCardHandler} from "../cards/gagCardUtils.js";

export function AddGag101Scenario(scenarioName){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    scenarioHandler.AddPeriod(scenarioName); //should be a gagPeriodHandler
    
    const scenario =  scenarioHandler.GetLastCreatedPeriod();
    
    scenario.AddSubPeriodHandlerToPeriod("phase");
    
    return scenarioHandler.GetLastCreatedPeriod()
    
}

export function AddGag101Phase(phaseName){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedPeriod().GetSubPeriodHandlerByPeriodType("phase");
    
    const phase = phaseHandler.AddPeriod(phaseName);
    
    phase.AddSubPeriodHandlerToPeriod("step");
    
    phase.LoadCards = _DefaultPhaseStepLoadCardsFunction;
    
    return phase
}

export function AddGag101Step(stepName){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedPeriod().GetSubPeriodHandlerByPeriodType("phase");
    
    const stepHandler = phaseHandler.GetLastCreatedPeriod().GetSubPeriodHandlerByPeriodType("step");
    
    stepHandler.AddPeriod(stepName);
    
    stepHandler.GetLastCreatedPeriod().LoadCards = _DefaultPhaseStepLoadCardsFunction;
    
    return stepHandler.GetLastCreatedPeriod()
    
}

export function AddGag101StepRunFunction(func){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedPeriod().GetSubPeriodHandlerByPeriodType("phase");
    
    const stepHandler = phaseHandler.GetLastCreatedPeriod().GetSubPeriodHandlerByPeriodType("step");
    
    stepHandler.GetLastCreatedPeriod().Run = func;
}



function _DefaultPhaseStepLoadCardsFunction(){
    
    let cardArr;
    
    if(this.periodHandler.GetPreviousActivePeriod() == null) cardArr = _GetActiveCardsFromParentPeriodHandler(this);
        
    else cardArr = _GetActiveCardsFromPreviousPeriod(this);
    
    LoadCardArrIntoObjCardHandler(cardArr,this);
}
    
function _GetActiveCardsFromPreviousPeriod(period){

    return period.periodHandler.GetPreviousActivePeriod().cardHandler.GetCards("active");
}

function _GetActiveCardsFromParentPeriodHandler(period){
    // use this for the first period in the sequence, inherits from the level above
    return period.periodHandler.superPeriod.cardHandler.GetCards("active");
}