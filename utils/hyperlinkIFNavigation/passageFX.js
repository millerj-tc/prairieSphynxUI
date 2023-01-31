import {NavigationFlow} from "./navigationFlow.js";
import {GetOrCreateDivInsideDOM,GetElementById,ClearInnerHTML,SetDisplayTo} from "./../ui.js";
import {ParseNavigationText,AttachEventListenersDOMs} from "./navigationUtils.js";
import {InsertUsedKeywords,GetMatchedKeywords} from "./../poemEvaluation/poemEvaluationUtils.js";

export function GoToPassage(passId){
    
    NavigationFlow(passId);
}

export function AppendToDivOnce(id,text,keyWordsArr){
    
    const $navOutput = GetElementById("navigationOutput");
    
    const $div = GetOrCreateDivInsideDOM(id,$navOutput);
    
    let $navText = ParseNavigationText(text);
    
    _StoreUsedKeywords(keyWordsArr);
    
    $navText = InsertUsedKeywords($navText,keyWordsArr);
    
    ClearInnerHTML($div);
    
    $div.insertAdjacentHTML("beforeend",$navText);
    
    AttachEventListenersDOMs(id);
}

function _StoreUsedKeywords(keywordsArr){
    
    const $usedKeywords = GetMatchedKeywords(keywordsArr);
        window.gameHandler.passageHandler.currentPassage.SetUsedKeywords($usedKeywords);
}

export function AddAllusionWordToSource(word,source){
    
    source.AddAllusionWord(word);
}

export function PermanentlyUnlockPassageSpan(id){
    
    const $unlockSpan = GetElementById(id);
    
    SetDisplayTo($unlockSpan,"inline-block");
}