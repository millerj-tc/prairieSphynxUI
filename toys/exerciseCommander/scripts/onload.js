import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";


export function Onload(){
    
    window.uiTH = new uiToolsHandler();
    
    const edDOM = document.getElementById("exerciseDisplay");
    
    const rtDOM = document.getElementById("remainingTime");
    
    uiTH.AddDOMUIArtist(edDOM);
    
    uiTH.AddDOMUIArtist(rtDOM);
}