import * as scenarioMaintenance from "../scenarioPhases/scenarioMaintenance.js";
import {DupeConkLosers,RemoveDupeConkStatuses} from "../scenarioPhases/DupeConk.js";
import * as cardInfoPhaseUtils from "../scenarioPhases/cardInfoPhaseUtils.js";
import * as uiPhaseUtils from "../scenarioPhases/uiPhaseUtils.js";
import {scenarioProcessor} from "../scenarioFlow/scenarioProcessor.js";
import * as scenarioPrepUtils from "../scenarioFlow/genericScenarioPrep.js";

export function BuildDanceOfRiddlesScenario(){
    
    const gh = window.gameHandler;
    
    const DOR = gh.scenarioHandler.AddScenario("Dance of Riddles");
    
    DOR.AddPhase("Subsequent Reset", scenarioMaintenance.SubsequentRunReset);
    
    DOR.AddPhase("Insert submission cards", scenarioMaintenance.InsertSubmissionCardsIntoCardSlots);
    
    DOR.AddPhase("Set AI Username", _SetAIUsername)
    
    DOR.AddPhase("Announce other player", uiPhaseUtils.AnnounceOtherPlayer);
    
    DOR.AddPhase("Dupe conk", DupeConkLosers);
    
    DOR.AddPhase("Announce awkward dancers", _AnnounceAwkwardness);
    
    DOR.AddPhase("Get Winners",_GetDanceofRiddlesWinners);
    
    DOR.AddPhase("remove dc status", RemoveDupeConkStatuses);
    
    DOR.AddPhase("Dance Output",_DanceOfRiddlesOutput);
    
    DOR.AddPhase("Wait for PVP continnue", scenarioMaintenance.PauseAtEndOfScenarioForPvP,true);
    
    DOR.PrepFunc = DanceOfRiddlesPrep;
    
    console.warn("optimal DOR solution should have some effect -- unlock a holy fey? unlock the next scenario?");
    

}

function _SetAIUsername(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const mode = scenario.GetMode();
    
    if(mode == "story") scenarioMaintenance.SetPlayer1Username("The Holy Fey");
    
    if(mode == "pvp" && scenario.GetCurrentRunProcessor().contenders[1].playerUsername == "AI") scenarioMaintenance.SetPlayer1Username("Practice Player");
    
    
}

function _AnnounceAwkwardness(){
    
    const gh = window.gameHandler;
    
    let selectedCards = cardInfoPhaseUtils.GetSelectedCardsFor();
    
    selectedCards = selectedCards.filter(c => c.GetProp("dupeConk") != 1);
    
    const awkwards = [];
    
    for(const c of selectedCards){
        
        if(c.GetProp("speed") + c.GetProp("cunning") + c.GetProp("charisma") < 19){
            
            awkwards.push(c);
        }
    }
    
    uiPhaseUtils.OutputTextDivWithNounImages(`[arg0[]teamname] ~s0~stumbles/stumble~~ a bit here and there, waving ~s0~[p0[their]]/their~~ arms with self-doubt, confusion, and glaring boorishness (at least by Fey standards). The customary chants of the audience fall temporarily silent as mouths pause parted and brows furrow with concern. ~s0~[p0[they]]/they~~ ~s0~regains/regain~~ ~s0~[p0[their]]/their~~ flow and ~s0~struggles/struggle~~ gamely on.`,awkwards);
    
    gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    uiPhaseUtils.OutputTextDivWithNounImages(`The dance continues...`);
    
}

