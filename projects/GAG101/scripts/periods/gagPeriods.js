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
}

export function AddGag101Scenario(scenarioName){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    scenarioHandler.AddPeriod(scenarioName); //should be a gagPeriodHandler
    
    scenarioHandler.GetLastCreatedPeriod().AddSubPeriodToPeriodHandler("phase");
    
    
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



//export class scenarioHandler extends gagPeriodHandler
//{
//    constructor(){
//        
//        super("scenario");
//        
//        this.cardHandler = new cardHandler("scenario");
//        
//        this.phaseHandler = periodHandler.AddSubPeriodToPeriodHandler("phase",this);
//        
//        this.phaseHandler.cardHandler = new cardHandler("phase");
//        
//        // I don't know if any of this is right. When I imagine myself coding actual stages won't I be adding phases manually? Might want to write some imaginary scenario design code in order to make sure the functions here make sense. Maybe model after how the card prototype chain works?
//    }
//}
//
//export class phaseHandler extends gagPeriodHandler
//{
//    constructor(){
//        
//        super("phase");
//        
//        console.log("hello");
//        
//        periodHandler.AddSubPeriodToPeriodHandler("step",this);
//        
//        this.cardHandler = new cardHandler("phase");
//    }
//}
//
//export class stepHandler extends gagPeriodHandler
//{
//    constructor(){
//        
//        super("step");
//        
//        console.log("hello");
//                
//        this.cardHandler = new cardHandler("step");
//    }
//}