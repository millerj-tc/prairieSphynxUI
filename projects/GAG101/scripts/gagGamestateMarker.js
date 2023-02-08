export class gagGamestateMarker
{
    constructor(runId,funcName){
        
        this.runId = runId;
        this.funcName = funcName;
        this.time = Date.now();
    }
    
    static GetObjFromArrByGamestateFuncName(arr,funcName){
        
        for(const o of arr){
            
            if(o.hasOwnProperty("gamestateMarker") && o.gamestateMarker.funcName == funcName) return o
        }
        
        //>>> does below work?
        
//        for(const prop in o){
//            
//            if(prop.isPrototypeOf("gagGamestateMarker"))
//        }
    }
}