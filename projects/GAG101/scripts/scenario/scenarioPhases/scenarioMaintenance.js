export function SubsequentRunReset(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    if(scenario.runProcessors.length > 1){
        
        window.gameHandler.narrOutputArtist.ClearAllChildren();

    }
}