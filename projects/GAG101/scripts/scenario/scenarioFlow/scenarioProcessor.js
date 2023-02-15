import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";

export class scenarioProcessor
{
    constructor(scenarioName){
        
        this.scenarioName = scenarioName;
        this.phases = [];
        this.runProcessors = [];
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
    
    BeginProcess(runId){
        
        const rp = new scenarioProcessorRun(runId);
        
        rp.phases = [...this.phases];
        
        this.runProcessors.push(rp);
        
        this.currentRunProcessor = rp;
        
        rp.RunNextPhase();
    }
    
    ContinueProcess(){
        
        this.currentRunProcessor.RunNextPhase();
    }
    
    
    GetCurrentRunProcessor(){
        
        return this.currentRunProcessor
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
    constructor(runId){
        
        this.phases = [];
        this.currentPhaseInd = 0;
        this.runId;
    }
    
    RunNextPhase(){
                
        if(this.currentPhaseInd >= this.phases.length) return
        
        console.log(this.phases);
        
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