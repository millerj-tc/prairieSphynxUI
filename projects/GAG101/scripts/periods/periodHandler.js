export class periodHandler
{
    constructor(periodName){
        
        this.periodName = periodName;
        this.linear = true;
        this.periods = [];
        this.currentPeriodInd;
        this.previousPeriodInd;
        this.nextPeriodInd;
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