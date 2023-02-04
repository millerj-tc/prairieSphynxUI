import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";
import {uiInputHandler} from "/utils/uiTools/uiInputHandler.js";
import {cardHandler} from "./cards/cardHandler.js";
import {gag101PeriodHandler} from "./periods/gagPeriods.js";
import {cacheHandler} from "/utils/cacheHandler/cacheHandler.js";


export class gameHandler
{
    constructor(){
        
        this.uiToolsHandler = new uiToolsHandler();
        
        this.uiInputHandler = new uiInputHandler();
        
        const no = document.getElementById("narrativeOutput");
        const cct = document.getElementById("cardChoiceTray");
        const dimmer = document.getElementById("dimmer");
        
        this.narrOutputArtist = this.uiToolsHandler.AddDOMUIArtist(no);        
        this.cardChoiceTrayArtist = this.uiToolsHandler.AddTrayArtist(cct);
        this.cardChoiceTrayArtist.SetTrayOpenClosedPosition("90%","0%")
        this.dimmerArtist = this.uiToolsHandler.AddDOMUIArtist(dimmer);
        
        this.uiToolsHandler.InitializeAllTools();
        
        this.masterCardHandler = new cardHandler("master");
        
        this.collectionCardHandler = new cardHandler("collection");
        
        console.error("load cards into master and collection, but only if it's the first time playing");
        //(Cache handler)
        
        this.scenarioHandler = new gag101PeriodHandler("scenario");
        
        this.cacheHandler = new cacheHandler();

    }
}