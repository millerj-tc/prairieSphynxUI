export function SubsequentRunReset(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    if(scenario.runProcessors.length > 1){
        
        gh.narrOutputArtist.ClearAllChildren();

    }
}