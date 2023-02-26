import {scenarioProcessor} from "./scenarioProcessor.js";

export class scenarioProcessorHandler
{
    constructor(){
        
        this.scenarios = [];
        this.currentScenario;
    }
    
    AddScenario(name){
        
        const sp = new scenarioProcessor(name);
        
        this.scenarios.push(sp);
        
        return sp
        
    }
    
    SetCurrentScenarioByName(name){
        
        for(const s of this.scenarios){
            
            if(s.scenarioName == name) this.currentScenario = s
        }
    }
    
    StartCurrentScenario(){
        
        this.currentScenario.BeginProcess();
    }
    
    GetCurrentScenario(){
        
        return this.currentScenario
    }
    
    GetScenarioByName(name){
        
        for(const s of this.scenarios){
            
            if(s.scenarioName == name) return s
        }
    }
    
}