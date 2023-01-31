import {domUIArtist} from "./artists/domUIArtist.js";
import {trayArtist} from "./artists/trayArtist.js";
import {utilityUIArtist} from "./artists/utilityUIArtist.js";

export class uiToolsHandler
{
    constructor(){
        
        this.tools = [];
        this.utilityUIArtist = new utilityUIArtist(this);
    }
    
    AddDOMUIArtist(){ //any arguments will be pushed as authorized DOMs
        
        const domui = new domUIArtist(this,externalOwnerId);
        
        this.tools.push(domui);
        
        domui.AddAuthorizedDOMs(arguments);
        
        return domui
    }
    
    AddTrayArtist(){//any arguments will be pushed as authorized DOMs
        
        const trayA = new trayArtist(this,externalOwnerId);
        
        this.tools.push(trayA);
        
        trayA.AddAuthorizedDOMs(arguments);
        
        return trayA
    }
    
    SetLastCreatedExternalOwnerId(str){
        
        const lastCreatedTool = this.tools.slice(-1)

        if(typeof str == "string") lastCreatedTool.externalOwnerId = str;
        else{ 
            console.error("SetLastCreatedExternalOwnerId has not been passed a string!");
            console.log(lastCreatedTool);
        }
    }
    
    InitializeAllTools(){
        
        for(const t of this.tools){
            
            if(t.hasOwnProperty("Initialize")) t.Initialize();
            if(t.hasOwnProperty("ErrorCheck")) t.ErrorCheck();
        }
    }
    
    CloseAllOpenTrays(){
        
        for(const t of this.tools){
            
            if(t.hasOwnProperty("toolSubtype") && t.toolSubtype == "trayArtist"){
                
                t.BeginTrayClose();
            }
        }
    }
    
    
}