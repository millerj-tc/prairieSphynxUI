import {periodHandler} from "./periodHandler.js";
import {cardHandler} from "./../cards/cardHandler.js";
import {period} from "./period.js";
import {LoadCardArrIntoObjCardHandler} from "../cards/gagCardUtils.js";

// AddGag101Scenario("Time Koala Rescue"); //choose gameHandler.scenarioHandler
// AddGag101Phase("Essay the Time Mountain"); //target last created scenario
// AddGag101Step("Get Highest Strength Character") //target last created scenario


export class gag101Period extends period
{
    constructor(periodName,periodType){
        
        super(periodName,periodType);
        
        this.cardHandler = new cardHandler(periodType);
    }
    
    AddSubPeriodHandlerToPeriod(periodType){
        
        super.AddSubPeriodHandlerToPeriod();
        
        this.subPeriodHandlers.pop();
        
        const sph = new gag101PeriodHandler(periodType);
        
        sph.superPeriodHandler = this;
        
        this.subPeriodHandlers.push(sph);
        
        this.lastCreatedSubPeriod = sph;
    }
    
    LoadCards(){
        
        // set by Add functions below
    }
    
    BeginPeriod(){
        
        super.BeginPeriod();
        
    }
        
}

export class gag101PeriodHandler extends periodHandler
{
    constructor(periodType){
        
        super(periodType);
        
        this.cardHandler = new cardHandler(periodType)
    }
    
    AddPeriod(periodName){
        
        super.AddPeriod();
        
        this.periods.pop();
        
        const p = new gag101Period(periodName,this.periodType);
        
        this.periods.push(p);
        
        this.lastCreatedPeriod = p;
        
        p.periodHandler = this;
        
    }
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