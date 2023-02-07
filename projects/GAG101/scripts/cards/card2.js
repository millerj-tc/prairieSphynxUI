    export class card
{
    constructor(protoLevel){
        
        this.protoLevel = protoLevel; //values are "master"(highest), "collection", "scenario", "phase", "stage"
        this.cardHandler;
        this.readyToModify = "false"; //usable in the game
    }
    
    GetParentAtProtoLevel(protoLevel){
        
        let parentProtoLevel = null;
        
        let parent = null;
        
        let checkObj = this;
        
        while(protoLevel != parentProtoLevel){ //keep moving up the prototype chain until you find the parent at the correct protoLevel level
            
            parent = Object.getPrototypeOf(checkObj)
            
            parentProtoLevel = parent.protoLevel;
            
            checkObj = parent;
            
            if(parent.protoLevel == "master") return null
        }
        
        return parent
    }
    
    CreateCopyToModify(){
        
        const mc = new card();
        
        this.cardHandler
    }
    
    SetProp(prop,value){
        
        this[prop] = value;
    }
}