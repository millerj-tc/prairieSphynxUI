import {cloneCrisisPrepStage} from "./cloneCrisisPrepStage.js";
import {cloneCrisisNewGamePlusStage} from "./cloneCrisisNewGamePlusStage.js";

export function initializeCloneCrisisPlusCardZones(scenario){
    
    scenario.usesCardZoneAssignment = false;
    
    const $loc = scenario.cardZoneHandler.AddCardZone("cardZone","",3,"#1363DF");
    $loc.displayName = "";
}

export function initializeCloneCrisisPlusStages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioPrepStage;
    
    const $loc0 = scenario.stageHandler.AddStage("loc0");
        
    $loc0.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");
    
    $loc0.stageHeader = "NEW YORK";
    
    const $daredevilObj = GH.database.GetObjFromString("Daredevil");
    
    $daredevilObj.openingLine = `"Well this is an interesting problem indeed, isn't it Jessica?"`;
    
    const $jessicaJObj = GH.database.GetObjFromString("Jessica Jones");
    
    $jessicaJObj.openingLine = `"I'm not nearly drunk enough for this Red. Someone explain in ten words or less or I start punching."`;
    
    $loc0.npcs = [$daredevilObj,$jessicaJObj];
    
    $loc0.stalemateText = "The story continues in New York...";
    
}

function GetScenarioPrepStage(stageHandler,id){
     
    const $stage = new cloneCrisisPrepStage(stageHandler,id);
    
    const $sfw = $stage.stageFlowHandler;
    
    $sfw.AddPhase($stage._DeclareCardZone);
        
    $sfw.AddPhase($stage._StageHeaderOutput);

     $sfw.AddPhase($stage._MultipleNPCOpeningLineOutput);

     $sfw.AddPhase($stage._WarnIfDupeCharsOnSameTeam);
    
     $sfw.AddPhase($stage._SetEvalPool);

     $sfw.AddPhase($stage._NPCRecruitedAndUnlockedWithinTwoCharisma);

     $sfw.AddPhase($stage._ValidateWinnersAndLosers);

     $sfw.AddPhase($stage._ResultDisplayText);

     $sfw.AddPhase($stage._TriggerStageFx);

     $sfw.AddPhase($stage._IncreaseXpForAllParticipatingChars);
     
    return $stage
}
    
export function initializeCloneCrisisPlusScenarioFx(scenario){
    
    
}

export function initializeCloneCrisisPlus1CardZones(scenario){
    
    scenario.usesCardZoneAssignment = false;
    
    const $loc = scenario.cardZoneHandler.AddCardZone("cardZone","",3,"#1363DF");
    $loc.displayName = "";
}

export function initializeCloneCrisisPlus1Stages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioPrepStage;
    
    const $loc0 = scenario.stageHandler.AddStage("loc0");
        
    $loc0.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");
    
    $loc0.stageHeader = "NEW YORK Part 2";
    
    const $grObj = GH.database.GetObjFromString("Ghostrider");
    
    $grObj.openingLine = `"I'm GHOSTRIDER!"`;
    
    const $punisherObj = GH.database.GetObjFromString("Punisher");
    
    $punisherObj.openingLine = `"This weird thing will not leave me the FUCK alone and I can't seem to kill it. What's going on now?"`;
    
    $loc0.npcs = [$grObj,$punisherObj];
    
    $loc0.stalemateText = "The story continues in Wakanda...";

}
    
export function initializeCloneCrisisPlus1ScenarioFx(scenario){
    
    
}

export function initializeCloneCrisisPlus2CardZones(scenario){
    
    scenario.usesCardZoneAssignment = false;
    
    const $loc = scenario.cardZoneHandler.AddCardZone("cardZone","",3,"1363DF");
    $loc.displayName = "";
}

export function initializeCloneCrisisPlus2Stages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioPrepStage;
    
    const $loc0 = scenario.stageHandler.AddStage("loc0");
        
    $loc0.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");
    
    $loc0.stageHeader = "Wakanda";
    
    const $bpObj = GH.database.GetObjFromString("Black Panther");
    
    $bpObj.openingLine = `"We have no place in Wakanda for nefarious clones. Explain yourselves!"`;
    
    const $okoyeObj = GH.database.GetObjFromString("Okoye");
    
    $okoyeObj.openingLine = `"My King, I am very skeptical about this conflict..."`;
    
    $loc0.stalemateText = "<br><br><b>The great battle commences</b>!";
    
    $loc0.npcs = [$bpObj,$okoyeObj];

}
    
export function initializeCloneCrisisPlus2ScenarioFx(scenario){
    
    
}

