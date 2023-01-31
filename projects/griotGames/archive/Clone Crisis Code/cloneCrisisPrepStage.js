import {cloneCrisisStage} from "./cloneCrisisStage.js";
import {ReplacePronouns,GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./../utils.js";

export class cloneCrisisPrepStage extends cloneCrisisStage
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
    }
    
    _NoninteractiveCloneCrisisBattle(evalObj){
    
        


    }
    
    _MultipleNPCOpeningLineOutput(){
        
        for(const npc of this.stage.npcs){
        
            const $npcPortrait = GetStringOfCharsFromArray(npc,"any","M",false);

            if(npc.openingLine != undefined) {

                const $newDiv = this.stage.uiHandler.NewStageOutputDiv("<i>" + $npcPortrait + "</i>: " + npc.openingLine);

                $newDiv.querySelector("img").style.float = "left";

                $newDiv.querySelector("img").style.marginRight = "20px";


            }
        }
    }
    
    _NPCRecruitedAndUnlockedWithinTwoCharisma(evalObj){
        
        if(this.stage.npcs == null) return
        
        const $uiHandler = this.stage.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        
        for(const npc of this.stage.npcs){    
        
            let $leftRecruiters = [];

            let $rightRecruiters = [];

            for(const char of evalObj.pool){

                if(Math.abs(char.charisma - npc.charisma) <= 2){
                                        
                    if(!this.stage.stageHandler.scenario.GetScenarioChar(npc.name).unlocked.includes(char.alignment)) this.stage.stageHandler.scenario.GetScenarioChar(npc.name).unlocked.push(char.alignment);

                    if(char.alignment == "left") $leftRecruiters.push(char);

                    if(char.alignment == "right") $rightRecruiters.push(char);


                }
            }

            const $recruitedString = GetStringOfCharsFromArray(npc, "any","S");

            const $leftRecruitersString = GetStringOfCharsFromArray($leftRecruiters,"any","S");

            const $rightRecruitersString = GetStringOfCharsFromArray($rightRecruiters,"any","S");
            
            if($leftRecruiters.length == 0 && $rightRecruiters.length == 0) $uiHandler.NewStageOutputDiv($recruitedString + " doesn't really find anyone convincing...");
            
            else if ($rightRecruiters.length == 0) $uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $leftRecruitersString)
            
            else if ($leftRecruiters.length == 0) $uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $rightRecruitersString)

            else $uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $leftRecruitersString + " as well as "  +$rightRecruitersString);
            
            }
        
        }
}