import {scenario} from "./scenario.js";
import {character} from "./character.js";

export class cardScenarioHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.cardScenarios = [];
        this.gameCharInstances = [];
        this.lastCreatedCardScenario = undefined;
        this.currentCardScenario;
    }
    
    AddScenario(id){
        
        const $scenario = new scenario(this,id);
        
        if(this.lastCreatedScenario != undefined) {
            $scenario.previousScenario = this.lastCreatedScenario;
            this.lastCreatedScenario.nextScenario = $scenario;
        }
        
        this.scenarios.push($scenario);
        
        if(this.scenarios.length == 1) this.currentScenario = $scenario
        
        this.lastCreatedScenario = $scenario;
        
        return $scenario
    }
    
    GotoScenario(scenario){
        
        if(scenario == undefined || this.gameHandler.gameOver) return;
        
        this.gameHandler.uiHandler.storedOutputDivs = [];
        
        if(this.currentScenario != null && this.currentScenario.hasOwnProperty("nextScenario") && scenario == this.currentScenario.nextScenario){
           
            if(this.currentScenario.savedLocCharSlots.length == 0) console.warn("SCENARIO LOCATION CHAR SLOTS WERE NOT SAVED CORRECTLY -- REWIND MAY FAIL");
            
            scenario.savedLocCharSlots = this.currentScenario.savedLocCharSlots;
            
        }

        this.currentScenario = scenario;
            
        this.currentScenario.ScenarioPrep();
        
        
        
    }
    
//    GetGameCharObj(name){
//        
//        for(const obj of this.gameHandler.database.data){
//            
//            if(obj.dataType == "char" && obj.data.name == name) return obj
//        }
//    }
    
//    LoadAllGameCha(){ //gameCharInstances gets to have actual objects to make sure that they have proper functions, etc.
//        
//        for(const obj of this.gameHandler.database.data){
//            
//            if(obj.dataType != "char") continue
//            
//            const $char = new character(this);
//            
//            $char.data = obj;
//            
//            $char.AddGenericProperties();
//            
//            this.gameCharInstances.push($char);
//        }
//    }
}