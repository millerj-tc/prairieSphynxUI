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
        
        const domui = new domUIArtist(this);
        
        this.tools.push(domui);
        
        domui.AddAuthorizedDOMs(arguments);
        
        return domui
    }
    
    AddTrayArtist(){//any arguments will be pushed as authorized DOMs
        
        const trayA = new trayArtist(this);
        
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
    
    GetArtistsByAuthorizedDOMId(id){
        
        let returnArr = [];
        
        for(const t of this.tools){
            
            for(const d of t.authorizedDOMs){
                
                if(d.id == id){
                    
                    returnArr.push(t);
                    continue
                }
            }
            // only push each tool once
            if(returnArr.includes(t)) continue
        }
        
        if(returnArr.length == 1) return returnArr[0];
        
        return returnArr
    }
    
    InitializeAllTools(){
        
        for(const t of this.tools){
            
            if(`BeginInitialize` in t) t.BeginInitialize();
            if(`ErrorCheck` in t) t.ErrorCheck();
        }
    }
    
    CloseAllOpenTrays(){
        
        for(const t of this.tools){
            
            if(`toolSubtype` in t && t.toolSubtype == "trayArtist"){
                
                t.BeginTrayClose();
            }
        }
    }
    
    
}