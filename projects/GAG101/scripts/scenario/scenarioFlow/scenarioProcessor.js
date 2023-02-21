import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";
import {GenerateCombinations} from "../../../../../utils/mathAndLogicUtils/miscUtils.js";
import {charData} from "../../data/charData.js";

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

    }
    
    AddPhase(phaseName,func,pause){
        
        const p = new scenarioPhase(phaseName,func,pause);
        
        p.phaseInd = this.phases.length;
        
        this.phases.push(p);
        
        return p
    }
    
    QueueProcess(match = {otherPlayId:window.gameHandler.otherPlayerId, otherPlayerUsername:"AI", serverCards:null}){
        
        const rp = new scenarioProcessorRun();
        
        rp.phases = [...this.phases];
        
        this.queuedProcessors.push(rp);
        
        console.log(match);
        
        rp.otherPlayerId = match.otherPlayerId;
        
        rp.otherPlayerUsername = match.otherPlayerUsername;
        
        rp.match = match;
        
        
    }
    
    ProcessNextInQueue(){
        
        const rp = this.queuedProcessors.shift();
        
        const cardHandler = window.gameHandler.collectionCardHandler;
        
        this.currentRunProcessor = rp;
        
        if(rp.match != null){
            
            for(const JSONCard of rp.match.serverCards){
            
            const card = cardHandler.MakeCardFromJSON(JSONCard,rp.match.otherPlayerId);
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
}

class scenarioProcessorRun
{
    constructor(){
        
        this.phases = [];
        this.currentPhaseInd = 0;
        this.otherPlayerId;
    }
    
    RunNextPhase(){
                
        if(this.currentPhaseInd >= this.phases.length) return
        
        const phase = this.phases[this.currentPhaseInd];
        
        phase.scenarioProcessorRun = this;
        
        phase.Run();
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