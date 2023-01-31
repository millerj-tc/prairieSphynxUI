import {uiHandler} from "./ui.js";
import {scenarioHandler} from "./scenarioHandler.js";
import {RunTournament} from "./runTournament.js";
import {initPOTFCCardZones,initPOTFCCardZoneMenu, initPOTFCStages,initPOTFCScenarioFX} from "./Protectors of the Fey Circle/potfcStoryScenario.js";
import {inputReader} from "./inputReader.js";
import {salonGenreMessageHandler} from "./salonGenre.js";


export class gameHandler
{
    constructor(){
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioHandler = new scenarioHandler(this);
        
        this.simulationCount = 0;
        this.choiceCount = 0;
        this.choiceCountUntilOfferSubmissionLink = 8;
        
        this.newGamePlus = false;
        
        
    }
    
    Start(){
            
        const $scen0 = this.scenarioHandler.AddScenario("potfcStory");

        $scen0.initCardZones = initPOTFCCardZones;
        
        $scen0.initCardZoneMenu = initPOTFCCardZoneMenu;

        $scen0.initStages = initPOTFCStages;

        $scen0.initScenarioFx = initPOTFCScenarioFX;
        
        this.scenarioHandler.GotoScenario($scen0);
        
        document.getElementById("output").innerHTML = "";
        
        window.addEventListener("keydown", function(event) {

            if (event.code === "KeyT"){
                
                RunTournament();

            }
        });

    }
    
    ResetGameOnSimulationRun(){
        
        this.simulationCount++;
    }
    
    _RestoreRemovedChars(){
        
        for(const loc of this.scenarioHandler.currentScenario.cardZoneHandler.cardZones){
            
            for(const slot of loc.charSlots){
                
                if(slot.character != null) slot.character.removedDuringRun = false;
            }
        }
    }
    
    _RemoveUnslottedCharacters(){
        
        for(const loc of this.scenarioHandler.currentScenario.cardZoneHandler.cardZones){
            
            loc.unslottedChars = [];
        }
    }
    
    EndGame(){
        
        this._OfferSubmissionLinkAfterXRuns();
    }
    
    _OfferSubmissionLinkAfterXRuns(){
        
        if(this.choiceCount >= this.choiceCountUntilOfferSubmissionLink){
            
            if(!this.newGamePlus){
                    
                this.uiHandler.NewStageOutputDiv("You may submit a roster to <a href='https://forms.gle/tHWHMmcnowk43fxS6' target='_blank' rel='noopener noreferrer'>this link</a> to have your solution compete with other participants. <br><br>After you submit, there may be an additional difficulty level of the simulation you can try to solve. However, you can only submit your roster for this difficulty level once.");
            }
            
            else{
                
                this.uiHandler.NewStageOutputDiv("You may submit a roster to <a href='https://forms.gle/fCJL7KMQxiYrALp46' target='_blank' rel='noopener noreferrer'>this link</a> to have your solution compete with other participants.");
            }
                
            
        }
    }
}