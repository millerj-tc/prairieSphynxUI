import {cloneCrisisStage} from "./cloneCrisisStage.js";
import {ReplacePronouns,GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./../utils.js";

export class cloneCrisisNewGamePlusStage extends cloneCrisisStage
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
        
        this.EvalFlow = this.AltEvalFlow;
        
        this._CloneCrisisBattle = this._AltCloneCrisisBattle;
    }
        
    _CyclopsAndBishopEnergyAttack(evalObj){
        
        const $s = this.stage;
        
        for(const cyclops of this.stage.cardZone.GetCharsHere("Cyclops","any")){
            
            if(!cyclops.hasOwnProperty("alliedBishopEffectFire")) cyclops.alliedBishopEffectFire = false;
            
            const $alliedBishop = $s.cardZone.GetCharsHere("Bishop",cyclops.alignment);
            
            if($alliedBishop.length > 0 && evalObj.speedDebuffedChar != $alliedBishop && evalObj.speedDebuffedChar != cyclops && cyclops.alliedBishopEffectFire != true){
                
                const $highesetToughEnemyOfAllies = $s.cardZone.GetCharsHere("any", cyclops.GetEnemyAlignment(),true).sort(function(a,b){return b.toughness - a.toughness})[0];
                
                evalObj.pool = evalObj.pool.filter(c => c != $highesetToughEnemyOfAllies);
                
                const $cyclopsOp = GetStringOfCharsFromArray(cyclops,"any","S");
                
                const $bishopOp = GetStringOfCharsFromArray($alliedBishop,"any","S");
                
                const $highestToughnessEnemyOp = GetStringOfCharsFromArray($highesetToughEnemyOfAllies,"any","S");
                
                const $them = ReplacePronouns($highesetToughEnemyOfAllies,"[them]");

                $s.uiHandler.NewStageOutputDiv($cyclopsOp + " aims a devastating blast at " + $bishopOp + "-- who absorbs the energy! " + $bishopOp + " releases the energy at " + $highestToughnessEnemyOp + " knocking " + $them + " hundreds of yards back, plowing through the dirt!");
                
                cyclops.alliedBishopEffectFire = true
            }
        }
    }
    
    /// OKOYE SWITCH SIDES IF HER TEAM CAPTURE BLACK PANTHER
    
    _PenanceStare(evalObj){
        
        const $s = this.stage;
        
        
        for(const ghostR of evalObj.pool){
            
            if(ghostR.name != "Ghostrider") continue
            
            let $affectedChars = [];
            
            for(const char of this.stage.cardZone.GetCharsHere("any",ghostR.GetEnemyAlignment())){
                
                if(char.name == "Psylocke" || char.name == "Wolverine" || char.name == "Punisher") $affectedChars.push(char);
            }
            
            if($affectedChars.length > 0 && ghostR.penanceStared != true && !evalObj.undecidedChars.includes(ghostR)){
                
                ghostR.penanceStared = true;
                
                for(const target of $affectedChars){
                
                    evalObj.SkipPhaseForChar("_GetHighestSpeedChar",target);
                    
                    evalObj.SkipPhaseForChar("_GetGreatestUnmatchedPowerChar",target);
                    
                    evalObj.SkipPhaseForChar("_HighestSpeedDebuffsGreatestPower",target);
                    
                    evalObj.SkipPhaseForChar("_NimbleDodge",target);
                }
                
                const $ghostROp = GetStringOfCharsFromArray(ghostR,"any","S");
                
                const $targetsOp = GetStringOfCharsFromArray($affectedChars,"any","S");
                
                $s.uiHandler.NewStageOutputDiv("<i>" + $ghostROp + `</i>: "LOOK INTO MY EYES MORTALS! SEE YOUR SINS!! I'M GHOSTRIDER!!!" ` + $targetsOp + " can't look away! The Penance Stare burns!");
            }
        }
    }
    
    _NimbleDodge(evalObj){
        
        const $s = this.stage;
        
        for(const char of evalObj.pool){
            
            if(char.name != "Okoye" && char.name != "Punisher" && char.name != "Daredevil" && char.name != "Bishop") continue
            
            if(evalObj.undecidedChars.includes(char)) continue
            
            if(char.nimblyDodged > 1) continue
            
            const $filterBaitedChars = evalObj.pool.filter(c => c.baited != true);
            
            const $baitTarget = $filterBaitedChars.filter(c => c.alignment != char.alignment).sort(function(a,b){return b.power - a.power})[0];
    
            if($baitTarget == null) continue
            
            if(char.nimblyDodged == undefined) char.nimblyDodged = 1;
            
            else char.nimblyDodged++;
            
            $baitTarget.baited = true;
            
            if($baitTarget != null){
                
                evalObj.SkipPhaseForChar("_GetHighestSpeedChar",$baitTarget);
                
                evalObj.SkipPhaseForChar("_GetGreatestUnmatchedPowerChar",$baitTarget);
                
                evalObj.SkipPhaseForChar("_HighestSpeedDebuffsGreatestPower",$baitTarget);
             
                const $charOp = GetStringOfCharsFromArray(char,"any","S");
                
                const $baitTargetOp = GetStringOfCharsFromArray($baitTarget,"any","S");
                
                $s.uiHandler.NewStageOutputDiv($charOp + " baits in " + $baitTargetOp + " and then tumbles away!");
            }
        }
    }
        
    
    _SpeedDebuffedCharGetsEnraged(evalObj){
        
        if(evalObj.speedDebuffedChar == undefined) return
        
        evalObj.speedDebuffedChar.Enrage();
    }
    
    _SpeedDebuffEnrageOutput(evalObj){
        
        if(evalObj.speedDebuffedChar == undefined) return
        
        const $speedDebuffedCharOutput = GetStringOfCharsFromArray(evalObj.speedDebuffedChar,"any","S");
        
        this.stage.uiHandler.NewStageOutputDiv($speedDebuffedCharOutput + " bellows in rage!");
    }
    
    _EnragedCharStrikesBack(evalObj){
        
        if(evalObj.speedDebuffedChar == null) return
        
        if(evalObj.speedDebuffedChar.rage > 0){
            
            evalObj.enragedChar = evalObj.speedDebuffedChar;
            
            evalObj.speedDebuffedChar.Sooth();
            
            evalObj.rageSlammedChar = evalObj.speediestChar;
            
            evalObj.SkipPhaseForChar("_GetGreatestUnmatchedPowerChar",evalObj.rageSlammedChar);
            
            evalObj.speediestChar = null;
            
            evalObj.speedDebuffedChar = null;

        }
        
    }
    
    _EnragedCharStrikesBackOutput(evalObj){
        
        if(evalObj.enragedChar == undefined) return
        
        const $enragedCharOutput = GetStringOfCharsFromArray(evalObj.enragedChar,"any","S");
        
        const $slammedCharOutput = GetStringOfCharsFromArray(evalObj.rageSlammedChar,"any","S");
        
        const $they = ReplacePronouns(evalObj.enragedChar, " Like lightning, [they] snags ");
        
        const $them = ReplacePronouns(evalObj.rageSlammedChar, "[them]");
        
        this.stage.uiHandler.NewStageOutputDiv($enragedCharOutput + " has had enough!!" + $they + $slammedCharOutput + " by the ankle and slams " + $them + " into the ground!");
    }
    
    _UnlockedCharsSideWithNearestUntiedCharisma(evalObj){
        
        let $dupeRemovedPool = this._ReturnArrWithTeamDupedCharsRemoved(evalObj.pool);
        
        let $lockedCharsPool = [];
        
        evalObj.undecidedChars = [];
        
        for(const char of evalObj.pool){
            
            const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(char.name);
            
            // only evaluate chars that are duped across teams
            
            if($ogCharObj.unlocked.length == 0 && this._CharHasAcrossTeamsDupeMatch(char,evalObj)) $lockedCharsPool.push(char);
        }
        
        let $diffArr = [];
        
        for(const char of $lockedCharsPool){
            
            evalObj.stageLoopCharismaChar = null;
            
            evalObj.charismaStalemateChar = null;
            
            for(const otherChar of $dupeRemovedPool){
                
                let $charismaDiff = Math.abs(char.charisma - otherChar.charisma);
                
                if(char != otherChar) $diffArr.push({char:otherChar,diff:$charismaDiff});
            }
            
            if($diffArr.length > 0){
                
                let $penultimateCharming = null;
                
                if($diffArr.length > 1) $penultimateCharming = $diffArr.sort(function(a,b){return a.diff - b.diff})[1];
        
                let $mostCharming = $diffArr.sort(function(a,b){return a.diff - b.diff})[0];

                if($penultimateCharming != null && $penultimateCharming.diff == $mostCharming.diff && $penultimateCharming.char.charisma > $mostCharming.char.charisma) $mostCharming = $penultimateCharming
                
                else if($penultimateCharming.diff == $mostCharming.diff && $penultimateCharming.char.charisma == $mostCharming.char.charisma){
                    
                    if(char.alreadySpokenOnCharisma) continue
                    
                    
                    const $stalemateOutput = GetStringOfCharsFromArray(char,"any","S");
        
                    this.stage.uiHandler.NewStageOutputDiv($stalemateOutput + " can't decide who to believe!");
                    
                    if(evalObj.GetEvalObjChar(char.name,char.GetEnemyAlignment(),true) != false) {
                    
                        const $mirrorChar = evalObj.GetEvalObjChar(char.name,char.GetEnemyAlignment());

                        $mirrorChar.alreadySpokenOnCharisma = true;
                    
                        $mirrorChar.stageImmune = true;
                        
                        evalObj.undecidedChars.push(char);
                        
                        evalObj.undecidedChars.push($mirrorChar);
                    
                        
                    }
                            
                    continue
                }
            
                evalObj.stageLoopCharismaChar = $mostCharming.char;
                
                if($mostCharming.char.alignment == char.alignment){
                    
                    evalObj.convincedChar = char;
                    
                    const $mirrorChar = evalObj.GetEvalObjChar(char.name,char.GetEnemyAlignment());
                    
                    $mirrorChar.alreadySpokenOnCharisma = true;
                
                    this.stage._UnlockedCharsSideSelectOutput(evalObj);
                }
            
            }
        
        }
        
    }
    
    _UnlockedCharsSideSelectOutput(evalObj){
        
        if(evalObj.thisLoopCharismaChar == null) return
        
        //if(evalObj.convincedChar.scaredByPowerCouple) return
        
        const $convincedOutput = GetStringOfCharsFromArray(evalObj.convincedChar,"any","S");
        
        this.stage.uiHandler.NewStageOutputDiv($convincedOutput + " sides with team " + evalObj.convincedChar.alignment);
    }
    
    _EndGameIfTeamAllCapturedPlus(evalObj){
        
        if(this.stage.stageHandler.scenario.scenarioOver) return
        
        let $leftTeam = this.stage.cardZone.GetCharsHere("any","left");
        
        let $rightTeam = this.stage.cardZone.GetCharsHere("any","right");
        
        for(const char of $leftTeam){
            
            const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(char.name);
           
            //if there's a copy of the char on the right team and it was initially locked, remove from arr for this.stage eval
            if($rightTeam.filter(c => c.name == char.name).length > 0 && $ogCharObj.unlocked.length == 0) $leftTeam = $leftTeam.filter(c => c != char)
        }
        
        for(const char of $rightTeam){
            
            const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(char.name);
           
            //if there's a copy of the char on the right team and it was initially locked, remove from arr for this eval
            if($leftTeam.filter(c => c.name == char.name).length > 0 && $ogCharObj.unlocked.length == 0) {$rightTeam = $rightTeam.filter(c => c != char)}
        }
        
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
    
    _AlsoRemoveTeamDupedUnlockedCharIfMirrorIsCaptured(evalObj){
        
        if(evalObj.removedChar == null) return
        
        const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(evalObj.removedChar.name);
        
        const $mirrorChar = evalObj.GetEvalObjChar(evalObj.removedChar.name,evalObj.removedChar.GetEnemyAlignment(),true); 
           
        if($ogCharObj.unlocked.length == 0) {
            
            this.stage.cardZone.RemoveCharDuringRun($mirrorChar)
        }
    }
}