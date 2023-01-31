import {GetStringOfCharsFromArray} from "./utils.js";
import {GetCharsByAlignment,ReplaceWordsBasedOnPluralSubjects} from "./utils.js";
import {stageFxHandler} from "./stageFx.js";
import {stageFlowHandler} from "./stageFlowHandler.js";

export class stage
{
    constructor(stageHandler,id){
        
        this.stageHandler = stageHandler;
        this.stageFlowHandler = new stageFlowHandler(this);
        this.stageFxHandler = new stageFxHandler(this);
        this.uiHandler = this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        this.id = id;
        this.cardZone;
        this.nextStage;
        this.evalArr = [];
        this.firstRun = true;
        this.stageHeader = "";
        this.stalemateText = "";
        this.displayWintextAfterGameover = false;
        this.flowVar = 0;
        this.tournamentMode = false;
        
    }
    
    _StageHeaderOutput(){
        
        if(this.stage.stageHeader != ""){
            
            this.stage.uiHandler.NewStageOutputDiv(this.stage.stageHeader);
        }
    }
    
    _DisplayDebuffOutput(char){
        
        let $returnString = "";
        
        for(const fx of this.stage.stageHandler.scenario.GetAllScenarioFxThatTargetStage(this.stage,true)){
            
            let $replaceString = GetStringOfCharsFromArray([char],"any","S");
            
            $returnString = fx.targetStageOutputText.replace("[names]",$replaceString);
            
            $returnString = $returnString +  "<br><br>";
            
    
        }
        
        return $returnString
    }
    
    _RemoveDebuffedCharsFromPool(evalObj){
        
        let $returnArr = [];
        
        for(const obj of evalObj.pool){
            
            if(obj.IsDebuffed()) continue
            else $returnArr.push(obj)
        }
        
        evalObj.pool = $returnArr;
    }
    
    _SetEvalPool(evalObj){
        
        evalObj.pool = this.stage.cardZone.GetCharsHere();
    
        for(const char of evalObj.pool){
            
            char.stageImmune = false;
            
            char.stageDisabled = false;
        }
        
        evalObj.initialPool = evalObj.pool;
        
        let $tournamentString = "";
        
        for(const obj of evalObj.pool){
            
            if(obj.alignment == "left") $tournamentString += obj.name;
        }
        
        $tournamentString += " vs ";
        
        for(const obj of evalObj.pool){
            
            if(obj.alignment == "right") $tournamentString += obj.name;
        }
        
        if(this.stage.tournamentMode) console.log($tournamentString);
    }
    
    _RemoveCharsResultInMirror(chars,evalObj){
        
        // IN PROGRESS
        
        let $passedCharArr;
        
        if(chars.hasOwnProperty("dataType")) $passedCharArr = [chars]
        else $passedCharArr = chars
        
        //let $testArr = evalObj.pool.filter()
    }

    
    _DeclareCardZone(){
    
        
        if(this.stage.cardZone.displayName != "") this.stage.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput("- <i>" + this.stage.cardZone.displayName.toUpperCase() + "</i> -<br><br>" );
    }
    
    _WarnIfDupeCharsOnSameTeam(){
        
        let $allChars = this.stage.stageHandler.scenario.cardZoneHandler.GetAllCharsAtCardZones();
        
        const $ui = this.stage.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        
        for(const char0 of $allChars){
            
            for(const char1 of $allChars){
                
                if(char0.name == char1.name && char0.alignment == char1.alignment && char0 != char1) {
                    
                    $ui.UpdateOutput("<i><b>I am very sorry to inform you that " + char0.name + " cannot occupy two spaces on the same team... This simulation is invalid, please try again</i></b>");
                    
                    this.stage.stageHandler.scenario.scenarioOver = true;
                }
            }
            
        }
    }
    
    _TriggerStageFx(evalObj){
        
        for(const fx of this.stage.stageFxHandler.fxs){
            
            fx.TriggerFx(evalObj);

        }
    }
    
    _AutoSortWinnersAndLosers(evalObj){
        
        if(this._ReturnArrWithTeamDupedCharsRemoved(evalObj.pool).length == 0) evalObj.stalemate = true
        
        if(evalObj.stalemate) {return}
        
        evalObj.winners = this.stage.cardZone.GetCharsHere("any",evalObj.winCredit.alignment,true);
        evalObj.losers = this.stage.cardZone.GetCharsHere("any",evalObj.winCredit.GetEnemyAlignment(),true);
        
    }
    
    _ValidateWinnersAndLosers(evalObj){
        
        const $totalChars = this.stage.cardZone.GetCharsHere("any","any",true).length;
        
        // if(evalObj.winners.length + evalObj.losers.length != $totalChars) console.error("Invalid winners and losers arrays on eval obj!");
    }
    
    _ResultDisplayText(evalObj){
        
        if(this._CheckIfSkipResultDisplayText()) return //<<HELP
        
        const $ui = this.stage.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;

        
        if(evalObj.winners.length == 0){
            
            let $stalemateOutput;
            
            if(this.stage.stalemateText == "") $stalemateOutput = "No one was able to accomplish anything here this time!"
            else $stalemateOutput = this.stage.stalemateText;
            
            $ui.NewStageOutputDiv($stalemateOutput);
            
        }
        else{
            
            let $outputText = this.stage.winText.replace("[winners names]",GetStringOfCharsFromArray(evalObj.winners,"any","S"));
            
            $outputText = $outputText.replace("[losers names]",GetStringOfCharsFromArray(evalObj.losers,"any","S"));
            
            $outputText = $outputText.replace("[specialOutputGroup0 names]",GetStringOfCharsFromArray(evalObj.specialOutputGroup0,"any","S"));
            
            $outputText = ReplaceWordsBasedOnPluralSubjects(evalObj.specialOutputGroup0,$outputText);

            let $color;
            
            if(evalObj.winners[0].alignment == "left") $color = "blue"
            if(evalObj.winners[0].alignment == "right") $color = "red";
            
            let $span = document.createElement("span");
            $span.style.color = $color;
            $span.style.fontWeight = "bold";
            $span.style.fontSize = "calc(15px + 1.5vw)";
            $span.innerHTML = evalObj.winners[0].alignment;
            
            $outputText = $outputText.replace("[alignment]",$span.outerHTML);
        

            $ui.NewStageOutputDiv($outputText);

        } 
    }
    
    _IncreaseXpForAllParticipatingChars(evalObj){
        
        for(const char of evalObj.pool){
            
            if(char.dataType != "char") return
            
            const $charObj =  this.stage.stageHandler.scenario.GetScenarioChar(char.name);
            
            $charObj.xp[char.alignment]++;
            
            //console.log($charObj.name + " xp:" + $charObj.xp);
        }
        

    }
    
}