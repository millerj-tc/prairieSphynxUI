export class period
{
    constructor(periodName,periodType){
        
        this.periodType = periodType; //"scenario", "phase", "stage"
        this.periodActive = false;
        this.periodHandler;
    }
    
    LoadCards(){ //should this be decoupled?
        
        
    }
    
    BeginPeriod(){
        
        this.periodActive = true;
    }
    
    GetPeriodActive(){
        
        return this.periodActive;
    }
    
    PeriodDeactivateFlow(){
        
        if(!"CustomPeriodDeactivateFlow" in this) this.periodActive = false;
        else this.CustomPeriodDeactivateFlow();
    }
    
    EndPeriod(){
        
        
    }
    
    
}