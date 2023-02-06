import {LoadCardArrIntoObjCardHandler} from "../cards/gagCardUtils.js";
import {ShuffleArray} from "/utils/mathAndLogicUtils/miscUtils.js";
import {gag101Period} from "./gagPeriods.js";
import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";
import {DisplayInactiveCardsAsChoices} from "../scenario/scenarioFlow/scenarioFlowUtils.js";
import {ScenarioFlow} from "../scenario/scenarioFlow/scenarioFlow.js";

export class gag101Scenario extends gag101Period
{
    constructor(periodName,periodType){
        
        super(periodName,periodType);
        this.playerCardSlots = 3;
        this.nonPlayerCardSlots = 3;
        this.uiToolsHandler = new uiToolsHandler();
    }
    
    LoadCards(){
        
        super.LoadCards();
        
        console.log(this);
        
        const activeCollectionCards = window.gameHandler.collectionCardHandler.GetCards("active");
    
        LoadCardArrIntoObjCardHandler(activeCollectionCards,this); //player's copies
        
        this._LoadNonplayerCopiesOfPlayerCards(); //for the AI
    }
    
    PrepScenario(){
        
        this.cardHandler.EmptyCards();
    
        this.LoadCards();
        // active cards are passed down the period chain
        // cards are activated by: being chosen by the player, being chosen randomly, by being chosen by the other player in the Arena, by being chosen by the scenario as a specific chosen opponent (or any combination if a scenario might include random cards)
        // scenario-specific cards can be active or inactive when the scenario is constructed


        // active cards in the cardHandler are passed down to the next one. That cardHandler will have functions to determine which of those cards are active
        
        console.warn("display card choice tray here");
        
        this._CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(this.playerCardSlots,window.gameHandler.playerId,2);
        
        this._CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(this.nonPlayerCardSlots,"nonPlayer",3);
        
        this._RandomizePlayerIdCardChoicesForScenario();
        
        this._RandomizePlayerIdCardChoicesForScenario("nonPlayer");
        
        this._CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(window.gameHandler.playerId,1);
        
        this._CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("nonPlayer",4);
        
        this._AttachOnClickCardChoiceToDOMs();
        
        this._AddScenarioRunButton();
        
        this.periodHandler.preppedScenario = this;
    }
    
    BeginPeriod(){  
        
        super.BeginPeriod();
        
        
    }
    
    _LoadNonplayerCopiesOfPlayerCards(){
        
        const activeCollectionCards = window.gameHandler.collectionCardHandler.GetCards("active");
    
        LoadCardArrIntoObjCardHandler(activeCollectionCards,this, "nonPlayer");
    }
    
    _CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(n,id,gridColumnStart){
        
        for(let i = 0; i < n; i++){
            
            const dom = document.createElement("div");
            
            dom.id = id + "CardSlot" + i;
            
            const artist = this.uiToolsHandler.AddDOMUIArtist(dom);
            
            artist.SetStylePropToValue("grid-column-start",gridColumnStart);
            artist.SetStylePropToValue("grid-row-start",(i+1).toString());
                    
            const cardChoiceTrayArtist = window.gameHandler.uiToolsHandler.GetArtistsByAuthorizedDOMId("cardChoiceTrayGrid");
            
            cardChoiceTrayArtist.AppendElementWithinDOM(dom);
        }
        
    }
    
    _CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(playerId,gridColumnStart){
        
        const cardSlotArtists = this.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes(playerId + "CardSlot"));
        
        for(const artist of cardSlotArtists){
            
            const artistDOM = artist.GetAuthorizedDOMs();
            
            const nameSlot = document.createElement("div");
            
            nameSlot.id = playerId + "CardNameSlot" + artistDOM.style.gridRowStart;
            
            nameSlot.classList.add("nameSlot");
            
            const subArtist = this.uiToolsHandler.AddDOMUIArtist(nameSlot);
            
            artist.SetCustomArtistPropToValue("servantArtist",subArtist);
            
            subArtist.SetCustomArtistPropToValue("masterArtist",artist);
            
            subArtist.SetStylePropToValue("grid-column-start",gridColumnStart);
            
            subArtist.SetStylePropToValue("grid-row-start",artistDOM.style.gridRowStart);
            
            subArtist.SetDOMInnerTextTo(artist.associatedCard.name);
            
            const cardChoiceTrayArtist = window.gameHandler.uiToolsHandler.GetArtistsByAuthorizedDOMId("cardChoiceTrayGrid");
            
            cardChoiceTrayArtist.AppendElementWithinDOM(nameSlot);
            
        }
    }
    
    _RandomizePlayerIdCardChoicesForScenario(id=window.gameHandler.playerId){ //called in begin period
        
        const playerCards = this.cardHandler.GetCards().filter(c => c.owner == id);

        const shuffledAvailableCards = ShuffleArray(playerCards);
        
        const playerSlotArtistsArr = this.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes(id + "CardSlot"));

        for(const artist of playerSlotArtistsArr){

            const card = shuffledAvailableCards.shift();
            
            this.UpdateCardSlotArtist(artist,card);
            
            
        }
    }
    
    UpdateCardSlotArtist(artist,card){
        
        if(artist.associatedCard != null){
            artist.associatedCard.Deactivate();
            artist.servantArtist.SetDOMInnerTextTo(card.name);
        }
        
        artist.ClearAllChildren();
        
        artist.SetCustomArtistPropToValue("associatedCard",card);
            
        const img = document.createElement("img");

        img.src = card.imageM;

        artist.AppendElementWithinDOM(img);

        card.Activate();
    }
    
    _AttachOnClickCardChoiceToDOMs(){
        
        const scenario = this;

        for(const tool of this.uiToolsHandler.tools){
            
            const dom = tool.GetAuthorizedDOMs();
            
            const associatedCard = tool.associatedCard;
            
            if(dom.id.includes("CardSlot")){
                
                dom.onclick = function(){
            
                    DisplayInactiveCardsAsChoices(scenario,associatedCard.owner);
                    
                    scenario.lastClickedCardSlotArtist = tool;
                    
                }
            }
        }  
    }
    
    _AddScenarioRunButton(){
        
        const but = document.createElement("button");
        
        but.innerText = "Run scenario";
        
        const scenario = this;
        
        but.onclick = function(){
            
            ScenarioFlow(scenario);
        }
        
        window.gameHandler.cardChoiceTrayArtist.AppendElementWithinDOM(but);
        
    }
}