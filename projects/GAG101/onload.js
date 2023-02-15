import {gameHandler} from "./scripts/gameHandler.js";
import {charData} from "./scripts/data/charData.js";
import {GenerateCombinations} from "../../utils/mathAndLogicUtils/miscUtils.js";
import {DanceOfRiddlesPvEPrep, BuildDanceOfRiddlesPvEScenario} from "./scripts/scenario/danceOfRiddles.js";




export function onload(){
    
    window.gameHandler = new gameHandler();
    
    const gh = window.gameHandler;
    
    _LoadCollectionCards();
    
    BuildDanceOfRiddlesPvEScenario();
    
    GotoHomeMenu();
}

function _LoadCollectionCards(){
    
    console.warn("player collections data should be housed on firebase so they can be retrieved if the player clears their cookies");
    
    const ghCCH = window.gameHandler.collectionCardHandler;
    
    for(const c of charData){
        
        const cString = JSON.stringify(c)
        
        const card = ghCCH.MakeCardFromJSON(cString);
        
        if(card.unlockedForPlayer == false) continue
        
        const card2 = ghCCH.MakeCardFromJSON(cString);
        
        card.owner = window.gameHandler.playerId;
        
        card2.owner = "AI";
        
    }
}

export function GotoHomeMenu(){
    
    const gh = window.gameHandler;
    
    gh.narrOutputArtist.ClearAllChildren();
    
    const dorButton = document.createElement("button");
    
    dorButton.innerText = "Dance of Riddles";
    
    dorButton.onclick = DanceOfRiddlesPvEPrep;
    
    gh.narrOutputArtist.AppendElementWithinDOM(dorButton);
}