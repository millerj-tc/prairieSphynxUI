import {periodHandler} from "./periodHandler.js";
import {gagCardHandler} from "./../cards/gagCards.js";
import {period} from "./period.js";

// AddGag101Scenario("Time Koala Rescue"); //choose gameHandler.scenarioHandler
// AddGag101Phase("Essay the Time Mountain"); //target last created scenario
// AddGag101Step("Get Highest Strength Character") //target last created scenario


export class gag101Period extends period
{
    constructor(periodName,periodType){
        
        super(periodName,periodType);
        
        this.cardHandler = new gagCardHandler(periodType);
    }
    
    AddSubPeriodHandlerToPeriod(periodType){
        
        super.AddSubPeriodHandlerToPeriod();
        
        this.subPeriodHandlers.pop();
        
        const sph = new gag101PeriodHandler(periodType);
        
        sph.superPeriod = this;
        
        this.subPeriodHandlers.push(sph);
        
        this.lastCreatedSubPeriod = sph;
    }
    
    LoadCards(){
        
        // set by Add functions in periodDesignFunctions
    }
    
    BeginPeriod(){
        
        super.BeginPeriod();
        
    }
    
    EndPeriod(){
        
        super.EndPeriod();
        
        for(const c of this.cardHandler.GetCards()){
            
            for(const s of c.immuneSys.statusFxs){
                
                s.CureIfDurationEquals(this.periodType);
            }
        }
    }
        
}

export class gag101PeriodHandler extends periodHandler
{
    constructor(periodType){
        
        super(periodType);
        
        this.cardHandler = new gagCardHandler(periodType)
    }
    
    AddPeriod(periodName){
        
        super.AddPeriod();
        
        this.periods.pop();
        
        const p = new gag101Period(periodName,this.periodType);
        
        this.periods.push(p);
        
        this.lastCreatedPeriod = p;
        
        p.periodHandler = this;
        
        if(this.superPeriod != null) this.otherPlayerId = this.superPeriod.otherPlayerId;
        
        return p
        
    }
}