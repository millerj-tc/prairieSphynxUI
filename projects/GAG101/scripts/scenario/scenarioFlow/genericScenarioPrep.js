import {ShuffleArray} from "/utils/mathAndLogicUtils/miscUtils.js";
import {UpdateCardSlotArtist,DisplayUnselectedCardsAsChoices} from "../scenarioPhases/uiPhaseUtils.js";
import {CollapseButtonOnClick} from "/utils/uiTools/artists/trayArtistTrayMovement.js";
import {RunPvPTournament} from "/projects/GAG101/scripts/pvp/pvpScenarioTournament.js";


export function GenericScenarioPrepWithAI(){ //only run this once when the scenario starts, not as a phase
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    gh.narrOutputArtist.ClearAllChildren();
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("block");
    
    CollapseButtonOnClick(gh.cardChoiceTrayArtist);
            
    CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(scenario.playerCardSlots,gh.playerId,2);

    CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(scenario.otherPlayerCardSlots,"AI",3);

    RandomizePlayerIdCardChoicesForScenario();

    RandomizePlayerIdCardChoicesForScenario("AI");

    CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(gh.playerId,1);

    CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("AI",4);

    AttachOnClickCardChoiceToDOMs();

    AddScenarioRunButton();
}



export function CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(n,id,gridColumnStart){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    for(let i = 0; i < n; i++){

        const dom = document.createElement("div");

        dom.id = id + "CardSlot" + i;

        const artist = scenario.uiToolsHandler.AddDOMUIArtist(dom);

        artist.SetStylePropToValue("grid-column-start",gridColumnStart);
        artist.SetStylePropToValue("grid-row-start",(i+1).toString());

        const cardChoiceTrayArtist = window.gameHandler.uiToolsHandler.GetArtistsByAuthorizedDOMId("cardChoiceTrayGrid");
        
        if(id != gh.playerId) artist.right = true;

        cardChoiceTrayArtist.AppendElementWithinDOM(dom);
    }

}
    
 export function CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(playerId,gridColumnStart){
     
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    const cardSlotArtists = scenario.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes(playerId + "CardSlot"));

    for(const artist of cardSlotArtists){

        const artistDOM = artist.GetAuthorizedDOMs();

        const nameSlot = document.createElement("div");

        nameSlot.id = playerId + "CardNameSlot" + artistDOM.style.gridRowStart;

        nameSlot.classList.add("nameSlot");

        const subArtist = scenario.uiToolsHandler.AddDOMUIArtist(nameSlot);

        artist.SetCustomArtistPropToValue("servantArtist",subArtist);

        subArtist.SetCustomArtistPropToValue("masterArtist",artist);

        subArtist.SetStylePropToValue("grid-column-start",gridColumnStart);

        subArtist.SetStylePropToValue("grid-row-start",artistDOM.style.gridRowStart);

        subArtist.SetDOMInnerTextTo(artist.associatedCard.name);

        const cardChoiceTrayArtist = window.gameHandler.uiToolsHandler.GetArtistsByAuthorizedDOMId("cardChoiceTrayGrid");

        cardChoiceTrayArtist.AppendElementWithinDOM(nameSlot);

    }
}
    
export function RandomizePlayerIdCardChoicesForScenario(id=window.gameHandler.playerId){ //called in begin period
        
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const playerCards = cardHandler.GetCards().filter(c => (c.owner == id && c.unlockedForPlayer == true));
    
    const shuffledAvailableCards = ShuffleArray(playerCards);

    const playerSlotArtistsArr = scenario.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes(id + "CardSlot"));

    for(const artist of playerSlotArtistsArr){

        const card = shuffledAvailableCards.shift();

        UpdateCardSlotArtist(artist,card);

        card.selectedForTeam = true;
    }
}

export function SetCardForSlot(card,owner,slotNum){
    
    const gh = window.gameHandler;
    
    card.owner = owner; 

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const artist = scenario.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes(owner + "CardSlot" + slotNum))[0];
    
    UpdateCardSlotArtist(artist,card);
    
    card.selectedForTeam = true;
}

export function RenameCardSlotDOMsToSubmissionUserId(){
    
    const gh = window.gameHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const runProcessor = scenario.GetCurrentRunProcessor();
    
    const player1Id = runProcessor.contenders[1].playerId;
    
    if(player1Id == "AI") return
    
    const artists = scenario.uiToolsHandler.tools.filter(t => t.right); //set in CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart 
    
    for(const artist of artists){
        
        artist.GetAuthorizedDOMs().id = player1Id + "CardSlot" + artist.GetAuthorizedDOMs().id.slice(-1);
    }
}

    
export function AttachOnClickCardChoiceToDOMs(){
    
    console.warn("not working for pvp practice");
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    for(const tool of scenario.uiToolsHandler.tools){

        const dom = tool.GetAuthorizedDOMs();

        if(dom.id.includes("CardSlot")){

            dom.onclick = function(){
                
                if(gh.cardChoiceGridArtist.GetStyleProp("display") == "grid") return //otherwise you can "click through" the dimmer layer and mess up the lastClickedCardSlotArtist part and it gets ALLL fucked up

                DisplayUnselectedCardsAsChoices(tool.associatedCard.owner);

                scenario.lastClickedCardSlotArtist = tool;
                
                //associatedCard.selectedForTeam = false;
            }
        }
    }  
}
    
export function AddScenarioRunButton(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    const but = document.createElement("button");

    but.innerText = "Run scenario";

    but.onclick = function(){

        scenario.QueueProcess();
        
        scenario.ProcessNextInQueue();
        
        CollapseButtonOnClick(gh.cardChoiceTrayArtist);

    }

    gh.cardChoiceTrayArtist.AppendElementWithinDOM(but);
    

}

export function AddScenarioRunPvPButton(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    const but = document.createElement("button");

    but.innerText = "Submit Team to PvP Tournament";

    but.onclick = function(){

        RunPvPTournament();
        
        CollapseButtonOnClick(gh.cardChoiceTrayArtist);

    }

    gh.cardChoiceTrayArtist.AppendElementWithinDOM(but);
    

}