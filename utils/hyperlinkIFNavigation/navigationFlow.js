import {GetElementById,ClearInnerHTML,CreateElement,GetOrCreateDivInsideDOM,SetInnerTextTo} from "./../ui.js";
import {ParseNavigationText,AttachEventListenersDOMs,IsCharAtPassage} from "./navigationUtils.js";
import {ReplacePronouns} from "./../utils.js";

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

//function _AddCharResponseCSSClasses(){
//    
//    const gh = window.gameHandler;
//    
//    const navOutput = GetElementById("navigationOutput");
//        
//    for (const char of gh.characterHandler.characters){
//        
//        const currentPassageId = gh.passageHandler.currentPassage.id
//        
//        if(!char.presentPassages.includes(currentPassageId)) continue
//
//        const $respoDiv = GetOrCreateDivInsideDOM(`${char.id}Response`,navOutput);
//        
//        $respoDiv.classList.add("charResponse");
//        
//    }
//}
//
//function _DisplayAskFavoriteLinks(){
//    
//    const gh = window.gameHandler;
//    
//    const navOutput = GetElementById("navigationOutput");
//    
//    for (const char of gh.characterHandler.characters){
//        
//        if(char.presentPassages.includes(gh.passageHandler.currentPassage.id)){
//            
//            const $favLink = GetOrCreateDivInsideDOM(`${char.id}FavoriteLink`,navOutput);
//            
//            const $their = char.GetPronouns().their;
//            
//            $favLink.insertAdjacentHTML("beforeend", `Ask ${char.GetCharacterName()} ${$their} favorite poem<br><br>`)
//            
//            $favLink.classList.add("passageLink");
//            
//            $favLink.addEventListener("click",function(){char.ShareFavoritePoems()})
//        }
//    }
//}