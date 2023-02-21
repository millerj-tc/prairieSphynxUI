import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";
import {uiInputHandler} from "/utils/uiTools/uiInputHandler.js";
import {cardHandler} from "./cards/cardHandler2.js";
import {cacheHandler} from "/utils/cacheHandler/cacheHandler.js";
import {scenarioProcessorHandler} from "./scenario/scenarioFlow/scenarioProcessorHandler.js";
import {tournamentHandler} from "./pvp/tournamentHandler.js";

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
        const lwrap = document.getElementById("loginWrapper");
        
        this.narrOutputArtist = this.uiToolsHandler.AddDOMUIArtist(no);    
        
        this.narrOutputArtist.imageSize = "M";
        
        this.cardChoiceTrayArtist = this.uiToolsHandler.AddTrayArtist(cct);
        this.cardChoiceTrayArtist.SetTrayOpenClosedPosition("100%","0%");
        this.cardChoiceTrayGridArtist = this.uiToolsHandler.AddDOMUIArtist(cctg);
        this.dimmerArtist = this.uiToolsHandler.AddDOMUIArtist(dimmer);
        this.cardChoiceGridArtist = this.uiToolsHandler.AddDOMUIArtist(ccg);
        this.loginWrapperArtist = this.uiToolsHandler.AddDOMUIArtist(lwrap);
        
        this.uiToolsHandler.InitializeAllTools();
        
        this.masterCardHandler = new cardHandler("master");
        
        this.collectionCardHandler = new cardHandler("collection");
        
        this.tournamentHandler = new tournamentHandler();
        
        console.warn("all changes to journal, collection, etc. should be pushed to firebase & cookie");
        
        console.warn("make sure that multiple cookie level changes get propogated to database post registration");
        
        this.scenarioHandler = new scenarioProcessorHandler();
        
        this.cacheHandler = new cacheHandler();
        
        this.playerId = "player"; //this is changed by auth in index.html on login 
        
        this.playerUsername = "Player";
        
        this.otherPlayerId = "AI";

    }
}