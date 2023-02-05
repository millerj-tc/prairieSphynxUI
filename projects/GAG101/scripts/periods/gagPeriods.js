import {periodHandler} from "./periodHandler.js";
import {cardHandler} from "./../cards/cardHandler.js";
import {period} from "./period.js";

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

export function AddGag101Scenario(scenarioName){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    scenarioHandler.AddPeriod(scenarioName); //should be a gagPeriodHandler
    
    scenarioHandler.GetLastCreatedPeriod().AddSubPeriodHandlerToPeriod("phase");
    
    scenarioHandler.GetLastCreatedPeriod().LoadCards = _DefaultScenarioLoadCardsFunction;
    
    return scenarioHandler.GetLastCreatedPeriod()
    
    // scenario needs a listener to update active cards based on player choices. It can cycle through scenario cards and compare image references with what is selected
    
    // scenario begin period can also have a function that can load in random/neutral/possible cards
    
    // also respond to player choices for other team for sim arena
    
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

function _DefaultScenarioLoadCardsFunction(){
    
    const activeCollectionCards = window.gameHandler.collectionCardHandler.GetCards("active");
    
    for(const c of activeCollectionCards){
        
        this.cardHandler.AddCard(c);
    }
}

function _DefaultPhaseStepLoadCardsFunction(){
    
    if(this.periodHandler.GetPreviousActivePeriod() == null) this._LoadActiveCardsFromParentPeriodHandler;
        
        else this._LoadActiveCardsFromPreviousPeriod;
    }
    
function _LoadCardArrIntoMyCardHandler(cardArr){

    for(const c of cardArr){

        const card = this.cardHandler.AddCard(c); //It's important to use AddCard() rather than just declaring cardHandler.cards = [arr] in order to get disposable copies
        
        card.Deactivate(); //cards must be deactivated as they are passed so that the next period can determine whether or not they need them
    }
}
    
function _LoadActiveCardsFromPreviousPeriod(){

    const activeCards = this.periodHandler.GetPreviousActivePeriod().cardHandler.GetCards("active");

    this._LoadCardArrIntoMyCardHandler(activeCards);
}

function _LoadActiveCardsFromParentPeriodHandler(){
    // use this for the first period in the sequence, inherits from the level above
    const activeCards = this.periodHandler.superPeriodHandler.cardHandler.GetCards("active");

    this._LoadCardArrIntoMyCardHandler(activeCards);
}