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
    
    QueueProcess(otherPlayId = window.gameHandler.otherPlayerId, otherPlayerUsername){
        
        const rp = new scenarioProcessorRun();
        
        rp.phases = [...this.phases];
        
        this.queuedProcessors.push(rp);
        
        rp.otherPlayerId = otherPlayId;
        
        rp.otherPlayerUsername = otherPlayerUsername;
    }
    
    ProcessNextInQueue(){
        
        const rp = this.queuedProcessors.shift();
        
        this.currentRunProcessor = rp;
        
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