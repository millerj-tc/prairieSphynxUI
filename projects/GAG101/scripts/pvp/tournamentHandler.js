class contender
{
    constructor(cardsAsJSON,playerId,playerUsername){
        
        this.cardsAsJSON = cardsAsJSON;
        this.getCardsFromCollectionCardHandler = false;
        this.playerUsername = playerUsername;
        this.playerId = playerId;
        this.wins = 0;
        this.ties = 0;
        this.defeats = 0;
        this.matches = 0;
        this.defeatedByPlayer = false;
        this.defeatedPlayer = false;
        this.tiedPlayer = false;
    }
}

export class tournamentHandler{ //tournament is ended in scenarioMaintenance.js
    
    constructor(){
        
        this.contenders = [];
        
    }
    
    AddContender(cardsAsJSON,playerId,playerUsername){
        
        const c = new contender(cardsAsJSON,playerId,playerUsername);
        
        if(cardsAsJSON == false) c.getCardsFromCollectionCardHandler = true; //if you don't pass this JSON cards, it will get the cards from collection Card Handler by userid instead
        
        this.contenders.push(c);
        
        return c
        
    }
    
    EmptyContenders(){
        
        this.contenders = [];
    }
    
    GetMatchByOtherPlayerId(id){
        
        for(const match of this.matches){
            
            if(match.otherPlayerId == id) return match
        }
    }
    
    GetContenderByUserId(id){
        
        for(const contender of this.contenders){
            
            if(contender.otherPlayerId == id) return contender
        }
    }
}