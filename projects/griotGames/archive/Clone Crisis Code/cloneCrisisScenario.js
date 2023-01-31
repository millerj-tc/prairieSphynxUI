import {cloneCrisisStage} from "./cloneCrisisStage.js";

export function initializeCloneCrisisEasyCardZones(scenario){
    
    scenario.usesCardZoneAssignment = false;
    
    const $loc = scenario.cardZoneHandler.AddCardZone("cardZone","",3,"#1363DF");
    $loc.displayName = "";
}

export function initializeCloneCrisisEasyStages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioStage;
    
    const $loc0 = scenario.stageHandler.AddStage("loc0");
        
    $loc0.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");
    
    $loc0.stageHeader = "NEW YORK";
    
    $loc0.NPC = scenario.GetScenarioChar("Jessica Jones");
    
    $loc0.NPC.openingLine = `"Wow you all are really having at it, huh? One of these teams is the clones and one is... not? Did either of you bring any whiskey, by chance?"`;
    
    $loc0.winText = "[specialOutputGroup0 names] [[flees/flee]] to Wakanda, with [winners names] in hot pursuit!";
    
    $loc0.stalemateText = "A stalemate! The battle continues in Wakanda!";
    
    const $loc01 = scenario.stageHandler.AddStage("loc01");
        
    $loc01.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");
    
    $loc01.stageHeader = "On the way to Wakanda...";
    
    $loc01.NPC = scenario.GetScenarioChar("Punisher");
    
    $loc01.NPC.openingLine = `"Jones called me. Told me something strange was happening. What the hell is wrong with you all?"`;
    
    $loc01.winText = "[specialOutputGroup0 names] [[continues/continue]] on to Wakanda, with [winners names] in hot pursuit!";
    
    $loc01.stalemateText = "A stalemate! The battle continues in Wakanda!";
    
    const $loc1 = scenario.stageHandler.AddStage("loc1");
    
    
    // -- Must explicitly set here so that $loc01 is not set to nextStage for $loc0
    $loc0.nextStage = $loc1;
        
    $loc1.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");
    
    $loc1.stageHeader = "WAKANDA";
    
    $loc1.NPC = scenario.GetScenarioChar("Black Panther");
    
    $loc1.NPC.openingLine = `"So you have brought another one of your messes to my country's doorstep X-Men? I shall sort this out quickly for you. The allies of Wakanda are allies of mine."`;
    
    $loc1.winText = "[specialOutputGroup0 names] [[flees/flee]]! [winners names] give chase!";
    
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
}

function GetScenarioStage(stageHandler,id){
    
    const $stage = new cloneCrisisStage(stageHandler,id);
    
    const $sfw = $stage.stageFlowHandler;
    
    $sfw.AddPhase($stage._ResetNPCRecruitmentProperties);
    
    $sfw.AddPhase($stage._DeclareCardZone);

    $sfw.AddPhase($stage._StageHeaderOutput);

    $sfw.AddPhase($stage._NPCOpeningLineOutput);

    $sfw.AddPhase($stage._WarnIfDupeCharsOnSameTeam);

    $sfw.AddPhase($stage._SetEvalPool);

    $sfw.AddPhase($stage._VsOutput);

    $sfw.AddPhase($stage._RemoveDebuffedCharsFromPool);

    $sfw.AddPhase($stage._NPCRecruitedByClosestCharisma);
        
    //DEPRECATED -- PSYLOCKE ALREADY OP this._BetsyAndLoganAreScary);

    $sfw.AddPhase($stage._NPCRecruitOutput);
    
    $sfw.AddPhase($stage._DupedCharLosesToNumbers);

    $sfw.AddPhase($stage._LowestCunningConfusedUnlessAlone);

     $sfw.AddPhase($stage._LowestCunningCyclopsShield);

     $sfw.AddPhase($stage._LowestCunningConfusedOutput);
    
    $sfw.AddPhase($stage._GetHighestSpeedChar);

     $sfw.AddPhase($stage._HighestSpeedDebuffsGreatestPower);

     $sfw.AddPhase($stage._HighestSpeedDebuffOutput);

     $sfw.AddPhase($stage._AloneCharPowerTrumps);
    
    $sfw.AddPhase($stage._GetGreatestUnmatchedPowerChar);
    
    $sfw.AddPhase($stage._GetGreatestUnmatchedPowerCharEnemies);

     $sfw.AddPhase($stage._GreatestUnmatchedPowerCapturesLowestToughness);

     $sfw.AddPhase($stage._BishopIsImmune);

     $sfw.AddPhase($stage._GreatestPowerCaptureOutput);
    
     $sfw.AddPhase($stage._CaptureOutput);

     $sfw.AddPhase($stage._AutoSortWinnersAndLosers);

     $sfw.AddPhase($stage._SetSpecialOutputGroup0ToRemainingLosingChars);

     $sfw.AddPhase($stage._ValidateWinnersAndLosers);

     $sfw.AddPhase($stage._EndGameIfTeamAllCaptured);

     $sfw.AddPhase($stage._ResultDisplayText);
    
     $sfw.AddPhase($stage._TriggerStageFx);

     $sfw.AddPhase($stage._IncreaseXpForAllParticipatingChars);
     
    return $stage
}
    
export function initializeCloneCrisisEasyScenarioFx(scenario){
    
    const $punisherAltStageFx = scenario.AddScenarioFx(1,"stageSelect");
    
    const $loc0StageFx0 = scenario.stageHandler.stages[0].stageFxHandler.AddFx($punisherAltStageFx,"complete");
    
    $loc0StageFx0.AddRequiredCond(UndecidedNPCCond);
    
    $punisherAltStageFx.targetStage = scenario.stageHandler.stages[0];
    
    $punisherAltStageFx.newNextStage = scenario.stageHandler.stages[1];
    
}

function UndecidedNPCCond(evalObj){
    
    if(evalObj.hasOwnProperty("npc") && evalObj.npc.alignment == null) return true
}