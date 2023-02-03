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
    
    BeginPeriod(){
        
        super.BeginPeriod();
        
        if(this.periodHandler.GetPreviousActivePeriod() == null) this._LoadActiveCardsFromParentPeriodHandler;
        
        else this._LoadActiveCardsFromPreviousPeriod;
    }
    
    _LoadCardArrIntoMyCardHandler(cardArr){
        
        for(const c of cardArr){
            
            this.cardHandler.AddCard(c); //It's important to use AddCard() rather than just declaring cardHandler.cards = [arr] in order to get disposable copies
        }
    }
    
    _LoadActiveCardsFromPreviousPeriod(){
        
        const activeCards = this.periodHandler.GetPreviousActivePeriod().cardHandler.GetCards("active");
        
        this._LoadCardArrIntoMyCardHandler(activeCards);
    }
    
    _LoadActiveCardsFromParentPeriodHandler(){
        // use this for the first period in the sequence, inherits from the level above
        const activeCards = this.periodHandler.superPeriodHandler.cardHandler.GetCards("active");
        
        this._LoadCardArrIntoMyCardHandler(activeCards);
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
    
    AddSubPeriodToPeriodHandler(periodType){
        
        super.AddSubPeriodToPeriodHandler();
        
        this.subPeriodHandlers.pop();
        
        const sph = new gag101PeriodHandler(periodType);
        
        sph.superPeriodHandler = this;
        
        this.subPeriodHandlers.push(sph);
        
        this.lastCreatedSubPeriod = sph;
    }
}

export function AddGag101Scenario(scenarioName){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    scenarioHandler.AddPeriod(scenarioName); //should be a gagPeriodHandler
    
    scenarioHandler.GetLastCreatedPeriod().AddSubPeriodToPeriodHandler("phase");
    
    console.error("needs scenario.LoadCards -- does each period type need a ui handler as well?");
    
    // scenario needs a listener to update active cards based on player choices
    
    // scenario begin period can also have a function that can load in random/neutral/possible cards
    
    // also respond to player choices for other team for sim arena
    
}

export function AddGag101Phase(phaseName){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedSubPeriod();
    
    phaseHandler.AddPeriod(phaseName);
    
    phaseHandler.GetLastCreatedPeriod().AddSubPeriodToPeriodHandler("step");
}

export function AddGag101Step(stepName){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedSubPeriod();
    
    const stepHandler = phaseHandler.GetLastCreatedSubPeriod();
    
    stepHandler.AddPeriod(stepName);
    
}

export function AddGag101StepRunFunction(func){
    
    const phaseHandler = window.gameHandler.scenarioHandler.GetLastCreatedSubPeriod();
    
    const stepHandler = phaseHandler.GetLastCreatedSubPeriod();
    
    stepHandler.GetLastCreatedPeriod().Run = func;
}