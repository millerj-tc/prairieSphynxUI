import {card} from "./card.js";

export class cardHandler
{
    constructor(protoLevel){
        
        this.protoLevel = protoLevel; //"master",collection", "scenario", "phase", "stage"
        this.cards = [];
    }
    
    AddCard(card){
        
        const c = Object.create(card);
        
        c.protoLevel = this.protoLevel;
        
        this.cards.push(c);
        
        return c
    }
    
    MakeCardFromJSON(jsonString){
        
        const c = new card(this.protoLevel);
        
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
    
    GetCards(active = ""){ //"true" not true because it is JSON-ified -- treat all prop values as strings
        
        let returnArr = [];
        
        if(active == "active"){
            
            for(const c of this.cards){
                
                if(c.active == "true"){
                    
                    returnArr.push(c);
                }
            }
            
            return returnArr
        }
        
        return this.cards
    }
    
    EmptyCards(){
        
        this.cards = [];
    }
}