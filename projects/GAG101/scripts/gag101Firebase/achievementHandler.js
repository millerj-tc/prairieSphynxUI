import {UpdateScenarioAchievementForUser} from "./updateFirebase.js";

export class achievementHandler
{
    constructor(){
        
        
    }
    
    UnlockScenarioAchivement(scenarioName){
        
        const scenarioHandler = window.gameHandler.scenarioHandler;
        
        const scenario = scenarioHandler.GetScenarioByName(scenarioName);
        
        scenario.UnlockScenario();
        
        UpdateScenarioAchievementForUser(scenarioName,"Unlocked",true);
    }
}