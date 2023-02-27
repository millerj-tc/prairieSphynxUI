import {WatchOfSilencePrep} from "../scenario/scenarios/watchOfSilence.js";
import {charData} from "../data/charData.js";
import {GenerateCombinations} from "/utils/mathAndLogicUtils/miscUtils.js";
import {SetCardForContenderSlot} from "../scenario/scenarioFlow/genericScenarioPrep.js";
import * as cardInfoPhaseUtils from "../scenario/scenarioPhases/cardInfoPhaseUtils.js";

class contender
{
    constructor(cardsAsJSON,playerId,playerUsername,timeStamp){
        
        this.cardsAsJSON = cardsAsJSON;
        this.getCardsFromCollectionCardHandler = false;
        this.playerUsername = playerUsername;
        this.playerId = playerId;
        this.timeStamp = timeStamp;
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
        
        this.tournamentAnalysisMode = false
        
    }
    
    AddContender(cardsAsJSON,playerId,playerUsername,timeStamp){
        
        const c = new contender(cardsAsJSON,playerId,playerUsername,timeStamp);
        
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
            
            if(contender.playerId == id) return contender
        }
    }
    
    SortContendersByWinscore(){
        
        for(const contender of this.contenders){
            
            contender.ws =  ((2*contender.wins) + contender.ties - (2*contender.defeats))/contender.matches;
            
        }
        
        this.contenders = this.contenders.sort(SortWinscoreThenDate); //lowest winscores first
    }
    
    LogTeams(){
        
        if(!this.tournamentAnalysisMode) return
        
        const cardHandler = window.gameHandler.collectionCardHandler;
        
        const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
        
        const rp = scenario.GetCurrentRunProcessor();
        
        console.log(rp);
        
        const contender0 = rp.contenders[0];
        
        const contender1 = rp.contenders[1];
        
        console.log(`Contender 0: ${contender0.playerUsername}:`);
        
        console.log(cardInfoPhaseUtils.GetSelectedCardsFor(contender0.playerId));
        
        console.log(`Contender 1: ${contender1.playerUsername}:`);
        
        console.log(cardInfoPhaseUtils.GetSelectedCardsFor(contender1.playerId));
    }
    
    RunAllLegalPermutations(scenarioName,mode){
        
        console.error("allow to set custom arr to draw combinations from (only cards unlocked for player at beginning of game, for instance)");
        
        console.error("aggregate scores at end -- use contenders wins/defeats/matches?");
        
        this.tournamentAnalysisMode = true;
        
        const gh = window.gameHandler;
        
        const scenarioHandler = gh.scenarioHandler;
        
        const scenario = scenarioHandler.GetScenarioByName(scenarioName);
    
        const cardHandler = gh.collectionCardHandler;
        
        for(const c of charData){
            
            cardHandler.MakeCardFromJSON(JSON.stringify(c),"tournamentCain");
            cardHandler.MakeCardFromJSON(JSON.stringify(c),"tournamentAbel");
        }
        
        //PrepFunc should be set in the scenario file itself (ie "danceOfRiddles.js","watchOfSilence.js", etc.)
        
        scenario.PrepFunc(mode);
        
        // contender card slots is set in the genericScenarioPrep.js where card slots are created
        
        const cainCardCombinations = GenerateCombinations(cardHandler.GetCards("tournamentCain"),scenario.contender0CardSlots);
        
        let abelCardCombinations = []
        
        if(mode == "pvp") abelCardCombinations = GenerateCombinations(cardHandler.GetCards("tournamentAbel"),scenario.contender1CardSlots);
        
        for(const comboOfCards of cainCardCombinations){
            
            //cardsAsJSON,playerId,playerUsername,timeStamp
            const cainContender = gh.tournamentHandler.AddContender(false,"tournamentCain","Cain");
            
            cainContender.getCardsFromCollectionCardHandler = true;
            
            for(let cardSlotIndex = 0; cardSlotIndex < scenario.contender0CardSlots; cardSlotIndex++){
                
                SetCardForContenderSlot(comboOfCards[cardSlotIndex],"tournamentCain",0,cardSlotIndex);
            }
            
            let abelContender = {};
            
            if(mode == "pvp"){
                
                for(const comboOfCards of abelCardCombinations){

                    abelContender = gh.tournamentHandler.AddContender(false,"tournamentAbel","Abel");

                    abelContender.getCardsFromCollectionCardHandler = true;

                    for(let cardSlotIndex = 0; cardSlotIndex < scenario.contender0CardSlots; cardSlotIndex++){

                        SetCardForContenderSlot(comboOfCards[cardSlotIndex],"tournamentAbel",1,cardSlotIndex);
                    }
                }
            }
            
            console.log(cainContender);
            
            if(mode == "story") scenario.QueueProcess([cainContender, {getCardsFromCollectionCardHandler:true, playerUsername:"AI", playerId:"AI"}]);
            
            if(mode == "pvp") scenario.QueueProcess([cainContender,abelContender]);
            
            scenario.ProcessNextInQueue();
            
            gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend", "<br><br>");
            
            scenario.PrepFunc(mode);
            
            
        }
        
        cardHandler.EmptyCards("tournamentCain");
        cardHandler.EmptyCards("tournamentAbel");
        
        this.tournamentAnalysisMode = false;
    }
}

export function SortWinscoreThenDate(ob1,ob2) {
    if (ob1.ws > ob2.ws) {
        return 1;
    } else if (ob1.ws < ob2.ws) { 
        return -1;
    }

    // Else go to the 2nd item
    if (ob1.timestamp < ob2.timestamp) { 
        return 1;
    } else if (ob1.timestamp > ob2.timestamp) {
        return -1
    } else { // nothing to split them
        return 0;
    }
}