import {stage   } from "./../stage.js";
import {ReplacePronouns,GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./../utils.js";

export class cloneCrisisStage extends stage
{
    constructor(stageHandler,id){
        
        super(stageHandler,id);
        
        this.uiHandler = this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        
        this.evalValue = "";
        this.displayText = "";
        this.winText = "";
        this.debuffText = "";
        this.leftDebuffCount = 0;
        this.rightDebuffCount = 0;
        this.worstCharacterText = "[names] sucks at this";
        this.debug = false;
        this.evalDiv = document.createElement("div");
        this.NPC = null;
        this.tournamentMode = false;
    }
    
    _EndGameIfTeamAllCaptured(){
        
        if(this.stage.stageHandler.scenario.scenarioOver) return
        
        const $leftTeam = this.stage.cardZone.GetCharsHere("any","left");
        
        const $rightTeam = this.stage.cardZone.GetCharsHere("any","right");

        
        if($leftTeam.length == 0){
            
            this.stage.uiHandler.NewStageOutputDiv(`<span style="font-weight:bold;color:red;font-size:calc(15px + 1.5vw)">The right team has won!</span>`);
            this.stage.stageHandler.scenario.scenarioOver = true;
            this.stage.stageHandler.scenario.SetScenarioWinningTeam("right");
            this.stage.stageHandler.scenario.scenarioHandler.gameHandler.EndGame();

        }
        
        if($rightTeam.length == 0){
            
            this.stage.uiHandler.NewStageOutputDiv(`<span style="font-weight:bold;color:blue;font-size:calc(15px + 1.5vw)">The left team has won!</span>`);
            this.stage.stageHandler.scenario.scenarioOver = true;
            this.stage.stageHandler.scenario.SetScenarioWinningTeam("left");
            this.stage.stageHandler.scenario.scenarioHandler.gameHandler.EndGame();
        }
    }
    
    _NPCOpeningLineOutput(){
        
        if(this.stage.NPC == undefined) return
        
        const $npcPortrait = GetStringOfCharsFromArray(this.stage.NPC,"any","M",false);
        
        if(this.stage.NPC.openingLine != undefined) {
            
            const $newDiv = this.stage.uiHandler.NewStageOutputDiv("<i>" + $npcPortrait + "</i>: " + this.stage.NPC.openingLine);
            
            $newDiv.querySelector("img").style.float = "left";
//            console.log($newDiv.querySelector("img").naturalHeight);
//            $newDiv.style.height = String($newDiv.querySelector("img").naturalHeight + "px");
            $newDiv.querySelector("img").style.marginRight = "20px";
//            $newDiv.style.padding = "20px";
//            $newDiv.style.paddingLeft = String(($newDiv.querySelector("img").naturalWidth + 20) + "px");
            
        }
    }
    
    _VsOutput(evalObj){
        
        const $charsHere = this.stage.cardZone.GetCharsHere();
        
        const $leftString = GetStringOfCharsFromArray($charsHere,"left","S");
        
        const $rightString = GetStringOfCharsFromArray($charsHere,"right","S");
        
        this.stage.uiHandler.NewStageOutputDiv($leftString + " vs " + $rightString);
    }
    
    _NoninteractiveCloneCrisisBattle(evalObj){
    
        
        this.stage._NPCRecruitedAndUnlockedWithinTwoCharisma(evalObj);

    }
    
    _NPCRecruitedAndUnlockedWithinTwoCharisma(evalObj){
        
        if(this.stage.NPC == null) return
        
        evalObj.npc = this.stage.NPC;
        
        evalObj.charismaChar = null;
        
        let $leftRecruiters = [];
        
        let $rightRecruiters = [];
        
        for(const char of evalObj.pool){
            
            if(Math.abs(char.charisma - this.stage.NPC.charisma) <= 2){
                
                this.stage.stageHandler.scenario.scenarioHandler.gameHandler.database.GetObjFromString(this.stage.NPC.name).unlocked.push(char.alignment);
                
                if(char.alignment == "left") $leftRecruiters.push(char);
                
                if(char.alignment == "right") $rightRecruiters.push(char);

                
            }
        }
        
        const $recruitedString = GetStringOfCharsFromArray(this.stage.NPC, "any","S");
        
        const $leftRecruitersString = GetStringOfCharsFromArray($leftRecruiters,"any","S");
        
        const $rightRecruitersString = GetStringOfCharsFromArray($rightRecruiters,"any","S");

        this.stage.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $leftRecruitersString);
        
        this.stage.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $rightRecruitersString);
    }
    

    _NPCRecruitedByClosestCharisma(evalObj){
        
        if(this.stage.NPC == null) return
        
        evalObj.npc = this.stage.NPC;
        
        let $evalArr = [];
        
        let $diffArr = [];
        
        let $returnArr = [];
        
        for(const char of evalObj.pool){
            
            let $charismaDiff = Math.abs(char.charisma - this.stage.NPC.charisma);
            
            $evalArr.push({char: char,diff: $charismaDiff});
            
            $diffArr.push($charismaDiff);
        }

        
        let $matchDiff = Math.min(...$diffArr);

        
        for(const cpkg of $evalArr){
            
            if(cpkg.diff == $matchDiff) $returnArr.push(cpkg.char);
        }

        
        for(const char of $returnArr){
            
            for(const otherChar of $returnArr){
                
                if(char.name == otherChar.name && char != otherChar){
                    
                    $returnArr = $returnArr.filter(c => c != char);
                    $returnArr = $returnArr.filter(c => c != otherChar);
                }
            }
        }
        
        $returnArr.sort(function(a, b){return b.charisma - a.charisma})

        if($returnArr.length >= 1){
            
            evalObj.charismaChar = $returnArr[0];
            
            this.stage.NPC.alignment = $returnArr[0].alignment;
            
            evalObj.npc.alignment = $returnArr[0].alignment;
            
            this.stage.NPC.recruited = true;
            
            evalObj.pool.push(this.stage.NPC);
            
            this.stage.cardZone.AddUnslottedChar(this.stage.NPC);
        }
    }
    
    _BetsyAndLoganAreScary(evalObj){
        
        if(this.stage.NPC != undefined && this.stage.NPC.recruited && this.stage.NPC.name != "Venom"){
            
            let $matches = 0;
            
            let $psylockeAndWolverine = [];
            
            for(const char of this.stage.cardZone.GetCharsHere("any",this.stage.NPC.GetEnemyAlignment(),true)){
                
                if(char.name == "Wolverine" || char.name == "Psylocke"){
                    
                    $matches++;
                    
                    $psylockeAndWolverine.push(char);
                }
            }
            
            if($matches == 2){
                
                this.stage.NPC.recruited = false;
                
                this.stage.NPC.alignment = null;
                
                this.stage.NPC.scaredByPowerCouple = true;
                
                evalObj.pool = evalObj.pool.filter(c => c != this.stage.NPC);
                
                this.stage.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(this.stage.NPC,"any","S") + " was thinking about joining up with " + GetStringOfCharsFromArray(evalObj.charismaChar,"any","S") + " but " + GetStringOfCharsFromArray($psylockeAndWolverine,"any","S") + ReplacePronouns(this.stage.NPC," convince [them] to mind [their] own fucking business. They're pretty intimidating..."));
                
                if(this.stage.tournamentMode) console.log(this.stage.NPC.name + " scared by Betsy/Logan from joining with  " + evalObj.charismaChar.name);
                
                this.stage.cardZone.RemoveCharDuringRun(this.stage.NPC);
            }
        }
    }
    
    _ResetNPCRecruitmentProperties(){
        
        if(this.stage.NPC == null) return
        
        this.stage.NPC.alignment = null;
        this.stage.NPC.recruited = false;
    }
    
    _NPCRecruitOutput(evalObj){
        
        if(this.stage.NPC == null) return
        
        if(this.stage.NPC.recruited){
            
            this.stage.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(this.stage.NPC,"any","S") + " has decided to side with the " + this.stage.NPC.alignment + " team.");
            
            if(this.stage.tournamentMode) console.log(this.stage.NPC.name + " recruited by " + this.stage.NPC.alignment + " team because of " + evalObj.charismaChar.name);
        }
        else {
            
            this.stage.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(this.stage.NPC,"any","S") + " can't decide who to believe.");
        }
    }
    
    _LowestCunningConfusedUnlessAlone(evalObj){
        
        const $lowestCunningChar = evalObj.pool.sort(function(a, b){return a.cunning - b.cunning})[0];
        
        const $secondLowestCunningChar = evalObj.pool.sort(function(a, b){return a.cunning - b.cunning})[1];
        
        if($lowestCunningChar.name == $secondLowestCunningChar.name) return
        
        for(const char of evalObj.pool){
            
            if(this._CharLastTeammateAtLoc(char)) continue
            
            
            if(char == $lowestCunningChar){
                
                evalObj.SkipPhaseForChar("_GetGreatestUnmatchedPowerChar",$lowestCunningChar);
                
                evalObj.SkipPhaseForChar("_GetHighestSpeedChar",$lowestCunningChar);
                
                //evalObj.pool = evalObj.pool.filter(c => c != $lowestCunningChar);
                evalObj.confusedCharacter = char;
            }

        }
    }
    
    _LowestCunningCyclopsShield(evalObj){
        
        if(evalObj.confusedCharacter != null){
            
            const $confusedCharAllies = this.stage.cardZone.GetCharsHere("any",evalObj.confusedCharacter.alignment,true);
            
            for(const char of $confusedCharAllies){
                
                if(char.name == "Cyclops"){
                    
                    const $cyclops = this.stage.cardZone.GetCharsHere("Cyclops",evalObj.confusedCharacter.alignment,true);
                    
                    if(evalObj.confusedCharacter.name == "Cyclops"){
                        
                        this.stage.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray($cyclops,"any","S") + " is never out of sync with his team! He executes with perfect precision.");
                    }
                    else{
                        
                        this.stage.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray($cyclops,"any","S") + " explains the plan carefully to " + GetStringOfCharsFromArray(evalObj.confusedCharacter,"any","S") + ReplacePronouns(evalObj.confusedCharacter,", and [they] executes the plan better than usual!"));
                    }
                    
                    
                    evalObj.UnskipPhaseForChar("_GetGreatestUnmatchedPowerChar",evalObj.confusedCharacter);
                
                    evalObj.UnskipPhaseForChar("_GetHighestSpeedChar",evalObj.confusedCharacter);
                    
                    evalObj.confusedCharacter = null;
                    
                }
            }
        }
    }
    
    
    _LowestCunningConfusedOutput(evalObj){
        
        if(evalObj.confusedCharacter == null) return
        
        const $pronounedString = ReplacePronouns(evalObj.confusedCharacter," imperfectly executes [their] team plan, [they] is out of position!");
        
        if(evalObj.confusedCharacter != null) this.stage.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(evalObj.confusedCharacter,"any","S") + $pronounedString);
    }
    
    _GetHighestSpeedChar(evalObj){
        
        let $speedEvalPool = this._ReturnArrWithTeamDupedCharsRemoved(evalObj.pool);
        
        if($speedEvalPool.length == 0) return
        
        const $highestSpeedChar = $speedEvalPool.sort(function(a, b){return b.speed - a.speed})[0];
        
        evalObj.highestSpeedChar = $highestSpeedChar;
    }
    
    _HighestSpeedDebuffsGreatestPower(evalObj){
        
        if(evalObj.highestSpeedChar == null) return
        
        const $highestSpeedChar = evalObj.highestSpeedChar;
        
        let $enemyAlign = $highestSpeedChar.GetEnemyAlignment();
        
        let $enemyArr = evalObj.GetCharsFromPool($enemyAlign);
        
        $enemyArr = $enemyArr.filter(c => c.stageImmune == false);
        
        if($enemyArr.length < 1) return
        
        const $highestPowerEnemyOfSpeediestChar = $enemyArr.sort(function(a, b){return b.power - a.power})[0];
        
        if(this._CharLastTeammateAtLoc($highestPowerEnemyOfSpeediestChar)) return
        
        evalObj.SkipPhaseForChar("_GetGreatestUnmatchedPowerChar",$highestPowerEnemyOfSpeediestChar);
        
        //evalObj.pool = evalObj.pool.filter(c => c != $highestPowerEnemyOfSpeediestChar);
        
        evalObj.speedDebuffedChar = $highestPowerEnemyOfSpeediestChar;
        
        evalObj.speediestChar = $highestSpeedChar;
    }
    
    _HighestSpeedDebuffOutput(evalObj){
        
        if(evalObj.speedDebuffedChar != null){ 
            
            const $speediestCharOutput = GetStringOfCharsFromArray(evalObj.speediestChar,"any","S");
            const $speedDebuffedCharOutput = GetStringOfCharsFromArray(evalObj.speedDebuffedChar,"any","S");
            const $onTheirHeelsOutput = ReplacePronouns(evalObj.speedDebuffedChar, " on [their] heels!")
           this.stage.uiHandler.NewStageOutputDiv($speediestCharOutput + " attacks with blinding speed, knocking " + $speedDebuffedCharOutput + $onTheirHeelsOutput);
            
        }
    }
    
    _GetGreatestUnmatchedPowerChar(evalObj){
        
        if(evalObj.removedChar != null || evalObj.winners.length > 0) return
        
        let $greatestPowerEvalPool = this._ReturnArrWithTeamDupedCharsRemoved(evalObj.pool);
        
        if($greatestPowerEvalPool.length == 0){ 
            
            evalObj.stalemate = true;
            return
        }
        
        const $greatestPowerChar = $greatestPowerEvalPool.sort(function(a, b){return b.power - a.power})[0];
        
        evalObj.greatestPowerCharacter = $greatestPowerChar;
     }
    
    _GetGreatestUnmatchedPowerCharEnemies(evalObj){
        
        if(evalObj.greatestPowerCharacter == null) return
        
        const $greatestPowerChar = evalObj.greatestPowerCharacter;
        
        let $enemyAlign = $greatestPowerChar.GetEnemyAlignment();
        
        let $enemyArr = evalObj.GetCharsFromPool($enemyAlign);
    
        $enemyArr = $enemyArr.filter(c => c.stageImmune == false);
        
        evalObj.greatestPowerCharacterEnemyArr = $enemyArr;
        
    }
    
    _GreatestUnmatchedPowerCapturesLowestToughness(evalObj){
        
        if(evalObj.greatestPowerCharacter == null || evalObj.removedChar != null || evalObj.winners.length > 0 || evalObj.greatestPowerCharacterEnemyArr.length < 1) return
        
        const $enemyArr = evalObj.greatestPowerCharacterEnemyArr;
        
        const $greatestPowerChar = evalObj.greatestPowerCharacter;
        
        if($enemyArr.length < 1) return
        
        evalObj.winCredit = $greatestPowerChar;
        evalObj.winCreditOutput = $greatestPowerChar;
        
        const $lowestToughnessEnemyOfPowerfulestChar = $enemyArr.sort(function(a, b){return a.toughness - b.toughness})[0];
        
        
        this.stage.cardZone.RemoveCharDuringRun($lowestToughnessEnemyOfPowerfulestChar);
        
        
        evalObj.removedChar = $lowestToughnessEnemyOfPowerfulestChar;
        
    }
    
    _BishopIsImmune(evalObj){
        
        if(evalObj.removedChar != null && evalObj.removedChar.name == "Bishop" && (evalObj.winCredit.name == "Cyclops" || evalObj.winCredit.name == "Psylocke")){
            
            //evalObj.removedChar.stageImmune = true;
            
            //evalObj.winCredit.stageDisabled = true;
            
           
            evalObj.SkipPhaseForChar("_GetGreatestUnmatchedPowerCharEnemies",evalObj.removedChar);
            
            //evalObj.SkipPhaseForChar("_AloneCharPowerTrumps",evalObj.removedChar);
            
             evalObj.SkipPhaseForChar("_GetGreatestUnmatchedPowerChar",evalObj.winCredit);
            this.stage.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(evalObj.removedChar,"any","S") + " is immune to the energy attack from " + GetStringOfCharsFromArray(evalObj.winCredit,"any","S") + "!");
            
            evalObj.removedChar.removedDuringRun = false;
            
            evalObj.removedChar = null;
            

            
            this.stageFlowHandler.SkipToPhaseByFuncName(evalObj,"_GetGreatestUnmatchedPowerChar");
        }
        
    }
    
    _AloneCharPowerTrumps(evalObj){
        
        let $aloneChars = [];
        
        for(const char of evalObj.pool){
            
            if(this._CharLastTeammateAtLoc(char)) $aloneChars.push(char);
        }
        
        let $bigStrongEnemies;
        
        for(const aloneChar of $aloneChars){
            
             $bigStrongEnemies = [];
            
            for(const enemy of this.stage.cardZone.GetCharsHere("any",aloneChar.GetEnemyAlignment())){
                
                if(enemy.name == "Wolverine" ||
                  enemy.name == "Beast" ||
                  enemy.name == "Black Panther" ||
                  (enemy.name == "Psylocke" && aloneChar.name != "Bishop") ||
                  enemy.name == "Ghostrider" ||
                  enemy.name == "Jessica Jones" || 
                  enemy.name == "Colossus") {
                    
                    $bigStrongEnemies.push(enemy);
                }
            }
                   
            if($bigStrongEnemies.length > 1){

                evalObj.removedChar = aloneChar;
                evalObj.winCredit = $bigStrongEnemies[0];
                evalObj.winCreditOutput = $bigStrongEnemies;
                this.stage.cardZone.RemoveCharDuringRun(aloneChar);
            }
        }
    }
    
    _DupedCharLosesToNumbers(evalObj){ // -- THIS MAY FAIL IF SOMEHOW YOU CAN GET MULTIPLE CHARACTERS ALONE
        
        let $leftTeam = this.stage.cardZone.GetCharsHere("any","left",true);
        
        let $rightTeam = this.stage.cardZone.GetCharsHere("any","right",true);
        
        let $mirroredChars = 0;
        
        for(const char of $leftTeam){
            
            for(const otherChar of $rightTeam){
                
                if(char.name == otherChar.name){
                    
                    $mirroredChars++
//                    console.log("matching " + char.name + " and " + otherChar.name)
                
                } 
            }
        }
        
        let $removeTeam = [];
        
        if($leftTeam.length == $mirroredChars) $removeTeam = $leftTeam//;console.log("duped char loses to #s triggered")}
        if($rightTeam.length == $mirroredChars) $removeTeam = $rightTeam//;console.log("duped char loses to #s triggered")}
        
//        for(const char of $rightTeam) console.log(char.name);
        
        for(const char of $removeTeam){
            
            evalObj.removedChar = char;
            evalObj.winCredit = this.stage.cardZone.GetCharsHere(char.name,char.GetEnemyAlignment(),true)[0];
            evalObj.winCreditOutput = this.stage.cardZone.GetCharsHere("any",char.GetEnemyAlignment(),true);
            this.stage.cardZone.RemoveCharDuringRun(char);
            
//            console.log("_DupedCharLosesToNumbersTriggered at " + this.stage.cardZone.id + " " + this.id + " for " + char.name);
//            console.log("left team length: " + $leftTeam.length);
//            console.log("right team length: " + $rightTeam.length);
//            console.log(evalObj.winCredit);
        
            this.stageFlowHandler.SkipToPhaseByFuncName(evalObj,"_GreatestPowerCaptureOutput");
            
            break
        }
        
//        let $aloneChars = [];
//        
//        for(const char of evalObj.pool){
//            
//            if(this._CharLastTeammateAtLoc(char)) $aloneChars.push(char);
//        }
//        
//        if($aloneChars.length < 1) return
//        
//        let $aloneCharMirror = this.stage.cardZone.GetCharsHere($aloneChars[0].name,$aloneChars[0].GetEnemyAlignment());
//        
//        let $aloneCharEnemiesArr = this.stage.cardZone.GetCharsHere("any",$aloneChars[0].GetEnemyAlignment());
//        
//        let $aloneCharNonMirrorEnemiesArr = $aloneCharEnemiesArr.filter(c => c.name != $aloneChars[0].name);
        
        //$aloneCharEnemiesArr = $aloneCharEnemiesArr.filter(c => c.name != $aloneChars[0].name);
    }
    
    _GreatestPowerCaptureOutput(evalObj){
        
        if(evalObj.removedChar != null){
        

            
            const $winningAlignment = evalObj.removedChar.GetEnemyAlignment();

            let $powerSortedWinChars = this.stage.cardZone.GetCharsHere("any",$winningAlignment);

            
            $powerSortedWinChars.sort(function(a,b){return b.power - a.power});
            
            

           this.stage.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(evalObj.winCreditOutput,"any","S") + ReplaceWordsBasedOnPluralSubjects(evalObj.winCreditOutput," [[manages/manage]] to capture ") + GetStringOfCharsFromArray(evalObj.removedChar,"any","S") + "!");
        }
    }
        
    _CaptureOutput(evalObj){
        
        if(evalObj.removedChar != null && evalObj.removedChar.myCaptureOutputAlreadyHeard != true){
            
            const $removedCharOp = GetStringOfCharsFromArray(evalObj.removedChar,"any","S");
            
            this.stage.uiHandler.NewStageOutputDiv("<i>" + $removedCharOp + "</i>: " + evalObj.removedChar.captureText);
            
            this.stage.cardZone.GetCharsHere(evalObj.removedChar.name,evalObj.removedChar.GetEnemyAlignment(),true).myCaptureOutputAlreadyHeard = true;
        }
    }
    
    _SetSpecialOutputGroup0ToRemainingLosingChars(evalObj){
        
        evalObj.specialOutputGroup0 = evalObj.losers.filter(c => c != evalObj.removedChar);
        
        let $dupeCharCheckArr = [...evalObj.specialOutputGroup0];
        
        for(const char of $dupeCharCheckArr){
            
            const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(char.name); 
           
            if(this._CharHasAcrossTeamsDupeMatch(char,evalObj) && $ogCharObj.unlocked.length == 0) evalObj.specialOutputGroup0 = evalObj.specialOutputGroup0.filter(c => c != char)
        }
    }
    }