import {GetElementById,ClearInnerHTML,CreateElement} from "./../ui.js";
import {ParseNavigationText,AttachEventListenersDOMs} from "./navigationUtils.js";

export function NavigationFlow(destPassage){

    const $passageHandler = window.gameHandler.passageHandler;
    
     _SetCurrentPassage($passageHandler,destPassage);
    
     _ParseCurrentPassage($passageHandler);
    
    _DisplayCurrentPassage($passageHandler);
}

function _SetCurrentPassage(passageHandler,destPassage){
    
    passageHandler.SetCurrentPassage(destPassage);
}

function _ParseCurrentPassage(passageHandler){
    
    const $passage = passageHandler.currentPassage;
    
    $passage.text = ParseNavigationText($passage.text);
}

function _DisplayCurrentPassage(passageHandler){
    
    const $navOutput = GetElementById("navigationOutput");
    
    ClearInnerHTML($navOutput);
    
    $navOutput.insertAdjacentHTML("beforeend",passageHandler.currentPassage.text)
    
    AttachEventListenersDOMs("navigationOutput");
}