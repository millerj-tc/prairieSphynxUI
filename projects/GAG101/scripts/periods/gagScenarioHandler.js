import {gag101PeriodHandler} from "./gagPeriods.js";
import {gag101Scenario} from "./gagScenario.js";

export class gag101ScenarioHandler extends gag101PeriodHandler
{
    constructor(periodType){
        
        super(periodType);
    }
    
    AddPeriod(periodName){
        
        super.AddPeriod();
        
        this.periods.pop();
        
        const p = new gag101Scenario(periodName,this.periodType);
        
        this.periods.push(p);
        
        this.lastCreatedPeriod = p;
        
        p.periodHandler = this;
        
    }
}