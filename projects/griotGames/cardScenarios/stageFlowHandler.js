import {evaluation} from "./evaluation.js";

class evalState
{
    constructor(stagePhase,evalObj,stepId){
        
        this.stagePhase = stagePhase;
        this.stepId = stepId + "Iteration" + this.stagePhase.iterationCount;
        
        this.evalState = {};
        
        this.dataPool = [];
        
        for(const char in evalObj.pool) this.dataPool.push(char.data)
    }
}

class stagePhase
{
    constructor(stageFlowHandler,func,id = null){
        
        this.stageFlowHandler = stageFlowHandler;
        this.stage = this.stageFlowHandler.stage;
        this.uiHandler = this.stage.uiHandler;
        this._Run = func;
        this.funcName = func.name;
        this.previousPhase;
        this.nextPhase;
        this.evalStates = [];
        this.lastCreatedEvalState;
        this.currentEvalState;
        this.iterationCount = 0;
        this.endRun = true;
        this.waitToGotoNextPhaseOrStage = false;
        this.waitForContinueButtonPress = false;
        
        this.skipPhaseChars = [];
        
        if(this.id != null) this.id = id
        else this.id = String(this.stageFlowHandler.stage.id + "Step" + this.stageFlowHandler.phases.length);
    }
    
    ChangeNextPhaseTo(phase){
        
        this.nextPhase = phase;
    }
    
    SetToWaitForContinueButtonPress(){
        
        this.waitToGotoNextPhaseOrStage = true;
        this.waitForContinueButtonPress = true;
    }
    
    StartRun(evalObj){
        
        if(this.stage.stageHandler.scenario.scenarioOver) return
        
        if(evalObj == undefined) console.warn(this.stageFlowHandler.stage.id + " " + this.previousPhase.id + " failed to pass me a legit evalObj " + "(I'm " + this.stageFlowHandler.stage.id + " " + this.id + ")")
        if(this._Run == undefined) console.warn("I don't have _Run() defined!!  " + "(I'm " + this.stageFlowHandler.stage.id + " " + this.id + ")")
        
        this.endRun = true;
        
        //console.log("spinning up " + this.id + " " + this.funcName + " with NPC " + this.stage.NPC.name + " and is recruited " + this.stage.NPC.recruited);
        
        const $scenario = this.stageFlowHandler.stage.stageHandler.scenario;
        
        if($scenario.scenarioOver) $scenario.scenarioHandler.GotoScenario($scenario.nextScenario)
        
        this.RecordEvalState(evalObj,"preRun");
        
        this._ModifyEvalObjPoolForSkippedPhases(evalObj);
        
        this._Run(evalObj);
        this._EndRun(evalObj);
    }
    _EndRun(evalObj){
        
        const $stage = this.stageFlowHandler.stage;
        
        this._RestorePhaseSkippingCharsToEvalObjPool(evalObj);

        this.RecordEvalState(evalObj,"postRun");
        
        let $name = "";
        
        //if(evalObj.hasOwnProperty("greatestPowerCharacter")) $name = evalObj.greatestPowerCharacter.name;
        
        //console.log("exiting phase " + this.id + " " + this.funcName + " with greatestPower" + $name +  " winCredit " + evalObj.winCredit);
        
        if(!this.endRun) return
        
        if(this.waitToGotoNextPhaseOrStage) return
        
        if(this.nextPhase != undefined) this.nextPhase.StartRun(evalObj);
        
        else $stage.stageHandler.GotoNextStage($stage.nextStage);
    }
    
    _ModifyEvalObjPoolForSkippedPhases(evalObj){
        
        this.skipPhaseChars = [];
        
        if(evalObj == null || !evalObj.hasOwnProperty("pool") || evalObj.pool.length < 1) return
        
        let $resultPool = [];
        
        for(const char of evalObj.pool){
            
            if(!char.skipPhases.includes(this.funcName)){ 
        
                $resultPool.push(char);
            }
            else{
                
                this.skipPhaseChars.push(char);
                char.skipPhases = char.skipPhases.filter(p => p!= this.funcName);
            } 
        }
        
        if($resultPool.length == 0) console.warn("pool is empty at " + this.id + " " + this.funcName);
        
        evalObj.pool = $resultPool;
    
    }
    
    _RestorePhaseSkippingCharsToEvalObjPool(evalObj){
        
        if(this.skipPhaseChars.length == 0) return
        
        for(const char of this.skipPhaseChars) evalObj.pool.push(char);
    }
    
