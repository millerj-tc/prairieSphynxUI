import * as scenarioMaintenance from "../scenarioPhases/scenarioMaintenance.js";
import {DupeConkLosers,RemoveDupeConkStatuses, DupeconkDupesOfCardWithPhaseNote} from "../scenarioPhases/DupeConk.js";
import * as cardInfoPhaseUtils from "../scenarioPhases/cardInfoPhaseUtils.js";
import * as uiPhaseUtils from "../scenarioPhases/uiPhaseUtils.js";
import {scenarioProcessor} from "../scenarioFlow/scenarioProcessor.js";
import * as scenarioPrepUtils from "../scenarioFlow/genericScenarioPrep.js";

//  - enemy: mystic cat


export function BuildWatchOfSilenceScenario(){
    
    const gh = window.gameHandler;
    
    const WOS = gh.scenarioHandler.AddScenario("Watch of Silence");
    
    WOS.AddPhase("Subsequent Reset", scenarioMaintenance.SubsequentRunReset);
    
    WOS.AddPhase("Insert submission cards", scenarioMaintenance.InsertSubmissionCardsIntoCardSlots);
    
    WOS.AddPhase("Set AI Username", _SetAIUsername)
    
    WOS.AddPhase("Announce other player", uiPhaseUtils.AnnounceOtherPlayer);
    
    WOS.AddPhase("Dupe conk", DupeConkLosers);
    
    //WOS.AddPhase("Announce awkward dancers", _AnnounceAwkwardness); --> clues
    
    WOS.AddPhase("Cast Line Into Nothingness Evaluation",_CastTheLineIntoNothingnessEvaluate);
    
    WOS.AddPhase("Cast Line Into Nothingness Output", _CastTheLineIntoNothingnessOutput);
    
    WOS.AddPhase("Maelstrom Eval", _MaelstromSurfingEvaluation);
    
    WOS.AddPhase("Maelstrom OP", _MaelstromSurfingOutput);
    
    WOS.AddPhase("Watch of Silence Eval", _WatchOfSilenceEval);
    
    WOS.AddPhase("Watch OP",_WatchOfSilenceOutput);
    
    WOS.AddPhase("remove dc status", RemoveDupeConkStatuses);
    
    //WOS.AddPhase("Dance Output",_DanceOfRiddlesOutput); --> output
    
    WOS.AddPhase("Wait for PVP continnue", scenarioMaintenance.PauseAtEndOfScenarioForPvP,true);
    

}

function _SetAIUsername(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const mode = scenario.GetMode();
    
    if(mode == "story") scenarioMaintenance.SetPlayer1Username("The Pumian Observer");
    
    if(mode == "pvp" && scenario.GetCurrentRunProcessor().contenders[1].playerUsername == "AI") scenarioMaintenance.SetPlayer1Username("Practice Player");
    
    
}

function _CastTheLineIntoNothingnessEvaluate(){
    
    // Casting the Line into Nothingness (lowest cunning char de-dupeConks a dupeConk and gives +2 toughness for Watch of Silence -- must be untied)
    
    const gh = window.gameHandler;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    const leftCards = cardInfoPhaseUtils.GetSelectedForContenderWithDupeconkStatus(0);
    
    const rightCards = cardInfoPhaseUtils.GetSelectedForContenderWithDupeconkStatus(1);
    
    let allCards = leftCards.concat(rightCards);
    
    allCards = cardInfoPhaseUtils.SortCharArrByProp(allCards,"cunning",false);
    
    console.log("sorted by cunning:");
    console.log(allCards);

    // only continue if lowest is untied

    if(allCards[0].GetProp("cunning") == allCards[1].GetProp("cunning")) return
    
    // otherwise apply bonuses
    
    const untiedLowestCunning = allCards[0];
    
    rp.castLineBuffGiver = untiedLowestCunning;
    
    console.log(`lowest untied cunning ${untiedLowestCunning.name} (${untiedLowestCunning.owner})`);
    
    const untiedLowestCunningContenderNum = cardInfoPhaseUtils.GetCardContenderNum(untiedLowestCunning);

    const dupeConkedAllies = cardInfoPhaseUtils.GetSelectedForContenderWithDupeconkStatus(untiedLowestCunningContenderNum,true);
    
    console.log("dupeconked allies are:");
    console.log(dupeConkedAllies);
    
    const sortedDupeConkedAllies = cardInfoPhaseUtils.SortCharArrByProp(dupeConkedAllies,"cunning");
    
    console.log("sorted:");
    console.log(sortedDupeConkedAllies);
    
    // undupeconk highest cunning ally who is dupeconked (and dupeconk the duplicate on other team)
    
    for(const c of sortedDupeConkedAllies){
        
        c.SetProp("dupeConk",0,"Cast Line Into Nothingness Buff");
        
        DupeconkDupesOfCardWithPhaseNote(c, "Cast Line Into Nothingnes Debuff");
        
        rp.castLineBuffReceiver = c;
        
        console.log("buff:");
        console.log(c);
        
        
        
        break
    }
    
   rp.contenders[untiedLowestCunningContenderNum].watchOfSilenceBuff = true;
    
    console.log(rp.contenders[untiedLowestCunningContenderNum]);    
}

