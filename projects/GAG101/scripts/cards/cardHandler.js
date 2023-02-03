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
    }
    
    LoadCards(){
        
        //return this.cards;
    }
    
    GetCards(active = ""){
        
        let returnArr = [];
        
        if(active == "active"){
            
            for(const c of this.cards){
                
                if(c.active){
                    
                    returnArr.push(c);
                }
            }
            
            return returnArr
        }
        
        return this.cards
    }
}