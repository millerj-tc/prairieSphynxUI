import {cardFxHandler} from "./cardFxHandler.js";

export class gagCardFxHandler extends cardFxHandler
{
    constructor(cardOwner){
        
        super();
    }
    
    
}

class gagGameStateMarker
{
    constructor(runId,func){
        
        this.runId = runId;
        this.func = func;
    }
}