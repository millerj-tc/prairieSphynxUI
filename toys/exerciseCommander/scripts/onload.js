import {uiToolsHandler} from "./scripts/prairiesSphynxUI/uiToolsHandler.js";


export function Onload(){
    
    window.uiTH = new uiToolsHandler();
    
    uiTH.AddDOMUIArtist()
}