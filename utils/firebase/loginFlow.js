import {GetElementById,SetDisplayTo} from "./../ui.js";
import {GetUserDataAtLoginFlow} from "./firebaseGetUserData.js";
import {InitializeWorldPassages} from "./../navigation/worldPassages.js";
import {NavigationFlow} from "./../navigation/navigationFlow.js";
import {GetCharacterHeardPoems} from "./characterDatabaseValues.js";
import {EstablishSession} from "./firebaseAuth.js";
import {UiInit} from "./../uiInit.js";

export function LoginFlow(){
    
    GetUserDataAtLoginFlow();

}

function _GetCharacterData(){
    
    for(const charObj of window.gameHandler.characterHandler.characters){
        
        GetCharacterHeardPoems(charObj);
    }
}

export function PostUserDataRetrievalFlow(){
    
     const $lw = GetElementById("loginWrapper");
    
    const $pc = GetElementById("poemCreatorTray");
    
    const $pr = GetElementById("poemReciterTray")
    
    if(!window.gameHandler.actionLogger.optOut) EstablishSession()
    
    SetDisplayTo($lw,"none");
    
    SetDisplayTo($pc,"block");
    
    SetDisplayTo($pr,"block");
    
    SetDisplayTo
    
    InitializeWorldPassages();
    
    _GetCharacterData();
    
    //** DetermineUserLocation();
    
    NavigationFlow("hotApartment");
    
    UiInit();
    
    window.gameHandler.loggingIn = false;
}