function _CastTheLineIntoNothingnessOutput(){
    
    const gh = window.gameHandler;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    const artist = window.gameHandler.narrOutputArtist;
    
    if(rp.castLineBuffReceiver != null){
    
        artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
        
        uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]name] is inspired by the reach of [arg1[]name]'s self. [p0[they]] reconsider and side with [arg0[]name]'s team.",[rp.castLineBuffReceiver], [rp.castLineBuffGiver]); 
        
        artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    }
    
    for(const c of rp.contenders){
        
        if(c.watchOfSilenceBuff){
            
            const buffedAllies = cardInfoPhaseUtils.GetCardSelectedTeammates(rp.castLineBuffGiver);
            
            if(buffedAllies.length == 0) break

            artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");

            uiPhaseUtils.OutputTextDivWithNounImages(`[arg1[]teamname] ~s1~is/are~~ bolstered in their watchfulness by [arg0[]teamname].`, [rp.castLineBuffGiver],buffedAllies); 

            artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
        }
    }
    
    console.warn("remember to apply watch of silence buff!");
    }

function _MaelstromSurfingEvaluation(){
    
    // Psychic Maelstrom Surfing Contest (if toughness + charisma >= 13, subract 1/3 speed from speed for  toughness - speed eval)

    
    const gh = window.gameHandler;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    const leftCards = cardInfoPhaseUtils.GetSelectedForContenderWithDupeconkStatus(0);
    
    const rightCards = cardInfoPhaseUtils.GetSelectedForContenderWithDupeconkStatus(1);
    
    let allCards = leftCards.concat(rightCards);
    
    const surfers = [];
    
    for(const c of allCards){
        
        if(c.GetProp("toughness") + c.GetProp("charisma") >= 13){
            
            const charContenderNum = cardInfoPhaseUtils.GetCardContenderNum(c);
            
            rp.contenders[charContenderNum].maelstromBuff = true;
            
            surfers.push(c);
        }
    }
    
    rp.surfers = surfers;
}

function _MaelstromSurfingOutput(){
    
    const gh = window.gameHandler;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    const artist = window.gameHandler.narrOutputArtist;
    
    artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    uiPhaseUtils.OutputTextDivWithNounImages(`As the Watch proceeds, the participants are awed by a sudden psychic maelstrom! They must quickly reach within and recover the means by which to ride the waves of the collective subconscious!`);
    
    if(rp.surfers.length > 0){
        
        artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
        
        console.log(rp.surfers);
            
        uiPhaseUtils.OutputTextDivWithNounImages(`[arg0[]teamname] ~s0~demonstrates/demonstrate~~ inpsired astrally projected boogie-boarding moves as ~s0~[p[they]]/they~~ cut through the maelstrom and proceed into the final stage of the Watch of Silence.`, rp.surfers);
    }
    
    artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
}