    RecordEvalState(evalObj,stepId){
        
        const $evalState = new evalState(this,evalObj,stepId);
        
        if(this.lastCreatedEvalState != undefined) {
            $evalState.previousEvalState = this.lastCreatedEvalState;
            this.lastCreatedEvalState.nextEvalState = $evalState;
        }
        
        this.evalStates.push($evalState);
        
        if(this.evalStates.length == 1) this.currentEvalState = $evalState
        
        this.lastCreatedEvalState = $evalState;
        
        return $evalState
    }
    GetEvalState(stepId){
        
        for(const state of this.evalStates){
            
            if(state.stepId == stepId) return state
        }
        
        console.warn("GetEvalState failed for " + stepId + " " + this._Run + " " + this.stageFlowHandler.stage.id);
    }
    
    _CharHasAcrossTeamsDupeMatch(char,evalObj){
        
        for(const obj of evalObj.pool){
            
            if(obj.dataType == "char" && obj.name == char.name && obj.alignment != char.alignment) return true
        }
        
        return false
    }
    
     _CharLastTeammateAtLoc(char){
        
        const $teammatesWithMyAlignment = this.stage.cardZone.GetCharsHere("any",char.alignment).length;
        
        if($teammatesWithMyAlignment > 1) return false
        else if($teammatesWithMyAlignment == 1) return true
        else console.warn("Error: _CharLastTeammateAtLoc() is malfunctioning: " + char.name + " asked how many friends were present and was told " + $teammatesWithMyAlignment);
    }
    
     _ReturnArrWithTeamDupedCharsRemoved(arr){
        
        let $returnArr = [];
        
        for(const char of arr){
         
            let $matches = 0;
            
            for(const otherChar of arr){

                if(char.name == otherChar.name && char.alignment != otherChar.alignment) $matches++
            }
            
            if($matches > 0) continue
            else{
                
                $returnArr.push(char);
            }
        
        }
        
        return $returnArr
    }
    
    _CheckIfSkipResultDisplayText(){
    
        if(!this.stage.displayWintextAfterGameover && this.stage.stageHandler.scenario.scenarioOver) return true
        
        return false
    }
    
    CreateContinueButton(evalObj){
        
        if(this.waitForContinueButtonPress){
            
            const $contButton = this.uiHandler.CreateStageContinueButton(this.stage.stageHandler.scenario.id);
            
            const $this = this;
            
            const $evalObj = evalObj;
            
            $contButton.onclick = function(){
                
                if($this.nextPhase != undefined) $this.nextPhase.StartRun($evalObj);
        
                else $this.stageHandler.GotoNextStage($this.stage.nextStage);
            }
        }
    }
    
    UpdateScenarioCharsWithDataFromEvalObj(evalObj){
        
        for(const scenChar of this.stageFlowHandler.stage.stageHandler.scenario.scenarioCharInstances){
            
            for(const evalObjChar of evalObj.pool){
                
                if(scenChar.data.name == evalObjChar.data.name) scenChar.data = evalObjChar.data
            }
        }
    }
    
    
}

export class stageFlowHandler
{
    constructor(stage){
        
        this.stage = stage;
        this.phases = [];
        this.lastCreatedPhase;
        this.currentPhase;
    }
    
    AddPhase(func,id){
        
        const $phase = new stagePhase(this,func,id);
        
        if(this.lastCreatedPhase != undefined) {
            $phase.previousPhase = this.lastCreatedPhase;
            this.lastCreatedPhase.nextPhase = $phase;
        }
        
        this.phases.push($phase);
        
        if(this.phases.length == 1) this.currentPhase = $phase
        
        this.lastCreatedPhase = $phase;
        
        return $phase
    }
    
    ResetPhaseIterationCounts(){
        
        for(const phase of this.phases){
            
            phase.iterationCount = 0;
        }
    }
    
    RunPhases(tournamentMode = false){
        
        this.stage.tournamentMode = tournamentMode;
        
        this.stage.firstRun = false;
        
        const $evalObj = new evaluation(this);
        
        this.currentPhase.StartRun($evalObj);
    }
    
    _CheckForDupePhases(){
        
        const $testArr = [...this.phases];
        
        for(const phase of this.phases){
            
            for(const otherPhase of $testArr){
                
                if(phase.funcName == otherPhase.funcName) console.warn(this.stage.id = " has a duplicately named phase function!")
            }
        }
    }
    
    SkipToPhaseByFuncName(evalObj,funcName){ // -- WILL NOT EXECUTE STAGEPHASE.ENDRUN() FOR CURRENT PHASE
        
        this.currentPhase.endRun = false;
        
        for(const phase of this.phases){
            
            if(phase.funcName == funcName) phase.StartRun(evalObj)
        }
    }
}