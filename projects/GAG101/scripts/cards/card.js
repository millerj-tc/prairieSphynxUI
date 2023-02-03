export class card
{
    constructor(protoLevel){
        
        this.protoLevel = protoLevel; //values are "collection", "scenario", "phase", "stage"
    }
    
    GetParentAtProtoLevel(protoLevel){
        
        let parentProtoLevel = null;
        
        let checkObj = this;
        
        while(protoLevel != parentProtoLevel){ //keep moving up the prototype chain until you find the parent at the correct protoLevel level
            
            const parent = Object.getPrototypeOf(checkObj)
            
            parentProtoLevel = parent.protoLevel;
            
            checkObj = parent;
            
            if(parent.protoLevel == "master") return null
        }
    }
}