export function initializeCloneCrisisPlus3CardZones(scenario){
    
    scenario.usesCardZoneAssignment = false;
    
    const $loc = scenario.cardZoneHandler.AddCardZone("cardZone","",5,"1363DF");
    $loc.displayName = "";
}

export function initializeCloneCrisisPlus3Stages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioStage3;
    
    const $loc2 = scenario.stageHandler.AddStage("loc2");

    $loc2.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc2.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc3 = scenario.stageHandler.AddStage("loc3");

    $loc3.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc3.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc4 = scenario.stageHandler.AddStage("loc4");

    $loc4.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc4.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc5 = scenario.stageHandler.AddStage("loc5");

    $loc5.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc5.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc6 = scenario.stageHandler.AddStage("loc6");

    $loc6.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc6.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc7 = scenario.stageHandler.AddStage("loc7");

    $loc7.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc7.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc8 = scenario.stageHandler.AddStage("loc8");

    $loc8.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc8.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";
    
    const $loc9 = scenario.stageHandler.AddStage("loc8");

    $loc9.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc9.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";
    
    const $loc10 = scenario.stageHandler.AddStage("loc8");

    $loc10.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");

    $loc10.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

}

function GetScenarioStage3(stageHandler,id){
     
    const $stage = new cloneCrisisNewGamePlusStage(stageHandler,id);
    
    const $sfw = $stage.stageFlowHandler;
        
    $sfw.AddPhase($stage._ResetNPCRecruitmentProperties);

    $sfw.AddPhase($stage._DeclareCardZone);

    $sfw.AddPhase($stage._StageHeaderOutput);

    $sfw.AddPhase($stage._NPCOpeningLineOutput);

    $sfw.AddPhase($stage._WarnIfDupeCharsOnSameTeam);

    $sfw.AddPhase($stage._SetEvalPool);

    $sfw.AddPhase($stage._VsOutput);

    $sfw.AddPhase($stage._RemoveDebuffedCharsFromPool);
    
    $sfw.AddPhase($stage._DupedCharLosesToNumbers);

    $sfw.AddPhase($stage._UnlockedCharsSideWithNearestUntiedCharisma);
        
    // -- Unlocked Char Side Select Output has to happen within loop because there could be multiple within stage

    $sfw.AddPhase($stage._LowestCunningConfusedUnlessAlone);

    $sfw.AddPhase($stage._LowestCunningCyclopsShield);

    $sfw.AddPhase($stage._LowestCunningConfusedOutput);
    
    $sfw.AddPhase($stage._PenanceStare);
    
    $sfw.AddPhase($stage._NimbleDodge);
    
    $sfw.AddPhase($stage._GetHighestSpeedChar);

    $sfw.AddPhase($stage._HighestSpeedDebuffsGreatestPower);

    $sfw.AddPhase($stage._EnragedCharStrikesBack);

    $sfw.AddPhase($stage._EnragedCharStrikesBackOutput);

    $sfw.AddPhase($stage._HighestSpeedDebuffOutput);

    $sfw.AddPhase($stage._SpeedDebuffedCharGetsEnraged);

    $sfw.AddPhase($stage._SpeedDebuffEnrageOutput);
    
    $sfw.AddPhase($stage._CyclopsAndBishopEnergyAttack);

    $sfw.AddPhase($stage._AloneCharPowerTrumps);
    
    $sfw.AddPhase($stage._GetGreatestUnmatchedPowerChar);
    
    $sfw.AddPhase($stage._GetGreatestUnmatchedPowerCharEnemies);

    $sfw.AddPhase($stage._GreatestUnmatchedPowerCapturesLowestToughness);

    $sfw.AddPhase($stage._BishopIsImmune);

    $sfw.AddPhase($stage._AlsoRemoveTeamDupedUnlockedCharIfMirrorIsCaptured);

    $sfw.AddPhase($stage._GreatestPowerCaptureOutput);
    
    $sfw.AddPhase($stage._CaptureOutput);

    $sfw.AddPhase($stage._AutoSortWinnersAndLosers);

    $sfw.AddPhase($stage._SetSpecialOutputGroup0ToRemainingLosingChars);

    $sfw.AddPhase($stage._ValidateWinnersAndLosers);

    $sfw.AddPhase($stage._EndGameIfTeamAllCapturedPlus);

    $sfw.AddPhase($stage._TriggerStageFx);

    $sfw.AddPhase($stage._IncreaseXpForAllParticipatingChars);
    
    return $stage
}
    
export function initializeCloneCrisisPlus3ScenarioFx(scenario){
    
    
}

