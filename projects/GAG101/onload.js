import {gameHandler} from "./scripts/gameHandler.js";
import {charData} from "./scripts/data/charData.js";
import {GenerateCombinations} from "../../utils/mathAndLogicUtils/miscUtils.js";
import {DanceOfRiddlesPvEPrep, BuildDanceOfRiddlesPvEScenario} from "./scripts/scenario/danceOfRiddles.js";
import {UpdateCardForUser} from "./scripts/gag101Firebase/updateFirebase.js";
import {LoadLocalCollectionCards} from "./scripts/gag101Firebase/gag101Login.js";



export function onload(){
    
    window.gameHandler = new gameHandler();
        
    const gh = window.gameHandler;
    
    LoadLocalCollectionCards();
        
    BuildDanceOfRiddlesPvEScenario();
    
    GotoHomeMenu();
}

export function GotoHomeMenu(){
    
    const gh = window.gameHandler;
    
    gh.narrOutputArtist.ClearAllChildren();
    
    const dorButton = document.createElement("button");
    
    dorButton.innerText = "Dance of Riddles";
    
    dorButton.onclick = DanceOfRiddlesPvEPrep;
    
    gh.narrOutputArtist.AppendElementWithinDOM(dorButton);
}