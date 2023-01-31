export function initializeMagicScenario0()
{
    const GH = window.gameHandler;
    
    const $vala0 = GH.scenarioHandler.stageHandler.AddStage("valakut0");
    
    $vala0.evalValue = "toughness";
        
    $vala0.winText = "[names] braves the fires of Valakut, gaining valuable intelligence."
        
    $vala0.cardZone = GH.scenarioHandler.cardZoneHandler.GetCardZoneById("valakut");
    
    const $urbo0 = GH.scenarioHandler.stageHandler.AddStage("urborg0");
    
    $urbo0.evalValue = "power";
    
    $vala0.nextStage = $urbo0;
        
    $urbo0.winText = "[names] slays the necromancer king of Urborg, inspiring many."
        
    $urbo0.cardZone = GH.scenarioHandler.cardZoneHandler.GetCardZoneById("urborg");
    
    console.log($vala0);
    
    console.log($urbo0);
}