function _GetDanceofRiddlesWinners(){
    
    //highest average across team: speed, charisma, cunning) (Doran can whisper into people's ear for an additional +2)
    
    const gh = window.gameHandler;
    
    const playerId = gh.playerId;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    const contender0 = rp.contenders[0];
    
    const contender1 = rp.contenders[1];
    
    let playerCards = cardInfoPhaseUtils.GetSelectedCardsFor(contender0.playerId);
    
    let otherPlayerCards = cardInfoPhaseUtils.GetSelectedCardsFor(contender1.playerId);
    
    // don't count dupeconked cards
    
    playerCards = playerCards.filter(c => c.GetProp("dupeConk") != 1);
    
    otherPlayerCards = otherPlayerCards.filter(c => c.GetProp("dupeConk") != 1);
    
    console.log(playerCards);
    
    console.log(otherPlayerCards);
    
    //compute score
    
    let playerScore = 0;
        
    for(const char of playerCards){
        
        playerScore += (char.GetProp("speed") + char.GetProp("cunning") + char.GetProp("charisma"));
    }
    
    playerScore = playerScore/playerCards.length;
    
    let otherPlayerScore = 0;
    
    for(const char of otherPlayerCards){
        
        otherPlayerScore += (char.GetProp("speed") + char.GetProp("cunning") + char.GetProp("charisma"));
    }
    
    otherPlayerScore = otherPlayerScore/otherPlayerCards.length;
    
    if(playerScore > otherPlayerScore){
       
        contender0.wins++;
        contender1.defeats++;
        contender0.matches++;
        contender1.matches++;
        
        if(contender0.playerId == playerId) contender1.defeatedByPlayer = true;
        gh.scenarioHandler.GetCurrentScenario().SetCurrentRunProcessorProp("winnerArr",playerCards);
    }
    else if(otherPlayerScore > playerScore){
       
        contender1.wins++;
        contender0.defeats++;
        contender0.matches++;
        contender1.matches++;
        
        if(contender0.playerId == playerId) contender1.defeatedPlayer = true;
        gh.scenarioHandler.GetCurrentScenario().SetCurrentRunProcessorProp("winnerArr",otherPlayerCards);
    }
    else{
       
        contender0.ties++;
        contender1.ties++;
        contender0.matches++;
        contender1.matches++;
        
        if(contender0.playerId == playerId) contender1.tiedPlayer = true;
        gh.scenarioHandler.GetCurrentScenario().SetCurrentRunProcessorProp("winnerArr",playerCards.concat(otherPlayerCards));
    }
}

function _DanceOfRiddlesOutput(){
    
    let winnerArr = window.gameHandler.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessorProp("winnerArr");
    
    winnerArr = winnerArr.filter(c => c.GetProp("dupeConk") != 1);
    
    const artist = window.gameHandler.narrOutputArtist;
    
    artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    if(winnerArr.length > 4){
                
        uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]teamname] ~s0~gambols/gambol~~ vivaciously. For each step there is a counter-step. Every graceful inquiry is answered and matched until all the participants are exhausted. Nothing is decided.",winnerArr); 
        
        //arg0[]name] can't decide who to side with! ~s0~[p0[they]]/they~~ [p0[are]] sitting this one out."
    }
    else{
        
       uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]teamname] ~s0~wriggles/wriggle~~, ~s0~struts/strut~~, ~s0~flounces/flounce~~, and ~s0~prances/prance~~. ~s0~[p0[they]]/they~~ ~s0~dips/dip~~ and ~s0~spins/spin~~, ~s0~[p0[they]]/they~~ ~s0~bends/bend~~ and ~s0~twists/twist~~. ~s0~[p0[they]]/they~~ ~s0~poses/pose~~ questions with ~s0~[p0[their]]/their~~ ~s0~body/bodies~~, unanswerable enigmas of form and motion.",winnerArr); 
    }
    
    let consoleString = "";
    
    for(const char of winnerArr){
        
        consoleString += char.name + " ";
    }
    
    console.error(consoleString);
    
    
}

