import * as scenarioMaintenance from "../scenarioPhases/scenarioMaintenance.js";
import {DupeConkLosers,RemoveDupeConkStatuses, DupeconkDupesOfCardWithPhaseNote} from "../scenarioPhases/DupeConk.js";
import * as cardInfoPhaseUtils from "../scenarioPhases/cardInfoPhaseUtils.js";
import * as uiPhaseUtils from "../scenarioPhases/uiPhaseUtils.js";
import {scenarioProcessor} from "../scenarioFlow/scenarioProcessor.js";
import * as scenarioPrepUtils from "../scenarioFlow/genericScenarioPrep.js";

//  - enemy: mystic cat



// Psychic Maelstrom Surfing Contest (if toughness + charisma >= 13, subract 1/3 speed from speed for  toughness - speed eval)

// //The Watch of Silence (best charater: toughness - speed) -- meditation (include this in a stage of the PvP so Yetelu is good) bonus if you have Doran + Pigimus

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

            artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
            
            const buffedAllies = cardInfoPhaseUtils.GetCardSelectedTeammates(rp.castLineBuffGiver);

            uiPhaseUtils.OutputTextDivWithNounImages(`[arg1[]teamname] ~s1~is/are~~ bolstered in their watchfulness by [arg0[]teamname].`, [rp.castLineBuffGiver],buffedAllies); 

            artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
        }
    }
    
    console.warn("remember to apply watch of silence buff!");
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