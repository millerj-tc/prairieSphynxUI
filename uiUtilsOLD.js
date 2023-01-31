import {GetElementById,ClearAllChildren,CreateElement,SetInnerTextTo} from "./ui.js";
import {poemRemembererShowPoems} from "./poemRememberer/poemRemembererShowPoems.js";
import {poemCreatorDisplayFlow} from "./poemCreator/poemCreatorDisplayBuild/poemCreatorDisplayFlow.js";

const trayTransitionTime = Number(getComputedStyle(document.documentElement).getPropertyValue('--trayTransitionTime').replace("s","")) * 1000;


// trayUIHAndler
// create trays
// on startup, run trayUIHandler.ErrorCheckTrayInstances() which makes sure that they are all assembled properly with open/close icons, etc.

function _ToggleTrayState(tray,buttonDOM){
    
    if(buttonDOM.innerText == "▼") SetInnerTextTo(buttonDOM,"▲");
    else SetInnerTextTo(buttonDOM,"▼");
    
    if(tray.dataset.open == "closing") tray.dataset.open = "false";
    if(tray.dataset.open == "opening") tray.dataset.open = "true";
    
    if(tray.id == "poemCreatorTray" && tray.dataset.open == "false"){
        
        ClearAllChildren(GetElementById("poemCreatorGrid"));
    }
    
    if(tray.id == "poemReciterTray" && tray.dataset.open == "false"){
        
        ClearAllChildren(GetElementById("poemRemembererDisplay"));
    }
    
    if(tray.id == "poemReciterTray" && tray.dataset.open == "true"){
        
        window.gameHandler.actionLogger.AddAction("openPoemRemembererTray");
    }
}

function _IsTrayTransitioning(tray){
    
    if(tray.dataset.open == "opening" || tray.dataset.open == "closing") return true
    else return false
}

function _SetTrayTransitioning(tray,transition){
    
    tray.dataset.open = transition;
}

function _TrayClose(tray,button){
    
    if(_IsTrayTransitioning(tray) || tray.dataset.open == "false") return
    
    setTimeout(function(){_ToggleTrayState(tray,button)},trayTransitionTime);
    
    _SetTrayTransitioning(tray,"closing");

    tray.style.transform = "translateY(0)";
}

export function TogglePoemCreatorTrayCollapsed(){
    
    const $tray = GetElementById("poemCreatorTray");
        
    const $button = GetElementById("poemCreatorTrayCollapseToggler");
    
    const $outputTray = GetElementById("poemCreatorOutputTray");
    
    const $outputTrayButton = GetElementById("poemCreatorOutputCollapseToggler");
    
    if(_IsTrayTransitioning($tray)) return
    
    if($tray.dataset.open == "false"){
        
        _SetTrayTransitioning($tray,"opening");
        
        setTimeout(function(){_ToggleTrayState($tray,$button)},trayTransitionTime);
        
        $tray.style.transform = "translateY(85vh)";
        
        poemCreatorDisplayFlow();
    }
    else{ 
        _TrayClose($tray,$button);
        _TrayClose($outputTray,$outputTrayButton);
    }
}

export function TogglePoemCreatorOutputCollapsed(){
    
    const $tray = GetElementById("poemCreatorOutputTray");
        
    const $button = GetElementById("poemCreatorOutputCollapseToggler");
    
    if(_IsTrayTransitioning($tray)) return
    
    if($tray.dataset.open == "false"){
        
        _SetTrayTransitioning($tray,"opening");
        
        setTimeout(function(){_ToggleTrayState($tray,$button)},trayTransitionTime);
        
        $tray.style.transform = "translateY(55vh)";
    }
    else{ 
        _TrayClose($tray,$button);
    }
       
    
}

export function TogglePoemReciterCollapsed(){
    
    const $tray = GetElementById("poemReciterTray");
    
    const $button = GetElementById("poemReciterCollapseToggler");
    
    if(_IsTrayTransitioning($tray)) return
    
    if($tray.dataset.open == "false"){
                
        _SetTrayTransitioning($tray,"opening");
        
        setTimeout(function(){_ToggleTrayState($tray,$button)},trayTransitionTime);
        
        $tray.style.transform = "translateY(-45vh)";
        
        poemRemembererShowPoems();
    }
    else _TrayClose($tray,$button);
}

export function CloseAllOpenTrays(){
    
    const allTrays = [{tray:GetElementById("poemReciterTray"),button:GetElementById("poemReciterCollapseToggler")}, {tray: GetElementById("poemCreatorOutputTray"),button:GetElementById("poemCreatorOutputCollapseToggler")}, {tray: GetElementById("poemCreatorTray"), button:GetElementById("poemCreatorTrayCollapseToggler")}];
    
    for(const t of allTrays){
        
        _TrayClose(t.tray,t.button);
    }
}

export function CapitalizeLettersAfterAppropriatePunctuation(id){
    
    const $querySelectorAllArr = document.querySelectorAll(`#${id}`);
    
    for(const item of $querySelectorAllArr){

        SetInnerTextTo(item,item.innerText.replace(/(?<=\. \W*|\! \W*|\? \W*|\: \W*)\w/mg,function(match){return match.toUpperCase()})); //
    }
}

export function ReplaceNReturnWithBr(text){
    
    return text.replace(/\n/gm,"<br>");
}