export function DanceOfRiddlesPrep(mode){
    
    if(mode == "story") {
        scenarioPrepUtils.GenericScenarioPrep("Dance of Riddles","story",3,2);
        
        const cardHandler = window.gameHandler.collectionCardHandler;
        
        const holyFey = cardHandler.GetCardByName("Holy Fey Upa","any",false);
    
        const holyFey2 = cardHandler.GetCardByName("Holy Fey Kupo","any",false);

        scenarioPrepUtils.SetCardForContenderSlot(holyFey,"AI",1,0);

        scenarioPrepUtils.SetCardForContenderSlot(holyFey2,"AI",1,1);
            
        uiPhaseUtils.OutputTextDivWithNounImages("[argN[Holy Fey Upa]] : Welcome to the Dance of Riddles. The fey dance most connivingly -- what of you?");
        
        window.gameHandler.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>")
        
    }
    
    if(mode == "pvp") scenarioPrepUtils.GenericScenarioPrep("Dance of Riddles","pvp",3,3);
    
    document.getElementById("runScenarioButton").innerText = "Dance dance dance";
    
    console.warn("what about framing text like the intro that shouldn't be cleared on subsequent runs?");
    
    // below is balance testing
    
//    const validChars = cardHandler.GetCards().filter(c => (c.unlockedForPlayer && c.owner == gh.playerId));
//    
//    const teamIterations = GenerateCombinations(validChars,playerCardSlots);
//    
//    let playerWins = 0;
//    
//    let otherPlayerWins = 0;
//    
//    let playerTies = 0;
//    
//    for(let i = 0; i < teamIterations.length; i++){
//        
//        for(const c of validChars){ //only reset for changing characters, not feys
//        
//            c.selectedForTeam = false;
//        }
//
//        const iterationArr = teamIterations[i];
//        
//        const slot0Name = iterationArr[0].name
//              
//        const slot1Name = iterationArr[1].name
//            
//        const slot2Name = iterationArr[2].name
//            
//        //const slot3Name = iterationArr[3].name
//        
//        console.log(`testing ${slot0Name} ${slot1Name} ${slot2Name}`)// ${slot3Name}`);
//        
//        const playerCard0 = cardHandler.GetCardByName(slot0Name,gh.playerId);
//        
//        const playerCard1 = cardHandler.GetCardByName(slot1Name,gh.playerId);
//        
//        const playerCard2 = cardHandler.GetCardByName(slot2Name,gh.playerId);
//        
//        //const playerCard3 = cardHandler.GetCardByName(slot3Name,gh.playerId);
//        
//        scenarioPrepUtils.SetCardForSlot(playerCard0,gh.playerId,0);
//        
//        scenarioPrepUtils.SetCardForSlot(playerCard1,gh.playerId,1);
//        
//        scenarioPrepUtils.SetCardForSlot(playerCard2,gh.playerId,2);
//        
//        //scenarioPrepUtils.SetCardForSlot(playerCard3,gh.playerId,3);
//        
//        scenario.BeginProcess();
//                
//        if(scenario.GetCurrentRunProcessorProp("winnerArr").filter(c => c.owner != gh.playerId).length == 0) playerWins++;
//        else if(scenario.GetCurrentRunProcessorProp("winnerArr").filter(c => c.owner != gh.otherPlayerId).length == 0) otherPlayerWins++;
//        else playerTies++;
//        
//    }
//    
//    console.log(`Player wins: ${playerWins}`);
//    console.log(`Other player wins: ${otherPlayerWins}`);
//    console.log(`Ties: ${playerTies}`);
    
}

//function _GetCardSlotsAndOtherPlayerUsernameForMode(mode){
//    
//    if(mode == "story"){
//        
//        return {playerCardSlots: 3, otherPlayerCardSlots:2, otherPlayerUsername:"AI"}
//    }
//    else if (mode == "pvp"){
//        
//        return {playerCardSlots: 3, otherPlayerCardSlots:3, otherPlayerUsername:"AI"}
//    }
//}

//function _GetTeamAndOutputForMode(mode,scenarioConfig){
//    
//    const cardHandler = window.gameHandler.collectionCardHandler;
//    
//    if(mode == "story"){
//        
//        const holyFey = cardHandler.GetCardByName("Holy Fey Upa","any",false);
//    
//        const holyFey2 = cardHandler.GetCardByName("Holy Fey Kupo","any",false);
//
//        scenarioPrepUtils.SetCardForSlot(holyFey,"AI",0);
//
//        scenarioPrepUtils.SetCardForSlot(holyFey2,"AI",1);
//            
//        uiPhaseUtils.OutputTextDivWithNounImages("[argN[Holy Fey Upa]] : Welcome to the Dance of Riddles. The fey dance most connivingly -- what of you?");
//        
//        window.gameHandler.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>")
//    }
//    else if(mode == "pvp"){
//        
//        scenarioPrepUtils.RandomizePlayerIdCardChoicesForScenario(scenarioConfig.otherPlayerUsername);
//    }
//}