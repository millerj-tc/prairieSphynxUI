import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";
import {uiInputHandler} from "/utils/uiTools/uiInputHandler.js";
import {cardHandler} from "./cards/cardHandler2.js";
import {cacheHandler} from "/utils/cacheHandler/cacheHandler.js";
import {scenarioProcessorHandler} from "./scenario/scenarioFlow/scenarioProcessorHandler.js";

export class gameHandler
{
    constructor(){
        
        this.uiToolsHandler = new uiToolsHandler();
        
        this.uiInputHandler = new uiInputHandler();
        
        const no = document.getElementById("narrativeOutput");
        const cct = document.getElementById("cardChoiceTray");
        const cctg = document.getElementById("cardChoiceTrayGrid");
        const dimmer = document.getElementById("dimmer");
        const ccg = document.getElementById("cardChoiceGrid");
        
        this.narrOutputArtist = this.uiToolsHandler.AddDOMUIArtist(no);    
        
        this.narrOutputArtist.imageSize = "M";
        
        this.cardChoiceTrayArtist = this.uiToolsHandler.AddTrayArtist(cct);
        this.cardChoiceTrayArtist.SetTrayOpenClosedPosition("100%","0%");
        this.cardChoiceTrayGridArtist = this.uiToolsHandler.AddDOMUIArtist(cctg);
        this.dimmerArtist = this.uiToolsHandler.AddDOMUIArtist(dimmer);
        this.cardChoiceGridArtist = this.uiToolsHandler.AddDOMUIArtist(ccg);
        
        this.uiToolsHandler.InitializeAllTools();
        
        this.masterCardHandler = new cardHandler("master");
        
        this.collectionCardHandler = new cardHandler("collection");
        
        console.warn("load cards into master and collection, but only if it's the first time playing");
        
        this.scenarioHandler = new scenarioProcessorHandler();
        
        this.cacheHandler = new cacheHandler();
        
        this.playerId = "player";
        
        console.warn("above should be their unique player ID");
        
        //debug
        
        this.playerWins = 0;
        this.otherPlayerWins = 0;
        this.playerTies = 0;
    }
}