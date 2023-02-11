// scenarioProcessor.AddPhase("dupeConk",DupeConk);
// phaseName/function

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
    
    GetCurrentPhase(){
        
        const rp = this.currentRunProcessor;
        
        return rp.phases[rp.currentPhaseInd];
    }
}

class scenarioProcessorRun
{
    constructor(runId){
        
        this.phases = [];
        this.currentPhaseInd = -1;
        this.runId;
    }
    
    RunNextPhase(){
        
        this.currentPhaseInd++;
        
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
        
        this.arguments = argArr;
    }
    
    SetFunc(func){
        
        this.func = func;
    }
    
    Run(){ //can set pause within phase with by manipulating this.pause
        
        this.func.apply(this,this.arguments);
        
//        this.func();
        
        if(!this.pause) this.scenarioProcessorRun.RunNextPhase();
    }
}