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
    
    GetCards(owner){
        
        let returnArr = [];
        
        if(owner == null) returnArr = this.cards
        else returnArr = this.cards.filter(c => c.owner == owner);
        
        return returnArr
    }
    
    GetCardByName(name,owner = "any",unlockedForPlayer = true){
        
        for(const c of this.cards){
            
            if(c.owner != owner && owner != "any") continue
  
            if(!c.unlockedForPlayer && unlockedForPlayer) continue
            
            if(c.name == name) return c
        }
    }
    
    EmptyCards(owner){
        
        if(owner == null) this.cards = [];
        else this.cards = this.cards.filter(c => c.owner != owner);
    }
}