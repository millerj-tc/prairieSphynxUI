import {stage} from "./../stage.js";

export function initPOTFCCardZones(scenario)
{
    scenario.usesCardZoneAssignment = false;
    
    const $cz = scenario.cardZoneHandler.AddCardZone("cardZone","images/potfc/solet-100.jpg",1,"#1363DF");
    $cz.displayName = "";
}

export function initPOTFCCardZoneMenu(scenario)
{
    const $salonMenu = this.uiHandler.AddGrid();
    
    $salonMenu.PrepGridTextElement("The Salon","salonHeader",true);
    $salonMenu.PrepGridTextElement("A story of","salonGenrePrompt")
        .AddCustomClasses(["prompt"]);
    $salonMenu.PrepGridTextElement("genreSelector","genreSelector",true);
    $salonMenu.PrepGridTextElement("starring","salonActorPrompt")
        .AddCustomClasses(["prompt"]);

    const $gridDOM = $salonMenu.BuildGrid(["salonMenu"]);
    
    document.getElementById("output").append($gridDOM);
    
    document.getElementById("content").prepend($gridDOM);
}

export function initPOTFCStages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioStage;
    
    const $story0 = scenario.stageHandler.AddStage("story0");
    
    $story0.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");
}

function GetScenarioStage(stageHandler,id)
{
    const $stage = new stage(stageHandler,id);
    
    const $sfw = $stage.stageFlowHandler;
    
    $sfw.AddPhase($stage._SetEvalPool);
    
    const $resultPhase = $sfw.AddPhase($stage._ResultDisplayText);
    
    $resultPhase.SetToWaitForContinueButtonPress();
    
    $sfw.AddPhase($stage._TriggerStageFx);

    $sfw.AddPhase($stage._IncreaseXpForAllParticipatingChars);
    
    return $stage
}

export function initPOTFCScenarioFX()
{
    
}