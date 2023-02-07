import class {cardFxHandler} from "./cardFxHandler.js";

export class card
{
    constructor(protoLevel){
        
        this.protoLevel = protoLevel; //values are "master"(highest), "collection", "scenario", "phase", "stage"
        this.cardHandler;
        this.cardFxHandler = new cardFxHandler(this);

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
    
    GetProp(prop){
        
        for(const fx of this.cardFxHandler.cardFxs){
            
            if(fx.type == prop) return fx.special;
        }
        
        console.error("how would this handle stacking effects?");
        
        return this[prop] 
    }
}

