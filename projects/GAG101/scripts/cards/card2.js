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
        }
    }
}
    
class cardProp
{
    constructor(key,value,phaseId){
        
        this.key = key;
        this.values = [value];
        this.phaseId = phaseId; //when did this prop change?
        this.changeTime = Date.now();
    }
    
    ChangeValueTo(value){
        
        this.values.push(value);
    }
}

