import {domUIArtist} from "/utils/uiTools/artists/uiToolsHandler.js";
import {cardHandler} from "./cards/cardHandler.js";

export class gameHandler
{
    constructor(){
        
        this.uiToolsHandler = new uiToolsHandler();
        
        const no = document.getElementById("narrativeOutput");
        
        this.narrOutputArtist = this.uiToolsHandler.AddDOMUIArtist(no);
        
        const cct = document.getElementById("cardChoiceTray");
        
        this.cardChoiceTrayArtist = this.uiToolsHandler.AddTrayArtist(cct);
        
        this.uiToolsHandler.InitializeAllTools();
        
        this.masterCardHandler = new cardHandler("master");
        
        this.collectionCardHandler = new cardHandler("collection");
        
        console.error("load cards into master and collection, but only if it's the first time playing")

    }
}