import {card} from "./card2.js";


export class cardHandler
{
    constructor(){
        
        this.cards = [];
        this.cardCount = 0;
    }
    
    
    MakeCardFromJSON(jsonString,owner){
        
        const c = new card(this.protoLevel);
        
        const jsonObj = JSON.parse(jsonString);
        
        const jsonObjKeys = Object.keys(jsonObj);
        
        for(let i = 0; i < jsonObjKeys.length; i++){
            
            const keyName = jsonObjKeys[i];
            
            const keyValue = jsonObj[keyName];
            
            if(keyName == "power" || keyName == "toughness" || keyName == "speed" || keyName == "cunning" || keyName == "charisma" || keyName == "cume"){
                
                
                console.log(typeof keyValue);
                console.log(keyValue);
            
                c.AddProp(keyName,keyValue);
            }
            else{
                
                c[keyName] = keyValue;
            }
        }
        
        c.owner = owner;
        
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