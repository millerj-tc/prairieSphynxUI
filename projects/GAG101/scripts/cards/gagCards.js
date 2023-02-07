import {card} from "./card.js";
import {cardHandler} from "./cardHandler.js";
import {immuneSys} from "./immuneSys.js";

export class gagCard extends card
{
    constructor(protoLevel){
        
        super(protoLevel);
        
        this.immuneSys = new immuneSys(this);
    }
}

export class gagCardHandler extends cardHandler
{
    constructor(protoLevel){
        
        super(protoLevel);
    }
    
    AddCard(card){
        
        super.AddCard(card);
        
        this.cards.pop();
        
        const c = Object.create(card);
        
        c.protoLevel = this.protoLevel;
        
        this.cards.push(c);
        
        return c
    }
    
    MakeCardFromJSON(jsonString){
        
        const c = new gagCard(this.protoLevel);
        
        const jsonObj = JSON.parse(jsonString);
        
        const jsonObjKeys = Object.keys(jsonObj);
        
        for(let i = 0; i < jsonObjKeys.length; i++){
            
            const keyName = jsonObjKeys[i];
            
            const keyValue = jsonObj[keyName];
            
            c.SetProp(keyName,keyValue);
        }
        
        this.cards.push(c);
        
        return c
        
        
    }
    
}   
