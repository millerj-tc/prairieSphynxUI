import {LoadCardArrIntoObjCardHandler} from "../cards/gagCardUtils.js";
import {ShuffleArray} from "/utils/mathAndLogicUtils/miscUtils.js";
import {gag101Period} from "./gagPeriods.js";
import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";
import {DisplayInactiveCardsAsChoices} from "../scenario/scenarioFlow/scenarioFlowUtils.js";
import {ScenarioFlow} from "../scenario/scenarioFlow/scenarioFlow.js";

export class gag101Scenario extends gag101Period
{
    constructor(periodName,periodType){
        
        super(periodName,periodType);
        this.playerCardSlots = 3;
        this.nonPlayerCardSlots = 3;
        this.uiToolsHandler = new uiToolsHandler();
        
        this.otherPlayerId = "otherPlayer";
    }
    
    BeginPeriod(){  
        
        super.BeginPeriod();
        
    }
    
    EndPeriod(){
        
        super.EndPeriod();
        
        const ph = this.subPeriodHandlers[0];
        
        ph.ResetAllPeriods();
            
        for(const p of ph.periods){

            p.subPeriodHandlers[0].ResetAllPeriods();
        }
        
    }
}