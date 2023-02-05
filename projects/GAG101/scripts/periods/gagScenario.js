import {LoadCardArrIntoObjCardHandler} from "../cards/gagCardUtils.js";
import {ShuffleArray} from "/utils/mathAndLogicUtils/miscUtils.js";
import {gag101Period} from "./gagPeriods.js";
import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";
import {DisplayInactiveCardsAsChoices} from "../scenario/scenarioFlow/scenarioFlowUtils.js";

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
    
    BeginPeriod(){  
        
        super.BeginPeriod();
        
        this._CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(this.playerCardSlots,window.gameHandler.playerId,2);
        
        this._CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(this.nonPlayerCardSlots,"nonPlayer",3);
        
        this._RandomizePlayerIdCardChoicesForScenario();
        
        this._RandomizePlayerIdCardChoicesForScenario("nonPlayer");
        
        this._CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(window.gameHandler.playerId,1);
        
        this._CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart("nonPlayer",4);
        
        this._AttachOnClickCardChoiceToDOMs();
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
        
        console.log(cardSlotArtists);
        
        for(const artist of cardSlotArtists){
            
            const artistDOM = artist.GetAuthorizedDOMs();
            
            const nameSlot = document.createElement("span");
            
            nameSlot.id = playerId + "CardNameSlot" + artistDOM.style.gridRowStart;
            
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
}

export function AddGag101Scenario(scenarioName){
    
    const scenarioHandler = window.gameHandler.scenarioHandler;
    
    scenarioHandler.AddPeriod(scenarioName); //should be a gagPeriodHandler
    
    const scenario =  scenarioHandler.GetLastCreatedPeriod();
    
    scenario.AddSubPeriodHandlerToPeriod("phase");
    
    return scenarioHandler.GetLastCreatedPeriod()
    
}