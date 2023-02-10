import {card} from "./card.js";


export class cardHandler
{
    constructor(){
        
        this.cards = [];
        this.cardCount = 0;
    }
    
    
    MakeCardFromJSON(jsonString){
        
        const c = new card(this.protoLevel);
        
        const jsonObj = JSON.parse(jsonString);
        
        const jsonObjKeys = Object.keys(jsonObj);
        
        for(let i = 0; i < jsonObjKeys.length; i++){
            
            const keyName = jsonObjKeys[i];
            
            const keyValue = jsonObj[keyName];
            
            c.AddProp(keyName,keyValue);
        }
        
        c.cardHandler = this;
                
        this.cards.push(c);
        
        return c
        
        
    }
    
    GetCards(){ //"true" not true because it is JSON-ified -- treat all prop values as strings
        
        return this.cards
    }
    
    EmptyCards(){
        
        this.cards = [];
    }
}