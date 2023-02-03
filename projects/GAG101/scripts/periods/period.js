export class period
{
    constructor(periodName){
        
        this.periodName = periodName; //"scenario", "phase", "stage"
        this.periodActive = false;
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