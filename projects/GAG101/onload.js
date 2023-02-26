import {gameHandler} from "./scripts/gameHandler.js";
import {charData} from "./scripts/data/charData.js";
import {GenerateCombinations} from "../../utils/mathAndLogicUtils/miscUtils.js";
import {DanceOfRiddlesPrep, BuildDanceOfRiddlesScenario} from "./scripts/scenario/danceOfRiddles.js";
import {UpdateCardForUser} from "./scripts/gag101Firebase/updateFirebase.js";
import {LoadLocalCollectionCards,UnlockLocalUnlockedScenarios} from "./scripts/gag101Firebase/gag101Login.js";



export function onload(){
    
    window.gameHandler = new gameHandler();
        
    const gh = window.gameHandler;
    
    LoadLocalCollectionCards();
    
    UnlockLocalUnlockedScenarios();
        
    BuildDanceOfRiddlesScenario();
    
    GotoHomeMenu();
}

export function GotoHomeMenu(){
    
    const gh = window.gameHandler;
    
    gh.narrOutputArtist.ClearAllChildren();
    
    gh.loginWrapperArtist.SetDOMDisplayTo("none");
    
    console.warn("Might want to add an id of some kind to OutputDivWithNounImages... so that it can be manipulated later like the highlight function of Clone Crisis.");
    
    //_ClearPreviousRunDOMs();
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("none");
    
    const dorButton = document.createElement("button");
    
    dorButton.innerText = "Dance of Riddles (Story Mode)";
    
    dorButton.onclick = function(){DanceOfRiddlesPrep("story")};
    
    gh.narrOutputArtist.AppendElementWithinDOM(dorButton);
    
    gh.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
       
    const dorPButton = document.createElement("button");

    dorPButton.innerText = "Dance of Riddles (Competitive Mode)";

    dorPButton.onclick = function(){DanceOfRiddlesPrep("pvp")};

    gh.narrOutputArtist.AppendElementWithinDOM(dorPButton);
}

