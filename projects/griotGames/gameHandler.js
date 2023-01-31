import {uiHandler} from "./ui/ui.js";
import {RunTournament} from "./systemUtils/runTournament.js";
import {cardScenarioHandler} from "./cardScenarios/cardScenarioHandler.js"
import {GetElementById} from "https://millerj-tc.github.io/poietaiOnline/ui.js";

export class gameHandler
{
    constructor(){
        
        this.uiHandler = new uiHandler(this);

        this.cardScenarioHandler = new cardScenarioHandler(this);        
        
    }
    
    Start(){
        
        if ('wakeLock' in navigator) {
  isSupported = true;
            console.log("found");
} else {
}
        
        let wakeLock = null;

// create an async function to request a wake lock
try {
  wakeLock = await navigator.wakeLock.request('screen');
} catch (err) {
  // The Wake Lock request has failed - usually system related, such as battery.
}

        
        window.addEventListener("keydown", function(event) {

            if (event.code === "KeyT"){
                
                RunTournament();

            }
        });

    }
}