function _WatchOfSilenceEval(){
    
    // //The Watch of Silence (best charater: toughness - speed) -- meditation (include this in a stage of the PvP so Yetelu is good) bonus if you have Doran + Pigimus
    
    const gh = window.gameHandler;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    const leftCards = cardInfoPhaseUtils.GetSelectedForContenderWithDupeconkStatus(0);
    
    const rightCards = cardInfoPhaseUtils.GetSelectedForContenderWithDupeconkStatus(1);
    
    let leftScore = 0;
    
    let rightScore = 0;
    
    for(const c of leftCards){
        
        const cardScore = c.GetProp("toughness") + c.GetProp("speed");
        
        if(cardScore > leftScore) leftScore = cardScore;
    }
    
    for(const c of rightCards){
        
        const cardScore = c.GetProp("toughness") + c.GetProp("speed");
        
        if(cardScore > rightScore) rightScore = cardScore;
    }
    
    for(const surfer of rp.surfers){
        
        if(cardInfoPhaseUtils.GetCardContenderNum(surfer) == 0){
            
            leftScore += surfer.GetProp("speed")/3;
        }
        
        if(cardInfoPhaseUtils.GetCardContenderNum(surfer) == 1){
            
            rightScore += surfer.GetProp("speed")/3;
        }
    }
    
    if(cardInfoPhaseUtils.CharArrIncludesCharByName(leftCards,"Doran") && cardInfoPhaseUtils.CharArrIncludesCharByName(leftCards,"Pigimus")) leftScore += 2;
    
    if(cardInfoPhaseUtils.CharArrIncludesCharByName(rightCards,"Doran") && cardInfoPhaseUtils.CharArrIncludesCharByName(rightCards,"Pigimus")) rightScore +=2;
    
    if(rp.contenders[0].watchOfSilenceBuff) leftScore += 2;
    if(rp.contenders[1].watchOfSilenceBuff) rightScore +=2;
    
    console.log(`leftscore is ${leftScore}, rightscore is ${rightScore}`);
    
    if(leftScore > rightScore) rp.wosWinners = leftCards;
    else if(rightScore > leftScore) rp.wosWinners = rightCards;
    else rp.wosWinners = leftCards.concat(rightCards);
}

function _WatchOfSilenceOutput(){
    
    const gh = window.gameHandler;
    
    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const rp = scenario.GetCurrentRunProcessor();
    
    const artist = window.gameHandler.narrOutputArtist;
    
    const mode = scenario.GetMode();
    
    artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    uiPhaseUtils.OutputTextDivWithNounImages(`The Watch goes on and on, testing patience, calmitude, and bladders in equal measure. All are stretched beyond what they have endured before.`);
    
    artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    console.warn("dorna and pigimus buff output");  
    
    uiPhaseUtils.OutputTextDivWithNounImages(`Finally, it's over and [arg0[]teamname] emerge from their meditations stronger and clearer than before.`,rp.wosWinners);
    
    if(mode == "story" && !cardInfoPhaseUtils.CharArrIncludesCharByName(rp.wosWinners,"Aether Cat")){
        
        artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
        uiPhaseUtils.OutputTextDivWithNounImages(`[argN[Aether Cat]] : You have impressed me mightily, young ones. That psychic maelstrom was intense. Go in peace and calmitude.`);
    }
    else if(mode == "story" && cardInfoPhaseUtils.CharArrIncludesCharByName(rp.wosWinners,"Aether Cat")){
        
        artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
        uiPhaseUtils.OutputTextDivWithNounImages(`[argN[Aether Cat]] : You were not expecting such an intersection of nothingness and everythingness, were you? Perhaps this is not the right group to perform the Watch together...`);
    }
}


export function WatchOfSilencePrep(mode){
    
    if(mode == "story") {
        scenarioPrepUtils.GenericScenarioPrep("Watch of Silence","story",3,1);
        
        const cardHandler = window.gameHandler.collectionCardHandler;
        
        const aetherCat = cardHandler.GetCardByName("Aether Cat","any",false);
        scenarioPrepUtils.SetCardForContenderSlot(aetherCat,"AI",1,0);
            
        uiPhaseUtils.OutputTextDivWithNounImages("[argN[Aether Cat]] : Interesting -- you wish to essay the Watch of Silence? It is more and less than you think.");
        
        window.gameHandler.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>")
        
    }
    
    if(mode == "pvp") scenarioPrepUtils.GenericScenarioPrep("Watch of Silence","pvp",3,3);
    
    document.getElementById("runScenarioButton").innerText = "Become stillness";
    
}