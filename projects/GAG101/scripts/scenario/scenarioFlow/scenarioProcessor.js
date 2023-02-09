// scenarioProcessor.AddPhase("dupeConk",DupeConk);
// phaseName/function

export class scenarioProcessor
{
    constructor(scenarioName){
        
        this.scenarioName = scenarioName;
        this.phases = [];
        this.runProcessors = [];
        this.currentRunProcessor;
    }
    
    AddPhase(phaseName,func,pause){
        
        const p = new scenarioPhase(phaseName,func,pause);
        
        this.phases.push(p);
    }
    
    BeginProcess(runId){
        
        const rp = new scenarioRunProcessor(runId);
        
        rp.phases = [...this.phases];
        
        this.runProcessors.push(rp);
        
        this.currentRunProcessor = rp;
        
        this.rp.RunNext();
    }
}

class scenarioRunProcessor
{
    constructor(runId){
        
        this.phases = [];
        this.currentPhaseInd = -1;
        this.runId;
    }
    
    RunNext(){
        
        this.currentPhaseInd++;
        
        const phase = this.phases[this.currentPhaseInd];
        
        phase.scenarioRunProcessor = this;
        
        phase.Run();
    }
}

class scenarioPhase
{
    constructor(phaseName,func,pause = false){
        
        this.scenarioRunProcessor;
        this.phaseInd;
        this.func = func;
        this.pause = pause;
    }
    
    Run(){ //can set pause within phase with by manipulating this.pause
        
        this.func();
        
        if(!pause) this.scenarioProcessor.RunNext();
    }
}