import {uiToolsHandler} from "./uiToolsHandler.js";

export function Test(){
    
    const trayDOM = document.getElementById("tray");
    
    //const trayButtonDOM = document.getElementById("trayButton");
    
    const tArtist = uiTH.AddTrayArtist(trayDOM);
    
    tArtist.SetTrayOpenClosedPosition("0px","-170px")
    
    //tArtist.SetTrayToggleCollapseButtonToDOM(trayButtonDOM);
    
    tArtist.SetTrayBeginState("open");
    
    uiTH.InitializeAllTools();
}