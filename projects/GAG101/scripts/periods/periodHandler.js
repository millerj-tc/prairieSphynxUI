import {period} from "./period.js";

export class periodHandler
{
    constructor(periodType){
        
        this.periodType = periodType;
        this.linear = true; //does the period progress in a strictly linear fashion?
        this.periods = [];
        this.superPeriodHandler = null; //the period above this period in the chain
        this.currentActivePeriod;
        this.previousActivePeriod;
        this.nextActivePeriodInd;
        this.lastCreatedPeriod;
    }
    
//    AddSubPeriodToPeriodHandler(periodType){
//        
//        const sph = new periodHandler(periodType);
//        
//        sph.superPeriodHandler = this;
//        
//        this.subPeriodHandlers.push(sph);
//        
//        this.lastCreatedSubPeriod = sph;
//    }
    
    AddPeriod(periodName){
        
        const p = new period(periodName,this.periodType);
        
        this.periods.push(p);
        
        this.lastCreatedPeriod = p;
        
        p.periodHandler = this;
    }
    
//    GetSubPeriodHandlerByPeriodType(periodType = null){
//        
//        if(periodType == null) return this.subPeriodHandlers[0];
//        
//        for(const sph of this.subPeriodHandlers){
//            
//            if(periodType = sph.periodType) return sph
//        }
//    }
    
    GetLastCreatedPeriod(){
        
        return this.lastCreatedPeriod;
    }

    GetCurrentActivePeriod(){
        
        return this.currentActivePeriod;
    }
    
    GetPreviousActivePeriod(){
        
        return this.previousActivePeriod;
    }
    
    GotoNextPeriod(){
        
        if(this.linear){
            
            if(this.GetCurrentActivePeriod() == null) this.nextActivePeriodInd = 0
            
            this.previousActivePeriod = this.currentActivePeriod;
            this.currentActivePeriod = this.periods[this.nextActivePeriodInd];
            this.nextActivePeriodInd++;
        }
    }
    
    GotoPeriodByName(name){
        
        for(const p of this.periods){
            
            if(p.periodName == name){
                
                this.previousActivePeriod = this.currentActivePeriod;
                this.currentActivePeriod = p;
            }
        }
    }
}