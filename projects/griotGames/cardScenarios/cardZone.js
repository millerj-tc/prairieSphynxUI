import {ShuffleArray} from "./utils.js";

class cardSlot
{
    constructor(cardZone,alignment="left",selectId,imageSpanId){
        
        this.cardZone = cardZone;
        this.alignment = alignment;
        this.imageSpanId = imageSpanId;
        this.selectId = selectId;
        this.subSlots = [];
        this.card;
    }
    
    UpdateCard(card){
        
        this.card = card;
        
        this.card.data = card.data;
        
        this.card.alignment = this.alignment;
        this.card.cardZone = this.cardZone;
        
        if(!this._ValidateCardUnlockedForTeam(this.card,this.card.alignment)) console.error(this.card.name + " is not unlocked for " + this.card.alignment + "!!!");
        
        if(this.imageSpanId != undefined)                                                                                                                                              this.cardZone.cardZoneHandler.scenario.scenarioHandler.gameHandler.uiHandler.UpdateCardImage(this);
    }
    
    _ValidateCardUnlockedForTeam(card,team){
        
        if(card.unlocked.includes(team)) return true
        else return false
    }
}

class cardZone
{
    constructor(cardZoneHandler,id,img)
    {
        this.id = id;
        this.image = img;
        this.cardZoneHandler = cardZoneHandler;
        this.displayName = "";
        
        this.cardSlots = [];
        
        this.unslottedCards = [];
        
        //this.chars = [];
    }
    
    AddCardSlot(alignment,selectId,imageSpanId){
        
        const $slot = new cardSlot(this,alignment,selectId,imageSpanId);
        
        this.cardSlots.push($slot);        
        
        return $slot
    }
    
    GetCardsHere(name="any",alignment="any", getUnslotted = true){
        
        let $returnArr = [];
        
        for(const slot of this.cardSlots){
            
            if(slot.card.removedDuringRun) {continue}
            
            if(name != "any" && slot.card.name != name) continue
            if(alignment == "any" || slot.card.alignment == alignment) $returnArr.push(slot.card)
            


        }
        
        if(getUnslotted){
        
            for(const card of this.unslottedCards){

                if((card.name == name || name == "any") &&
                    (card.alignment == alignment || alignment == "any")) $returnArr.push(card);
            }
        }
        
        return $returnArr
    }
    
    CardHasAllyNamed(cardName,allyName){
        
        for(const card of this.GetCardsHere(cardName,"any",true)){
            
            if(this.GetCardsHere(allyName,card.alignment,true).length > 0) return true
        }
        
        return false
    }
    
    
    
    RemoveCardDuringRun(card){
        
        for(const slot of this.cardSlots){
            
            if(slot.card == card){
                

                
                slot.card.removedDuringRun = true;
            }
        }
        
        for(const unslottedCard of this.unslottedCards){
            
            if(card == unslottedCard) this.unslottedCards = this.unslottedCards.filter(c => c != card);
        }
    }
    
    AddUnslottedCard(card){
        
        const $card = this.cardZoneHandler.scenario.GetScenarioCard(card.data.name);
        
        $card.data = card.data;
        
        this.unslottedCards.push($card);
    }
}

export class cardZoneHandler
{
    constructor(scenario){
        
        this.scenario = scenario;
        this.cardZones = [];
    }
    
    AddCardZone(id,img,cardSlotsCount,bgColor){
        
        const $czone = new cardZone(this,id,img);
        this.cardZones.push($czone);
        $czone.bgColor = bgColor;
        $czone.cardSlotsCount = cardSlotsCount;
        
        //this.scenario.scenarioHandler.gameHandler.uiHandler.CreateczoneationRow($czone,charSlots,bgColor);
        
        return $czone
    }
    
    GetCardZoneById(id){
        
        //console.log(this.cardZones);
        
        for(const czone of this.cardZones){
            
            if(czone.id == id) return czone
        }
    }
    
    GetAllCardsAtCardZones(team="any"){
        
        let $allCards = [];
        
        for(const czone of this.cardZones){
            
            for(const slot of czone.cardSlots){
                
                if(slot.character.removedDuringRun) continue
                
                if(team == "any") $allCards.push(slot.character);
                else if (slot.character.data.alignment == team) $allCards.push(slot.character);
            }
        }
        
        return $allCards
    }
    
    _GetUnlockedCardsNotAssignedToASlot(alignment = "any",unlockedFor = "both"){
        
        let $returnArr = this.scenario.GetAllCards(unlockedFor);
        
        for(const czone of this.cardZones){
            
            for(const slot of czone.cardSlots){
                
                if(slot.alignment != alignment && alignment != "any") continue
                
                if(slot.card == undefined) continue
                
                $returnArr = $returnArr.filter(c => slot.card.data.name != c.data.name)
            }
        }
        

        
        return $returnArr
    }
    
    RandomizeSlotsWithNoSaveData(){
        

        
        let $destructoArrLeft = ShuffleArray(this._GetUnlockedCardsNotAssignedToASlot("left","left"));
        
        let $destructoArrRight = ShuffleArray(this._GetUnlockedCardsNotAssignedToASlot("right","right"));
        
        for(const czone of this.cardZones){
            
            for(const slot of czone.cardSlots){
                
                if(slot.card != null) continue
                
                let $chosenCard;
                
                if(slot.alignment == "left") {
                    
                    $chosenCard = $destructoArrLeft.shift();
                    
                }
                else {
                    
                    $chosenCard = $destructoArrRight.shift();
                }
                
                

                
                const $selectorDOM = document.getElementById(slot.selectId);
                
                this.scenario.scenarioHandler.gameHandler.uiHandler.SetSelectorToCard($selectorDOM,$chosenCard);
                
                slot.UpdateCard($chosenCard);
                

                
            }
        }

    }
}