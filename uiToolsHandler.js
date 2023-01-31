import {domUIArtist} from "./domUIArtist.js";
import {utilityUIArtist} from "./utilityUIArtist.js";

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
    
    SetLastCreatedExternalOwnerId(str){
        
        const lastCreatedTool = this.tools.slice(-1)

        if(typeof str == "string") lastCreatedTool.externalOwnerId = str;
        else{ 
            console.error("SetLastCreatedExternalOwnerId has not been passed a string!");
            console.log(lastCreatedTool);
        }
    }
    
    ErrorCheckAllTools(){
        
        for(const t of this.tools){
            
            t.ErrorCheck();
        }
    }
}