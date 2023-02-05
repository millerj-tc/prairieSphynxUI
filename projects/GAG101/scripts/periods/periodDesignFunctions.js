export function AddGag101Scenario(scenarioName){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    scenarioHandler.AddPeriod(scenarioName); //should be a gagPeriodHandler
    
    const scenario =  scenarioHandler.GetLastCreatedPeriod();
    
    scenario.AddSubPeriodHandlerToPeriod("phase");
    
    return scenarioHandler.GetLastCreatedPeriod()
    
}

export function AddGag101Phase(phaseName){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedPeriod().GetSubPeriodHandlerByPeriodType("phase");
    
    phaseHandler.AddPeriod(phaseName);
    
    phaseHandler.GetLastCreatedPeriod().AddSubPeriodHandlerToPeriod("step");
    
    phaseHandler.GetLastCreatedPeriod().LoadCards = _DefaultPhaseStepLoadCardsFunction;
    
    return phaseHandler.GetLastCreatedPeriod()
}

export function AddGag101Step(stepName){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedPeriod().GetSubPeriodHandlerByPeriodType("phase");
    
    const stepHandler = phaseHandler.GetSubPeriodHandlerByPeriodType("step");
    
    stepHandler.GetLastCreatedPeriod().LoadCards = _DefaultPhaseStepLoadCardsFunction;
    
    stepHandler.AddPeriod(stepName);
    
    return stepHandler.GetLastCreatedPeriod()
    
}

export function AddGag101StepRunFunction(func){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedPeriod().GetSubPeriodHandlerByPeriodType("phase");
    
    const stepHandler = phaseHandler.GetSubPeriodHandlerByPeriodType("step");
    
    stepHandler.GetLastCreatedPeriod().Run = func;
}



function _DefaultPhaseStepLoadCardsFunction(){
    
    let cardArr;
    
    if(this.periodHandler.GetPreviousActivePeriod() == null) cardArr = this._GetActiveCardsFromParentPeriodHandler;
        
    else cardArr = this._GetActiveCardsFromPreviousPeriod;
    
    LoadCardArrIntoObjCardHandler(cardArr,this);
}
    
function _GetActiveCardsFromPreviousPeriod(){

    return this.periodHandler.GetPreviousActivePeriod().cardHandler.GetCards("active");
}

function _GetActiveCardsFromParentPeriodHandler(){
    // use this for the first period in the sequence, inherits from the level above
    return this.periodHandler.superPeriodHandler.cardHandler.GetCards("active");
}