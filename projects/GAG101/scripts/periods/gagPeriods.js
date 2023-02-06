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
        
        return p
        
    }
}