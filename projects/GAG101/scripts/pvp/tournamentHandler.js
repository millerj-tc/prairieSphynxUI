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

export class tournamentHandler{ //tournament is ended in scenarioMaintenance.js
    
    constructor(){
        
        this.matches = [];
        this.playerWins;
        
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
            
            if(match.otherPlayerId == otherPlayerId) return match
        }
    }
}