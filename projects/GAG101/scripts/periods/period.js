import {periodHandler} from "./periodHandler.js";

export class period
{
    constructor(periodName,periodType){
        
        this.periodName = periodName;
        this.periodType = periodType; //"scenario", "phase", "stage"
        this.periodActive = false;
        this.periodHandler;
        this.subPeriodHandlers = [];
        this.lastCreatedSubPeriod = null;
    }
    
     AddSubPeriodHandlerToPeriod(periodType){
        
        const sph = new periodHandler(periodType);
        
        sph.superPeriod = this;
        
        this.subPeriodHandlers.push(sph);
        
        this.lastCreatedSubPeriod = sph;
    }
    
     GetSubPeriodHandlerByPeriodType(periodType = null){
        
        if(periodType == null) return this.subPeriodHandlers[0];
        
        for(const sph of this.subPeriodHandlers){
            
            if(periodType == sph.periodType) return sph
        }
    }
    
    GetSuperPeriodByType(typ){
        
        let foundType;
        
        let basePeriod = this; //the obj the search is started from
        
        while(typ != foundType){
            
            let checkPeriod = basePeriod.periodHandler.superPeriod;
            
            foundType = checkPeriod.periodType;
            
            if(checkPeriod == null) return null
            
            if(checkPeriod.periodType == typ) return checkPeriod
            
            basePeriod = checkPeriod;
        }
    }
    
    GetLastCreatedSubPeriodHandler(){
        
        return this.lastCreatedSubPeriod;
    }
    
    BeginPeriod(){
        
        this.periodActive = true;
    }
    
    GetPeriodActive(){
        
        return this.periodActive;
    }
    
    PeriodDeactivateFlow(){
        
        if("CustomPeriodDeactivateFlow" in this === false){
            if(this.GetSubPeriodHandlerByPeriodType() == null || !this.GetSubPeriodHandlerByPeriodType().ActivateNextPeriod()) this.periodActive = false
        }
        else this.CustomPeriodDeactivateFlow();
    }
    
    EndPeriod(){
        
    }
    
    
}