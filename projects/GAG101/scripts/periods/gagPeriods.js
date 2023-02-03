import {periodHandler} from "./periodHandler.js";

export class scenarioPeriodHandler extends periodHandler
{
    constructor(){
        
        super("scenario");
        
        periodHandler.AddSubPeriodToPeriodHandler("phase",this);
    }
}

export class phasePeriodHandler extends periodHandler
{
    constructor(){
        
        super("phase");
        
        periodHandler.AddSubPeriodToPeriodHandler("step",this);
    }
}