class match
{
    constructor(cards,otherPlayerId,otherPlayerUsername){
        
        this.serverCards = cards;
        this.serverCardsWinrate;
        this.otherPlayerUsername = otherPlayerUsername;
        this.otherPlayerId = otherPlayerId;
        this.winner; //"server" or "player"
    }
    
    SetServerCardsWinrate(winrate){
        
        this.serverCardsWinrate = winrate;
    }
}

class contender
{
    constructor(cardsAsJSON,playerId,playerUsername){
        
        this.cardsAsJSON = cardsAsJSON;
        this.getCardsFromCollectionCardHandler = false;
        this.playerUsername = playerUsername;
        this.playerId = playerId;
        this.wins;
        this.ties;
        this.defeats;
        this.matches;
    }
}

export class tournamentHandler{ //tournament is ended in scenarioMaintenance.js
    
    constructor(){
        
        this.matches = [];
        this.contenders = [];
        
    }
    
    AddContender(cardsAsJSON,playerId,playerUsername){
        
        const c = new contender(cardsAsJSON,playerId,playerUsername);
        
        if(cardsAsJSON == false) c.getCardsFromCollectionCardHandler = true; //if you don't pass this JSON cards, it will get the cards from collection Card Handler by userid instead
        
        this.contenders.push(c);
        
        return c
        
    }
    
    AddMatch(cards,otherPlayerId,otherPlayerUsername){
        
        const m = new match(cards,otherPlayerId,otherPlayerUsername);
        
        this.matches.push(m);
        
        return m
    }
    
    EmptyMatches(){
        
        this.matches = [];
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