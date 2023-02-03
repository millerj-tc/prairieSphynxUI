import {periodHandler} from "./periodHandler.js";
import {cardHandler} from "./../cards/cardHandler.js";

// const sph = new scenarioPeriodHandler;
// const tkr = sph.AddScenario("Time Koala Rescue");
// const ettm = tkr.AddPhase("Essay the Time Mountain");
// const ettmSH = ettm.stageHandler;
// ettmSH.AddStage("Get Highest Strength Character");
// ettmSH.SetStageEvalFunc("Get...", func);
// ettmSH.AddStage("Highest Strength Character Helps Lowest Strength Character");
// ettmSH.AddStage("Lowest Strength Character Says Thanks");


export class gagPeriodHandler extends periodHandler
{
    constructor(){
        
        super();
    }
    
    BeginPeriod(){
        
        super.BeginPeriod();
        
        this._LoadActiveCardsFromParentPeriodHandler();
        
    }
    
    _LoadActiveCardsFromParentPeriodHandler(){
        
        const activeCards = this.superPeriodHandler.cardHandler.GetCards("active");
        
        for(const c of activeCards){
            
            this.cardHandler.AddCard(c); //It's important to use AddCard() rather than just declaring cardHandler.cards = [arr] in order to get disposable copies
        }
    }
}

export class scenarioPeriodHandler extends gagPeriodHandler
{
    constructor(){
        
        super("scenario");
        
        this.cardHandler = new cardHandler("scenario");
        
        this.phaseHandler = periodHandler.AddSubPeriodToPeriodHandler("phase",this);
        
        this.phaseHandler.cardHandler = new cardHandler("phase");
        
        // I don't know if any of this is right. When I imagine myself coding actual stages won't I be adding phases manually? Might want to write some imaginary scenario design code in order to make sure the functions here make sense. Maybe model after how the card prototype chain works?
    }
}

export class phasePeriodHandler extends gagPeriodHandler
{
    constructor(){
        
        super("phase");
        
        console.log("hello");
        
        periodHandler.AddSubPeriodToPeriodHandler("step",this);
        
        this.cardHandler = new cardHandler("phase");
    }
}

export class stepPeriodHandler extends gagPeriodHandler
{
    constructor(){
        
        super("step");
        
        console.log("hello");
                
        this.cardHandler = new cardHandler("step");
    }
}