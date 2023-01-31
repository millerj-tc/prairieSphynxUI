import {CapitalizeLettersAfterAppropriatePunctuation} from "./../uiUtils.js";
import {CreateElement,GetElementById} from "./../ui.js";
import {NavigationFlow} from "./navigationFlow.js";

export function ParseNavigationText(text){
    
    let $navText = text.slice();
    
    $navText = _ParsePassageLinks($navText);
    
    return $navText
}

function _ParsePassageLinks(text){
    
    let $navText = text.slice();
    
    if($navText.match(/\[\[(\S*)]]/gm) != null){
    
        for(const m of $navText.match(/\[\[(\S*)]]/gm)){

            let $displayText = m.match(/\[\[(\S*)\|/gm)[0];

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