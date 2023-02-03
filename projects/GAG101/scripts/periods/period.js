export class period
{
    constructor(periodName){
        
        this.periodName = periodName; //"scenario", "phase", "stage"
        this.periodActive = false;
        this.linear = true;
    }
    
    LoadCards(){ //should this be decoupled?
        
        
    }
    
    BeginPeriod(){
        
        this.periodActive = true;
    }
    
    IsPeriodOver(){
        
        
    }
    
    EndPeriod(){
        
        
    }
    
    
}