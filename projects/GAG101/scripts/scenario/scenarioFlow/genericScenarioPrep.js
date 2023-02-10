import {ShuffleArray} from "/utils/mathAndLogicUtils/miscUtils.js";
import {UpdateCardSlotArtist,DisplayUnselectedCardsAsChoices} from "../scenarioPhases/uiPhaseUtils.js";
import {CollapseButtonOnClick} from "/utils/uiTools/artists/trayArtistTrayMovement.js";


export function GenericScenarioPrepWithAI(){ //only run this once when the scenario starts, not as a phase
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    gh.narrOutputArtist.ClearAllChildren();
            
    console.warn("display card choice tray here");
    _CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(scenario.playerCardSlots,gh.playerId,2);

    _CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(scenario.otherPlayerCardSlots,"AI",3);

    _RandomizePlayerIdCardChoicesForScenario();

    _RandomizePlayerIdCardChoicesForScenario("AI");

    _CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(gh.playerId,1);

    _CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("AI",4);

    _AttachOnClickCardChoiceToDOMs();

    _AddScenarioRunButton();
}



function _CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(n,id,gridColumnStart){
    
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

        cardChoiceTrayArtist.AppendElementWithinDOM(dom);
    }

}
    
 function _CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(playerId,gridColumnStart){
     
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
    
function _RandomizePlayerIdCardChoicesForScenario(id=window.gameHandler.playerId){ //called in begin period
        
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const playerCards = cardHandler.GetCards().filter(c => (c.owner == id && c.unlockedForPlayer == "true"));
    
    console.log(playerCards);

    const shuffledAvailableCards = ShuffleArray(playerCards);

    const playerSlotArtistsArr = scenario.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes(id + "CardSlot"));

    for(const artist of playerSlotArtistsArr){

        const card = shuffledAvailableCards.shift();

        UpdateCardSlotArtist(artist,card);

        card.selectedForTeam = "true"; //must be string bc of JSON ification
    }
}

    
function _AttachOnClickCardChoiceToDOMs(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    for(const tool of scenario.uiToolsHandler.tools){

        const dom = tool.GetAuthorizedDOMs();

        const associatedCard = tool.associatedCard;

        if(dom.id.includes("CardSlot")){

            dom.onclick = function(){
                
                if(gh.cardChoiceGridArtist.GetStyleProp("display") == "grid") return //otherwise you can "click through" the dimmer layer and mess up the lastClickedCardSlotArtist part and it gets ALLL fucked up

                DisplayUnselectedCardsAsChoices(associatedCard.owner);

                scenario.lastClickedCardSlotArtist = tool;
                
                associatedCard.selectedForTeam = "false";
            }
        }
    }  
}
    
function _AddScenarioRunButton(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    const but = document.createElement("button");

    but.innerText = "Run scenario";

    but.onclick = function(){

        scenario.BeginProcess();
        
        CollapseButtonOnClick(gh.cardChoiceTrayArtist);

    }

    gh.cardChoiceTrayArtist.AppendElementWithinDOM(but);
    

}