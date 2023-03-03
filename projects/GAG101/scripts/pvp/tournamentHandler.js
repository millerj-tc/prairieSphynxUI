import {WatchOfSilencePrep} from "../scenario/scenarios/watchOfSilence.js";
import {charData} from "../data/charData.js";
import {GenerateCombinations} from "/utils/mathAndLogicUtils/miscUtils.js";
import {SetCardForContenderSlot} from "../scenario/scenarioFlow/genericScenarioPrep.js";
import * as cardInfoPhaseUtils from "../scenario/scenarioPhases/cardInfoPhaseUtils.js";
import * as uiPhaseUtils from "../scenario/scenarioPhases/uiPhaseUtils.js";

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
        
        this.pastMatches = [];
        
        this.tournamentAnalysisMode = false
        
    }
    
    AddContender(cardsAsJSON,playerId,playerUsername,timeStamp){
        
        const c = new contender(cardsAsJSON,playerId,playerUsername,timeStamp);
        
        if(cardsAsJSON == false) c.getCardsFromCollectionCardHandler = true; //if you don't pass this JSON cards, it will get the cards from collection Card Handler by userid instead
        
        this.contenders.push(c);
        
        return c
        
    }
    
    EmptyContenders(){
        
        console.log(this.contenders);
        
        this.pastMatches.push(this.contenders);
        
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
    
    RunAllLegalPermutations(scenarioName,mode,cainCardPool,abelCardPool){
        
        this.tournamentAnalysisMode = true;
        
        const gh = window.gameHandler;
        
        const scenarioHandler = gh.scenarioHandler;
        
        const scenario = scenarioHandler.GetScenarioByName(scenarioName);
    
        const cardHandler = gh.collectionCardHandler;
        
        
        // generate cards from pool of all possible cards (including npcs) if card pools are not specified, otherwise make cards
        if(cainCardPool == null) cainCardPool = charData;
        if(abelCardPool == null) abelCardPool = charData;
        
        for(const c of cainCardPool){

            cardHandler.MakeCardFromJSON(JSON.stringify(c),"tournamentCain");
        }
        
        for(const c of abelCardPool){
            
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
            const cainContender = gh.tournamentHandler.AddContender(false,"tournamentCain","Cain","none");
            
            cainContender.getCardsFromCollectionCardHandler = true;
            
            for(let cardSlotIndex = 0; cardSlotIndex < scenario.contender0CardSlots; cardSlotIndex++){
                
                SetCardForContenderSlot(comboOfCards[cardSlotIndex],"tournamentCain",0,cardSlotIndex);
            }
            
            let abelContender = {};
            
            if(mode == "pvp"){
                
                for(const comboOfCards of abelCardCombinations){

                    abelContender = gh.tournamentHandler.AddContender(false,"tournamentAbel","Abel","none");

                    abelContender.getCardsFromCollectionCardHandler = true;

                    for(let cardSlotIndex = 0; cardSlotIndex < scenario.contender1CardSlots; cardSlotIndex++){
                        
                        console.error("it's cycling through all these combos without actually running it which is at least part of the problem")

                        SetCardForContenderSlot(comboOfCards[cardSlotIndex],"tournamentAbel",1,cardSlotIndex);
                    }
                    
                    scenario.QueueProcess([cainContender,abelContender]);
                    
                    this._ProcessMatchup(mode);
                    
                    
                }
            }
            
            console.log(cainContender);
            
            if(mode == "story"){
                
                const AIContender = this.AddContender(false,"AI","AI","none");
                
                AIContender.getCardsFromCollectionCardHandler = true;
                
                scenario.QueueProcess([cainContender, AIContender]);
                
                this._ProcessMatchup(mode);
                
            }

        }
        
        
        
        this._GetAnalysisResults(scenario);
        
        cardHandler.EmptyCards("tournamentCain");
        cardHandler.EmptyCards("tournamentAbel");
        
        this.pastMatches = [];
        this.contenders = [];
        
        this.tournamentAnalysisMode = false;
    }
    
    _ProcessMatchup(mode){
        
        const gh = window.gameHandler;
        
        const scenario = gh.scenarioHandler.GetCurrentScenario();
        
        scenario.ProcessNextInQueue();
                
        gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend", "<br><br>");

        scenario.PrepFunc(mode);

        this.EmptyContenders();
    }
    
    _GetAnalysisResults(scenario){
        
        let matchHTMLString = "";
        
        let winningTeamsHTMLString = "";
        
        let cainWins = 0;
        
        let ties = 0;
        
        let abelWins = 0;
        
        const gh = window.gameHandler;
        
        console.warn("vs AI only right now");
        
        console.log(this.pastMatches);
        
        for(const m of this.pastMatches){
            
            matchHTMLString += "<br><br>" + JSON.stringify(m[0]); + "<br>~~~VS~~~<br>" + JSON.stringify(m[1]);
            
            cainWins += m[0].wins;
            
            ties += m[0].ties;
            
            abelWins += m[1].wins;
            
        }
        
        let winningContenders = [];
        
        for(const rp of scenario.runProcessors){
            
            winningContenders.push(rp.contenders[0]);
            
        }
        
        winningContenders = winningContenders.sort(function(a,b){return b.wins - a.wins});
            
        for(const contender of winningContenders){

            for(const card of contender.cards){
            
                winningTeamsHTMLString += card.name + ", ";
            }
        
            
            winningTeamsHTMLString += `wins: ${contender.wins}<br>`
        }
        
        
        const artist = window.gameHandler.narrOutputArtist;
        
        uiPhaseUtils.OutputTextDivWithNounImages(`Cain wins: ${cainWins} `);
        
        uiPhaseUtils.OutputTextDivWithNounImages(`Ties: ${ties} `);
        
        uiPhaseUtils.OutputTextDivWithNounImages(`Abel Wins: ${abelWins}`);
        
        gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend", "<br><br>");
        
        gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend",winningTeamsHTMLString);
        
        gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend", "<br><br>");
        
        artist.InsertHTMLAdjacentToDOM("beforeend",matchHTMLString);
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