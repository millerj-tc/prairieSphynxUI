// scenarioProcessor.AddPhase("dupeConk",DupeConk);
// phaseName/function

export class scenarioProcessor
{
    constructor(){
        
        this.phases = [];
        this.currentPhaseInd = 0;
    }
    
    AddPhase(){
        
        
    }
    
    BeginProcess(){
        
        this.currentPhaseInd = -1;
        this.RunNext();
    }
    
    RunNext(){
        
        this.currentPhaseInd++;
        
        this.phases[this.currentPhaseInd].Run();
    }
}

class scenarioPhase
{
    constructor(phaseName,func,pause = false){
        
        this.scenarioProcessor;
        this.phaseInd;
        this.func = func;
    }
    
    Run(){
        
        this.func();
        
        if(!pause) this.scenarioProcessor.RunNext();
    }
}