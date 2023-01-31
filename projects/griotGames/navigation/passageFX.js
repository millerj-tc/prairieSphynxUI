import {NavigationFlow} from "./navigationFlow.js";
import {GetOrCreateDivInsideDOM,GetElementById,ClearInnerHTML} from "./../ui.js";
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
    
    console.log($usedKeywords);
    
    window.gameHandler.passageHandler.currentPassage.SetUsedKeywords($usedKeywords);
    
    console.log(window.gameHandler.passageHandler.currentPassage);
}

export function AddAllusionWordToSource(word,source){
    
    source.AddAllusionWord(word);
}