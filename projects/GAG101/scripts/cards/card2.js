export class card
{
    constructor(protoLevel){
        
        this.protoLevel = protoLevel; //values are "master"(highest), "collection", "scenario", "phase", "stage"
        this.cardHandler;
        this.cardProps = [];
        this.selectedForTeam = "false";

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
        
        const p = new cardProp(key,value,"initial");
        
        this.cardProps.push(p);
    }
    
    GetProp(prop){
        
        for(const p of this.cardProps){
            
            if(p.key == prop) {
                return p.values.slice(-1)[0].value;
            }
            
        }
    }
    
    SetProp(key,value,phaseName){
        
        let match = false;
        
        for(const p of this.cardProps){
            
            if(p.key == key) {
                p.ChangeValueTo(value,phaseName);
                match = true;
            }
        }
        
        if(!match) this.AddProp(key,value);
    }
}
    
class cardProp
{
    constructor(key,value,phaseName){
        
        this.key = key;
        const initialValue = new cardPropValue(value,phaseName);
        this.values = [initialValue];
    }
    
    ChangeValueTo(value,phaseName){
        
        const cpv = new cardPropValue(value,phaseName);
        
        this.values.push(cpv);
    }
}

class cardPropValue //for values that fall off, decrement a prop whose key is the status effect, then if the value is 0, reverse the operation (hard code at the step where it falls off)
{
    constructor(value,phaseName){
        
        this.value = value;
        this.phaseName = phaseName;
        this.changeTime = Date.now();
    }
}

