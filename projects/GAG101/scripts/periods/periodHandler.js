import {period} from "./period.js";

export class periodHandler
{
    constructor(periodName){
        
        this.periodName = periodName;
        this.linear = true;
        this.periods = [];
        this.subPeriodHandlers = [];
        this.currentPeriodInd;
        this.previousPeriodInd;
        this.nextPeriodInd;
    }
    
    static AddSubPeriodToPeriodHandler(periodName,periodHandler){
        
        const sph = new periodHandler(periodName);
        
        periodHandler.subPeriodHandlers.push(sph);
    }
    
    AddPeriod(){
        
        const p = new period(this.periodName);
        
        this.periods.push(p);
    }
    
    GetSubPeriodHandlerByPeriodName(periodName = null){
        
        if(periodName == null) return this.subPeriodHandlers[0];
        
        for(const sph of this.subPeriodHandlers){
            
            if(periodName = sph.periodName) return sph
        }
    }

    GetCurrentPeriod(){
        
        return this.periods[this.currentPeriodInd];
    }
    
    GotoNextPeriod(){
        
        if(this.linear){
            
            if(this.GetCurrentPeriod() == null) this.nextPeriodInd = 0
            
            this.previousPeriodInd = this.currentPeriodInd;
            this.currentPeriodInd = this.nextPeriodInd;
            this.nextPeriodInd++;
        }
    }
}