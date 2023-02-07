import {card} from "./card.js";

class archiveEffect
{
    constructor(name){
        
        this.name = name;
        
    }
}

export class cardHandler
{
    constructor(){
        
        this.cards = [];
        this.cardsArchive = [];
        this.cardCount = 0;
    }
    
    ModifyCard(){
        
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
        
        c.cardHandler = this;
        
        c.uniqueCardId
        
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