import {CapitalizeLettersAfterAppropriatePunctuation} from "./../uiUtils.js";
import {CreateElement,GetElementById} from "./../ui.js";
import {NavigationFlow} from "./navigationFlow.js";

export function ParseNavigationText(text){
    
    let $navText = text.slice();
    
    $navText = _ParsePassageLinks($navText);
    
    return $navText
}

export function IsCharAtPassage(char,passage){
    
    const currentPassageId = gh.passageHandler.currentPassage.id;
        
    if(char.presentPassages.includes(currentPassageId)) return true
    
    return false
}

function _ParsePassageLinks(text){
    
    let $navText = text.slice();
    
    if($navText.match(/\[\[(.*)]]/gm) != null){
    
        for(const m of $navText.match(/\[\[(.*)]]/gm)){
        
            let $displayText = m.match(/\[\[(.*)\|/gm)[0];

            $displayText = $displayText.replace("[[","");

            $displayText = $displayText.replace("|","");

            let $passageId = m.match(/\|(\S*)]]/gm)[0];

            $passageId = $passageId.replace("]]","");

            $passageId = $passageId.replace("|","");

            const $span = CreateElement("span");

            $span.innerHTML = $displayText;

            $span.classList.add("passageLink");

            $span.dataset.target = $passageId;

            $navText = $navText.replace(m,$span.outerHTML);
        }
    }
    
    return $navText
}

export function AttachEventListenersDOMs(DOMId){
    
    const $navOutput = GetElementById(DOMId);
            
    for(const child of $navOutput.children){
        
        if(child.classList.contains("passageLink")){
            
            const $passageId = child.dataset.target;
            
            child.addEventListener("click",function(){NavigationFlow($passageId)});
        }
    }
}

export function GetPoemFromNavigationOutputPlayerPoemSpeak(){
    
    let $returnString = "";
    
    const $navOutput = GetElementById("recitePoemText");
    
    $returnString = $navOutput.innerText;
    
    return $returnString
}