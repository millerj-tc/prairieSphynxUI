import {cardZoneHandler} from "./cardZone.js";
import {stageHandler} from "./stageHandler.js";
import {character} from "./character.js";
import {card} from "./card.js";
import {GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./utils.js";


class scenarioFx
{
    constructor(scenario,reqdInc,type="wincon"){
        
        this.scenario = scenario;
        this.requiredIncrements = reqdInc;
        this.currentLeftIncrements = 0;
        this.currentRightIncrements = 0;
        this.completeEffectOutputText = "";
        this.targetStageOutputText = "";
        this.targetStage;
        this.newNextStage;
        this.targetChars;
        this.incrementingStage;
        this.winCardZone;
        this.winningChar;
        this.winTeam;
        this.fxType = type;
        
        if(type == "wincon") this.CompleteEffect = this.WinCon;
        if(type == "stageSelect") this.CompleteEffect = this.StageSelect;
        if(type == "debuff") this.CompleteEffect = this.StageDebuff;
        if(type == "teamHopeBuff") this.CompleteEffect = this.TeamHopeBuff;
        if(type == "finalWincon") this.CompleteEffect = this.WinCon;
        if(type == "moveToInteractivePhase") this.CompleteEffect = this.MoveToInteractivePhase;
        
    }
    
    SetWinCardZone(cardZone){
        
        this.winCardZone = cardZone;
    }
    
    SetIncrementingStage(stage){
        
        this.incrementingStage = stage;
    }
    
    Increment(team){
        
        if(team == "left") this.currentLeftIncrements++
        if(team == "right") this.currentRightIncrements++
        
        this._ProceedToCompleteEffect();
    }
    
    _ProceedToCompleteEffect(){
        
        
        if(this.currentLeftIncrements == this.requiredIncrements || this.currentRightIncrements == this.requiredIncrements) this.CompleteEffect()
        
        if(this.requiredIncrements == "relative" && this.incrementingStage == this.targetStage){ 
            //console.log(this);
            this.CompleteEffect();
        }
    }
    
    StageSelect(){
        

        
        if(this.targetStage == "undefined") console.error("Essential properties for scenarioFx have not been set!");
        
        this.targetStage.nextStage = this.newNextStage;
    }
    
    StageDebuff(){
        
        if(this.targetStage == "undefined") console.error("Essential properties for scenarioFx have not been set!");
        
        let $text = this.completeEffectOutputText;
        
        let $winningCharString
        
        if(this.currentLeftIncrements == this.requiredIncrements){
            $winningCharString = GetStringOfCharsFromArray(this.winCardZone.GetCharsHere(),"left",true);
            this.targetStage.rightDebuffCount++
        }
        if(this.currentRightIncrements == this.requiredIncrements){
            $winningCharString = GetStringOfCharsFromArray(this.winCardZone.GetCharsHere(),"right",true);
            this.targetStage.leftDebuffCount++
        }
        
        $winningCharString = 
        
        $text = this.completeEffectOutputText.replace("[names]",$winningCharString);
        
        this.PrintCompleteEffectOutput($text);
    }
    
    TeamHopeBuff(){
        
        let $text = this.completeEffectOutputText;
        
        if(this.currentLeftIncrements == this.requiredIncrements) this.targetChars = this.scenario.cardZoneHandler.GetAllCharsAtCardZones("left");
        
        if(this.currentRightIncrements == this.requiredIncrements) this.targetChars = this.scenario.cardZoneHandler.GetAllCharsAtCardZones("right");
        
        for(const char of this.targetChars){
            
            char.hope++
            //console.trace();
        }
        
        //console.log("HOPE TEXT " + this.winCardZone.id);
        
        this.PrintCompleteEffectOutput($text);
    }
    
    PrintCompleteEffectOutput(text,wincon=false){
        
        if((this.completeEffectOutputText != "")){

            
            if(wincon == true || !this.scenario.gameOver){
                
                this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput("<br><br>");
                
                this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
            } 
            //else if(wincon == true)this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
        }
    }
    
    WinCon(){
        
        if(this.scenario.gameOver) return
        
        let $text;
        
        this.scenario.gameOver = true;
        
        let $winningCharString
            
        if(this.currentLeftIncrements == this.requiredIncrements || this.currentRightIncrements == this.requiredIncrements){
            
            if(this.currentLeftIncrements == this.requiredIncrements) $winningCharString = this._TeamWins("left");
            if(this.currentRightIncrements == this.requiredIncrements) $winningCharString = this._TeamWins("right");
            
            this._PrepOutputText($winningCharString);
            
        }
        else if(this.requiredIncrements == "relative"){
            
            if(this.currentLeftIncrements > this.currentRightIncrements){
                $winningCharString = this._TeamWins("left");
                this._PrepOutputText($winningCharString);
            }
            else if(this.currentRightIncrements > this.currentLeftIncrements){
                $winningCharString = this._TeamWins("right");
                this._PrepOutputText($winningCharString);
            }
            else if(this.fxType == "finalWincon") this._LowestCumeTiebreaker();
        }
    }
    
    _PrepOutputText(winningCharString){
        
            let $text = this.completeEffectOutputText.replace("[names]",winningCharString);
            
            let $teamColor;
        
            if(this.winTeam == "left") $teamColor = "blue";
            if(this.winTeam == "right") $teamColor = "red";
        
            $text = `<b><span style="color:` + $teamColor + `">` + $text + "</span></b>";

            this.PrintCompleteEffectOutput($text,true);
    }
    
    _TeamWins(team){
        
        let $winningChars = this.scenario.cardZoneHandler.GetAllCharsAtCardZones();
            
            let $winningCharString;
        
            $winningCharString = GetStringOfCharsFromArray($winningChars,team,true);
        
            this.winTeam = team;
        
            return $winningCharString
    }
    
    _LowestCumeTiebreaker(){
        
        let $leftTeamCume = 0;
        
        let $rightTeamCume = 0 ;
        
        const $leftTeam = this.scenario.cardZoneHandler.GetAllCharsAtCardZones("left");
        
        for(const char of $leftTeam){
            
            $leftTeamCume += char.cume;
        }
        
        const $rightTeam = this.scenario.cardZoneHandler.GetAllCharsAtCardZones("right");
        
        for(const char of $rightTeam){
            
            $rightTeamCume += char.cume;
        }
        
        console.log($leftTeamCume);
        console.log($rightTeamCume);
        
        let $winningCharString
        
        if($leftTeamCume < $rightTeamCume) $winningCharString = this._TeamWins("left");
        else if($leftTeamCume > $rightTeamCume) $winningCharString = this._TeamWins("right");
        else this._TeamWins("error");
        
        this.completeEffectOutputText = "The world loves an underdog story! [names] have impressed the world with their chutzpah and are declared the winners of the Games!";
        
        this._PrepOutputText($winningCharString);
        
    }
}

export class scenario
{
    constructor(scenarioHandler,id){
        
        this.scenarioHandler = scenarioHandler;
        this.id = id;
        this.uiHandler = this.scenarioHandler.gameHandler.uiHandler;
        this.cardZoneHandler = new cardZoneHandler(this);
        this.stageHandler = new stageHandler(this);
        this.leftTeamHope = 0;
        this.rightTeamHope = 0;
        
        this.usesCardZoneAssignment = true;
        this.playingNoninteractiveStages = false;
        
        this.scenarioOver = false;
        
        this.fxs = [];
        
        this.scenarioCharInstances = [];
        this.savedLocCharSlots = [];
        
        this.runCount = 0;
        
    }
    
    ScenarioPrep(loadCharsFromLastScenarioRun = false){
        
        console.log("==" + " " + this.id);
        
        this.LoadAndResetScenarioCharacters();
        
        this.cardZoneHandler = new cardZoneHandler(this);
        
        this.initCardZones(this);
        
        
        
        //this.uiHandler.CreateCardZoneTable();
        
        this.stageHandler = new stageHandler(this);  

        this.initStages(this);
        
        this._ResetCurrentStage();
        
        this.initScenarioFx(this);
        
        this.initCardZoneMenu(this);
        
        //this.uiHandler.CreateCardZoneRows();
        
        this.CreateRosterDivButtons();
        
        this._LoadPreviousChoicesForCharSlotsOrRandomize();
        
        this.uiHandler.ExpandRosterDisplay();
        
        
    }
    
    CreateRosterDivButtons(){
        
        this.uiHandler.CreateScenarioRewindButton();
        
        this.uiHandler.CreateEvalGoButton();
        
        this.uiHandler._CreateCollapseButton();
        
        this.uiHandler.CreateLockButton();
        
        this.uiHandler.SetRosterCollapsibleCoords();
    }
    
    ScenarioRun(tournamentMode = false){
        
        this.scenarioOver = false;
        
        this.fxs = [];
        
        this._ResetCardZoneUnslottedChars();
        
        this.LoadAndResetScenarioCharacters();
        
        this._ResetCharacterObjectsInSlots();
        
        this.ClearThisScenarioOutput();
        
        this.SaveChoices();
        
        this._ResetCurrentStage();
        
        this.stageHandler.stages[0].stageFlowHandler.RunPhases(tournamentMode);
        
        this._HighlightChangedDivs();
        
        this._StoreCurrentOutput();
        
        this.runCount++;
    }
    
    SetScenarioWinningTeam(team){
        

        
        this.winningTeam = team;
    }
    
    _ResetCurrentStage(){
        
        this.stageHandler.currentStage = this.stageHandler.stages[0];
    }
    
    _ResetCardZoneUnslottedChars(){
        
        for(const loc of this.cardZoneHandler.cardZones){
            
            loc.unslottedChars = [];
        }
    }
    
    LoadAndResetScenarioCharacters(loadCharsFromLastScenarioRun){
        
        this.scenarioCharInstances = [];
        
        this.LoadScenarioCards(loadCharsFromLastScenarioRun);
        
    }
    
    _ResetCharacterObjectsInSlots(){
        
        for(const loc of this.cardZoneHandler.cardZones){
            
            for(const slot of loc.charSlots){
                
                const $freshChar = this.GetScenarioChar(slot.character.name);
                
                slot.UpdateChar($freshChar);
            }
        }
    }
    
    _LoadPreviousChoicesForCharSlotsOrRandomize(){
        
        this._LoadChoices();
        
        this.cardZoneHandler.RandomizeSlotsWithNoSaveData();
    }
    
    SaveChoices(){
        
        this.savedLocCharSlots = [];
        
        for(const loc of this.cardZoneHandler.cardZones){
        
            for(const slot of loc.charSlots){
                
                const $charXp = ((slot.character.xp.left + slot.character.xp.right)/2);
                
                this.savedLocCharSlots.push({characterName: slot.character.name,alignment: slot.character.alignment, cardZoneId: slot.cardZone.id, selectId: slot.selectId});
            }
                
        }
    }
    
    _LoadChoices(){
        
        for(const savedCharSlot of this.savedLocCharSlots){
            
            for(const loc of this.cardZoneHandler.cardZones){
                
                const $locObj = this.cardZoneHandler.GetCardZoneById(savedCharSlot.cardZoneId)
                
                if($locObj.id != loc.id) continue
                
                for(const charSlot of loc.charSlots){
                    
                    if(savedCharSlot.selectId == charSlot.selectId){
                        
                        let $charInst = this.GetScenarioChar(savedCharSlot.characterName);
                        
                        charSlot.UpdateChar($charInst);
                        
                        document.getElementById(savedCharSlot.selectId).value = savedCharSlot.characterName;
                    }
                }
            }
        }
    }

    LoadScenarioCards(fromPreviousScenario = false){
        
        let $sourceArr;
        
        let $returnArr = [];
        
        let $firstScen = true;
        
        if(this.previousScenario == null) {
            

            $sourceArr = this.scenarioHandler.gameHandler.database.data;
            
        }
        else {
            $firstScen = false;
            $sourceArr = this.previousScenario.scenarioCardInstances;
        }
        
        for(const c of $sourceArr){
            
            let $jsonData
            
            if($firstScen) $jsonData = JSON.stringify(c);
            else $jsonData = JSON.stringify(c.data);
            
            const $charDeepCopyData = JSON.parse($jsonData);
            
            let $scenChar;
            
            if(c.dataType == "char") $scenChar = new character(this)
            else $scenChar = new card(this);
            
            $scenChar.data = $charDeepCopyData;
            
            if($firstScen) $scenChar.AddGenericProperties();

            $returnArr.push($scenChar);
        }
        
        this.scenarioCharInstances = [];
        
        this.scenarioCharInstances = $returnArr;
        
    }
    
    GetAllCards(unlockedFor = ""){
        
        let $returnArr = [];
        
        for(const c of this.scenarioCharInstances){
            
            if(unlockedFor == "both" && (c.data.unlocked.includes("left") || char.unlocked.includes("right"))) $returnArr.push(c);
            else if(unlockedFor == "left" && c.data.unlocked.includes("left")) $returnArr.push(c);
            else if(unlockedFor == "right" && c.data.unlocked.includes("right")) $returnArr.push(c);
            else if(unlockedFor == "") $returnArr.push(c);
        }
        
        return $returnArr
    }
    
    GetScenarioCard(name,alignment="any"){
        
        
        //-- SNEAKY ERRORS MAY RESULT FROM BEING PASSED NULL NAME
        
        
        if(name == null) return false
        
        for(const card of this.scenarioCardInstances){
            
            if(card.data.name == name && alignment == "any") return card
            else if (card.data.name == name && card.data.alignment == alignment) return card
        }
        
        console.warn("GetScenarioCard failed for input: " + name);    
    }
    
    GetAllChars(unlockedFor = ""){
        
        let $returnArr = [];
        
        for(const card of this.scenarioCharInstances){
            
            if(card.dataType != "char") continue
            
            if(unlockedFor == "both" && (card.data.unlocked.includes("left") || char.unlocked.includes("right"))) $returnArr.push(card);
            else if(unlockedFor == "left" && card.data.unlocked.includes("left")) $returnArr.push(card);
            else if(unlockedFor == "right" && card.data.unlocked.includes("right")) $returnArr.push(card);
            else if(unlockedFor == "") $returnArr.push(card);
        }
        
        return $returnArr
    }
    
    _GetInterpersMessageString(fx,targetChars){
        
        let $returnString;
        
        $returnString = fx.effectText.replace("[targets]",GetStringOfCharsFromArray(targetChars,"any",true));
        
        $returnString = $returnString.replace("[owner]",GetStringOfCharsFromArray([fx.ownerCharacter],"any",true));
        
        $returnString = ReplaceWordsBasedOnPluralSubjects(targetChars,$returnString);
        
        return $returnString
    }
    
    ClearThisScenarioOutput(){
        
        for(const div of document.querySelectorAll(".outputDiv" + this.id)) div.remove()
    }
    
    _StoreCurrentOutput(){
        
        this.uiHandler.storedOutputDivs = [];
        
        const $divArr = document.querySelectorAll(".outputDiv" + this.id);
       
        
        for(const div of $divArr){
        
            this.uiHandler.storedOutputDivs.push(div.innerText);
        } 

    }
    
    _HighlightChangedDivs(){
                
        if(this.runCount < 1) return
        
        const $outputDivs = document.querySelectorAll(".outputDiv" + this.id);
        
        let $matches;
        
        for(const output of $outputDivs){
            
            $matches = 0;
            
            for(const oldOutput of this.uiHandler.storedOutputDivs){
                                
                if(output.innerText == oldOutput){
                    
                    $matches++;
                    
                }
            }

            if($matches > 0) output.style.backgroundColor = "";
            else output.style.backgroundColor = "yellow";
        }
    }
    
    GetAllScenarioFxThatTargetStage(stage,triggeredOnly=true){
        
        let $returnArr = [];
        
        for(const fx of this.fxs){
            
            if(fx.targetStage == stage){
                
                if(!triggeredOnly)$returnArr.push(fx)
                
                else if(fx.currentLeftIncrements == fx.requiredIncrements || fx.currentRightIncrements == fx.requiredIncrements) $returnArr.push(fx)
            } 
        }
        
        return $returnArr
    }
    
    AddScenarioFx(reqdInc,type){
        
        const $fx = new scenarioFx(this,reqdInc,type)
        this.fxs.push($fx);
        
        return $fx
    }
}