import {stage} from "./stage.js";

export class gag100Stage extends stage
{
    constructor(stageHandler){
        
        super(stageHandler);
    }
    
    _DisplayWorstCharText(worstChars){
        
        //console.log(worstChar);
        
        let $string;
        
        const $ui = this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        
        //console.log(this.stageHandler.scenario.scenarioOver);
        
        if(this.stageHandler.scenario.scenarioOver == false && worstChars.length > 0){
            
            $string = "<br><br>" + this.worstCharacterText.replace("[names]",GetStringOfCharsFromArray(worstChars,"any",true));
            $string = ReplaceWordsBasedOnPluralSubjects(worstChars,$string);
            $ui.UpdateOutput($string);
        }
    }
    
    _ReturnDisplayText(winners){
        
        const $ui = this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        
        //console.log(winners);
        
        if(winners.length == 0){
            
            $ui.UpdateOutput("No one was able to accomplish anything here this time!");
            
        }
        else{
            
            let $outputText = this.winText.replace("[names]",GetStringOfCharsFromArray(winners,"any",true));

            let $color;
            
            if(winners[0].alignment == "left") $color = "blue"
            if(winners[0].alignment == "right") $color = "red";
            
            let $span = document.createElement("span");
            $span.style.color = $color;
            $span.style.fontWeight = "bold";
            $span.style.fontSize = "calc(15px + 1.5vw)";
            $span.innerHTML = winners[0].alignment;
            
            $outputText = $outputText.replace("[alignment]",$span.outerHTML);
            
            //console.log("STAGE TEXT " + this.id);

            $ui.UpdateOutput($outputText);

            this._TriggerStageFx(winners[0].alignment);
        }
        
        //return 
    }
    
    _WarnIfDupeCharsOnSameTeam(){
        
        let $allChars = this.stageHandler.scenario.cardZoneHandler.GetAllCharsAtCardZones();
        
        const $ui = this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        
        for(const char0 of $allChars){
            
            for(const char1 of $allChars){
                
                if(char0.name == char1.name && char0.alignment == char1.alignment && char0 != char1) {
                    
                    $ui.ClearOutput();
                    
                    $ui.UpdateOutput("<i><b>I am very sorry to inform you that " + char0.name + " cannot occupy two spaces on the same team... This simulation is invalid, please try again</i></b>");
                    
                    this.stageHandler.scenario.scenarioOver = true;
                }
            }
            
        }
    }
    
    _RemoveDuplicateChars(){
        
        let $allChars = this.stageHandler.scenario.cardZoneHandler.GetAllCharsAtCardZones();
        
        for(const char of $allChars){
            
            //if(char.hope != 0) console.log(char.name + " (" + char.alignment + "): " + char.hope);
        }
        
        let $returnArr = [];
        
        const $ui = this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        
        const $scenHand = this.stageHandler.scenario;
        
        let $dupesFound = [];
        
        for(const char0 of $allChars){
            
            let $dupeMatches = 0;
            
            for(const char1 of $allChars){
                
                if(char0.name == char1.name && char0 != char1){
                    
                    $dupeMatches++;
                    
                    //-- skip the rest if this is not relevant to the current cardZone
                   
                    if(char0.cardZone != this.cardZone && char1.cardZone != this.cardZone) continue
                    
                    //if(char0.alignment == char1.alignment) 
                    //else {
                        
                        
                        let $dupePrinted = false;
                        
                        for(const dupe of $dupesFound){
                            
                            if(dupe.name == char0.name) $dupePrinted = true;
                        }
                        
                        $dupesFound.push(char0);
                
                        if((char0.hope > char1.hope) && !$dupePrinted){
                            
                            if(char0.lastWonHope != true){
                                $ui.UpdateOutput(GetStringOfCharsFromArray([char0],"any",true) + " has decided to side with team " + char0.alignment + ".<br><br>");
                                char0.lastWonHope = true;
                            }
                            
                            if(char0.cardZone == this.cardZone) $returnArr.push(char0);
                        }
                         else if((char0.hope < char1.hope) && !$dupePrinted){
                        
                            
                            if(char1.lastWonHope != true){
                                
                                $ui.UpdateOutput(GetStringOfCharsFromArray([char1],"any",true)+ " has decided to side with team " + char1.alignment + ".<br><br>");
                                char1.lastWonHope = true;
                            }
                            
                             
                             if(char1.cardZone == this.cardZone) $returnArr.push(char1);
                         }
                    
                        else if(!$dupePrinted) $ui.UpdateOutput(GetStringOfCharsFromArray([char0],"any",true) + " cannot decide between teams. They are sitting this one out.<br><br>");
                        }
                    //}
                }
            
                
            if($dupeMatches == 0 && char0.cardZone == this.cardZone) $returnArr.push(char0);
        }
            
        return $returnArr
    }
    
    _DeclareCardZone(){
        
        this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput("- <i>" + this.cardZone.displayName.toUpperCase() + "</i> -<br><br>" );
    }
    
