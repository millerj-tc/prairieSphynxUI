import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";
import {GenerateCombinations} from "../../../../../utils/mathAndLogicUtils/miscUtils.js";
import {charData} from "../../data/charData.js";
import {GetSelectedCardsFor} from "../scenarioPhases/cardInfoPhaseUtils.js";

export class scenarioProcessor
{
    constructor(scenarioName){
        
        this.scenarioName = scenarioName;
        this.phases = [];
        this.runProcessors = [];
        this.queuedProcessors = [];
        this.currentRunProcessor;
        this.playerCardSlots = 3;
        this.otherPlayerCardSlots = 3;
        this.uiToolsHandler = new uiToolsHandler();
        this.mode = "story";
        this.unlocked = true;

    }
    
    AddPhase(phaseName,func,pause){
        
        const p = new scenarioPhase(phaseName,func,pause);
        
        p.phaseInd = this.phases.length;
        
        this.phases.push(p);
        
        return p
    }
    
    QueueProcess(contenderArr = [{getCardsFromCollectionCardHandler:true,
        playerUsername:window.gameHandler.playerUsername,
        playerId:window.gameHandler.playerId}, {getCardsFromCollectionCardHandler:true,
        playerUsername:"AI",
        playerId:"AI"}]){
        
        const rp = new scenarioProcessorRun();
        
        rp.phases = [...this.phases];
        
        this.queuedProcessors.push(rp);
        
        for(let i = 0; i < contenderArr.length; i++){
            
            rp["player" + i + "Id"] = contenderArr[i].playerId;
            rp["player" + i + "Username"] = contenderArr[i].playerUsername
            
            rp.contenders.push(contenderArr[i]);
        }
        
        
    }
    
    ProcessNextInQueue(){
        
        const rp = this.queuedProcessors.shift();
        
        this.runProcessors.push(rp);
        
        const cardHandler = window.gameHandler.collectionCardHandler;
        
        this.currentRunProcessor = rp;
        
        for(const contender of rp.contenders){
            
            if(contender.getCardsFromCollectionCardHandler) continue
            
            for(const JSONCard of contender.cardsAsJSON){
            
                cardHandler.MakeCardFromJSON(JSONCard,contender.playerId);
            }
        }        
        
        rp.RunNextPhase();
    }
    
    ContinueProcess(){
        
        this.currentRunProcessor.RunNextPhase();
    }
    
    
    GetCurrentRunProcessor(){
        
        return this.currentRunProcessor
    }
    
    SetCurrentRunProcessorProp(prop,value){
        
        this.currentRunProcessor[prop] = value;
    }
    
    SetMode(mode){
        
        this.mode = mode;
    }
    
    GetMode(){ return this.mode}
    
    GetCurrentRunProcessorProp(prop){
        
        return this.currentRunProcessor[prop];
    }
    
    GetCurrentPhase(){
        
        const rp = this.currentRunProcessor;
        
        return rp.phases[rp.currentPhaseInd];
    }
    
    GetCurrentRunPhaseByName(name){
        
        for (const ph of this.currentRunProcessor.phases){
            
            if(ph.phaseName == name){
                
                return ph
            }
        }
    }
    LockScenario(){
        
        this.unlocked = false;
    }
    UnlockScenario(){
        
        this.unlocked = true;
    }
}

class scenarioProcessorRun
{
    constructor(){
        
        this.phases = [];
        this.currentPhaseInd = 0;
        this.otherPlayerId;
        this.contenders = [];
        this.uiToolsHandler = new uiToolsHandler();
    }
    
    RunNextPhase(){
                
        if(this.currentPhaseInd >= this.phases.length) return
        
        const phase = this.phases[this.currentPhaseInd];
        
        phase.scenarioProcessorRun = this;
        
        phase.Run();
    }
    
    ContenderMatchWinnersTiersLosers(winnerArr,tierArr,loserArr){
        
        // these arrs are contender objects
        
        const cardHandler = window.gameHandler.collectionCardHandler;
        
        this.winnerArr = winnerArr;
        this.tierArr = tierArr;
        this.loserArr = loserArr;
        
        if(this.winnerArr == null) this.winnerArr = [];
        if(this.tierArr == null) this.tierArr = [];
        if(this.loserArr == null) this.loserArr = [];
        
        let playerWon = false;
        
        function should implement a "scenario rating" prop for this so that you can stack rank in analysis and figure out what the ladder looks like for progression {
        
        for(const winner of this.winnerArr){
            
            winner.matches++;
            winner.wins++;
            
            const th = window.gameHandler.tournamentHandler;
            
            const scenarioMode = window.gameHandler.scenarioHandler.GetCurrentScenario().GetMode();
            
            winner.cards = GetSelectedCardsFor(winner.playerId);
            
            if(winner.playerId == window.gameHandler.playerId) playerWon = true;
        }
        
        for(const tier of this.tierArr){
            
            tier.matches++;
            tier.ties++;
            
            tier.cards = GetSelectedCardsFor(tier.playerId);
        }
        
        for(const loser of this.loserArr){
            
            loser.matches++;
            loser.defeats++;
            
            loser.cards = GetSelectedCardsFor(loser.playerId);
            
            if(playerWon) loser.defeatedByPlayer = true;
        }
        
        for(const winner of this.winnerArr){
            
            if(!playerWon) winner.defeatedPlayer = true;
        }
    }
    
    GetContenderByUserId(id){
        
        for(const contender of this.contenders){
            
            if(contender.playerId == id) return contender
        }
    }
        
}

class scenarioPhase
{
    constructor(phaseName,func,pause = false){
        
        this.scenarioProcessorRun;
        this.phaseName = phaseName;
        this.phaseInd;
        this.func = func;
        this.pause = pause;
        this.arguments = [];
    }
    
    SetArguments(argArr){
        
        if(!Array.isArray(argArr)) console.error("SetArguments passed non-array! This shall not be tolerated!");
        
        this.arguments = argArr;
    }
    
    SetFunc(func){
        
        this.func = func;
    }
    
    Run(){ //can set pause within phase with by manipulating this.pause
        
        this.scenarioProcessorRun.currentPhaseInd++; //move to the next one if linear
        
        this.func.apply(this,this.arguments); //phase func can set alternate phase ind to jump somewhere else
                
        if(!this.pause) this.scenarioProcessorRun.RunNextPhase();
    }
}