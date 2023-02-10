import class {cardFxHandler} from "./cardFxHandler.js";

export class card
{
    constructor(protoLevel){
        
        this.protoLevel = protoLevel; //values are "master"(highest), "collection", "scenario", "phase", "stage"
        this.cardHandler;
        this.cardFxHandler = new cardFxHandler(this);
        this.cardProps = [];

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
    
    AddProp(key,value){
        
        const p = new cardProp(key,value,id="initial");
        
        this.cardProps.push(p);
    }
    
    GetProp(prop){
        
        for(const p of this.props){
            
            if(p.key == prop) return p.values.slice(-1);
            
            
            console.error("still not sure how to do modifications that wear off -- what about stacking, etc.? How do you know which to remove first?");
        }
    }
}
    
class cardProp
{
    constructor(key,value,phaseId){
        
        this.key = key;
        const initialValue = new cardPropValue(value,phaseId);
        this.values = [initialValue];
    }
    
    ChangeValueTo(value,phaseId){
        
        const cpv = new cardPropValue(value,phaseId);
        
        this.values.push(cpv);
        
        console.error("call a gag function that adds the scenario id/run data to this as a prop")
    }
}

class cardPropValue
{
    constructor(value,phaseId){
        
        this.value = value;
        this.phaseId = phaseId;
        this.changeTime = Date.now();
    }
}

