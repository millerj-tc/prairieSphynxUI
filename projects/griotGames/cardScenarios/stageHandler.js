export class stageHandler
{
    constructor(scenario){
        
        this.scenario = scenario;
        
        this.stages = [];
        this.lastCreatedStage = undefined;
        this.currentStage = undefined;
    }
    
//    MoveToNextStage(){
//        
//        this.currentStage = this.currentStage.nextStage;
//    }
    
    AddStage(id,interactive = true){
        
        const $stage = this.scenario.GetScenarioStage(this,id);
        
        $stage.interactive = interactive;
        
        if(this.lastCreatedStage != undefined) this.lastCreatedStage.nextStage = $stage;
        
        this.stages.push($stage);
        
        this.lastCreatedStage = $stage;
        
        //console.log($stage);
        
        return $stage
    }
    
    GotoNextStage(stage){
        
        const $ui = this.scenario.scenarioHandler.gameHandler.uiHandler;
        
        let $tournamentMode = this.currentStage.tournamentMode;
        
        if(stage != undefined && !this.scenario.scenarioOver){ 
            
            this.currentStage = stage;
            
            $ui.NewStageOutputDiv("<br><br>");

            stage.stageFlowHandler.RunPhases($tournamentMode);
        }
        
        else if(this.currentStage == this.stages[this.stages.length -1] || this.scenario.scenarioOver){
            
            this.scenario.scenarioHandler.GotoScenario(this.scenario.nextScenario);

        }
        else console.warn("something funky is happening with GotoNextStage coming from " + this.currentStage.id);
    }
}