    _TriggerStageFx(team){
        
        for(const fx of this.stageFxHandler.fxs){
            
            fx.IncrementTarget(team);
            //console.log(fx);
        }
    }
    
    _DisplayDebuffOutput(char){
        
        let $returnString = "";
        
        for(const fx of this.stageHandler.scenario.GetAllScenarioFxThatTargetStage(this,true)){
            
            let $replaceString = GetStringOfCharsFromArray([char],"any",true);
            
            //console.log($replaceString);
            
            $returnString = fx.targetStageOutputText.replace("[names]",$replaceString);
            
            $returnString = $returnString +  "<br><br>";
            
            //console.log($returnString);
    
        }
        
        return $returnString
    }
    
    _RemoveDebuffedChars(pool){
        
        let $returnArr = [];
        
        for(const obj of pool){
            
            if(obj.IsDebuffed()) continue
            else $returnArr.push(obj)
        }
        
        return $returnArr
    }
    
    _HighestValueWin(){
        
        if(this.debug) console.warn("===");
        
        //console.table(this.stageHandler.scenario.cardZoneHandler.GetAllCharsAtCardZones());
        
        this._DeclareCardZone();
        
        let $leftSiders = [];
        let $rightSiders = [];
        
        let $winners = [];
        
        const $ui = this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;        
        
        let $pool = this.cardZone.GetCharsHere();
        
        this._WarnIfDupeCharsOnSameTeam();
        
        if(this.stageHandler.scenario.scenarioOver) return
        
        $pool = this._RemoveDuplicateChars($pool);
        
        if(this.debug) console.log($pool);
        
        // -- EVALUATE HOPE, DEBUFF IF NO ONE WINS AND HAVE MATHCING
        
        $pool = this._RemoveDebuffedChars($pool);
        
        const $evalValue = this.evalValue;
        
        $leftSiders = GetCharsByAlignment($pool,"left");
        
        $rightSiders = GetCharsByAlignment($pool,"right"); 
        
        $leftSiders.sort(function(a, b){return b[$evalValue] - a[$evalValue]});
        $rightSiders.sort(function(a, b){return b[$evalValue] - a[$evalValue]});
        
        if(this.debug) console.log($leftSiders);
        if(this.debug) console.log($rightSiders);
        
        //--Remove 1 char from evaluation per debuff
        
        if($leftSiders.length != 0){
            
             for(let i = 0; i < this.leftDebuffCount; i++) {
                 
                 this.leftDebuffCount--;
                 
                 $ui.UpdateOutput(this._DisplayDebuffOutput($leftSiders.shift()))
             }
        }
        
       if($rightSiders.length != 0){
           
            for(let i = 0; i < this.rightDebuffCount; i++){
           
                this.rightDebuffCount--;
                $ui.UpdateOutput(this._DisplayDebuffOutput($rightSiders.shift()))
            }

       }
        
        if(this.debug) console.log($leftSiders);
        if(this.debug) console.log($rightSiders);
        
        let $worstCharPool = $leftSiders.concat($rightSiders);
        
        //$worstCharPool.sort(function(a, b){return b[$evalValue] - a[$evalValue]});
        
        let $worstChars = this.stageHandler.scenario.scenarioHandler.gameHandler.database.GetCharsMoreThanOneStdBelowMeanForValue($evalValue,$worstCharPool);
        
        //console.log($worstChars);
        
        //$worstChars = $worstChars.filter(char => char.cardZone == this.cardZone);
        
        for(let i = 0; i < 50; i++){
            
            if($leftSiders.length == 0 && $rightSiders.length == 0) break
            if($leftSiders.length == 0) {$winners.push($rightSiders[0]);break}
            if($rightSiders.length == 0) {$winners.push($leftSiders[0]);break}
            
            if($winners.length > 0 || (i > $leftSiders.length - 1 && i > $rightSiders.length - 1)) break
            
            if($leftSiders[i][this.evalValue] > $rightSiders[i][this.evalValue] || $rightSiders[i] == undefined){
                
                $winners.push($leftSiders[i]);
                
                for(const obj of $leftSiders){
                    
                    if(obj[this.evalValue] == $leftSiders[i][this.evalValue] && obj != $leftSiders[i]) $winners.push(obj)
                }
                
                break
            }
            
            if($rightSiders[i][this.evalValue] > $leftSiders[i][this.evalValue] || $leftSiders[i] == undefined){
                
                $winners.push($rightSiders[i]);
                
                for(const obj of $rightSiders){
                    
                    if(obj[this.evalValue] == $rightSiders[i][this.evalValue] && obj != $rightSiders[i]) $winners.push(obj)
                }
                
                break
            }
        }
        
        if(this.debug) console.log($winners);
        
        for(const char0 of $winners){
            
           $worstChars = $worstChars.filter(char1 => char1.name != char0.name);
        }
        
        this._ReturnDisplayText($winners);
        
        this._DisplayWorstCharText($worstChars);
        
        this.stageHandler.GotoNextStage(this.nextStage);
    }
}
}