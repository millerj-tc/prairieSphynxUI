import {period} from "./period.js";

export class periodHandler
{
    constructor(periodType){
        
        this.periodType = periodType;
        this.linear = true; //does the period progress in a strictly linear fashion?
        this.periods = [];
        this.superPeriod = null; //the period above this period in the chain
        this.currentActivePeriod;
        this.previousActivePeriod;
        this.nextActivePeriodInd;
        this.lastCreatedPeriod;
    }
    
    ResetAllPeriods(){ // you need to call this if you are going to run through the periods again "fresh"
        
        this.currentActivePeriod = null;
        this.previousActivePeriod = null;
        this.nextActivePeriodInd = null;
        
        for(const p of this.periods){
            
            period.active = false;
        }
    }
    
    AddPeriod(periodName){
        
        const p = new period(periodName,this.periodType);
        
        this.periods.push(p);
        
        this.lastCreatedPeriod = p;
        
        p.periodHandler = this;
        
        return p
    }
    
    GetLastCreatedPeriod(){
        
        return this.lastCreatedPeriod;
    }

    GetCurrentActivePeriod(){
        
        return this.currentActivePeriod;
    }
    
    GetPreviousActivePeriod(){
        
        return this.previousActivePeriod;
    }
    
    ActivateNextPeriod(){
        
        if(this.linear){
            
            if(this.GetCurrentActivePeriod() == null) this.nextActivePeriodInd = 0
            
            this.previousActivePeriod = this.currentActivePeriod;
            this.currentActivePeriod = this.periods[this.nextActivePeriodInd];
            this.nextActivePeriodInd++;
        }
        
        if(this.currentActivePeriod != null) return true
        return false
    }
    
    ActivatePeriodByName(name){
        
        for(const p of this.periods){
            
            if(p.periodName == name){
                
                this.previousActivePeriod = this.currentActivePeriod;
                this.currentActivePeriod = p;
            }
        }
    }
}