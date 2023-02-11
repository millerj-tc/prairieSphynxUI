import {charData} from "../../data/charData.js";

export function GetSpanListOfCharImageNameTeam(charArr,size){
    
    const utilityArtist = gameHandler.uiToolsHandler.utilityUIArtist;
    
    const taggedArr = ReplaceNounNamesWithImageTagTeamNameAtSize(charArr,size);
    
    const stringBasedOnNumber = utilityArtist.ReturnStringOfNounsBasedOnNumber(taggedArr);
    
    return utilityArtist.GetSpanWithImageTagsReplacedWithImagesFromText(stringBasedOnNumber);
}

export function AddDebugInfoToCards(cardArr){
    
    for(const c of cardArr){
        
        c.debugName = c.name;
        c.debugOwner = c.owner;
    }
}

export function ReplaceNounNamesWithImageTagTeamNameAtSize(nounArr,size="M",noTeam = false){
    
    const returnArr = [];
    
    for(const n of nounArr){
                
//        for(const c of charArr){
            
//            if(n.name == c.name){
                
                let string = `$$IMAGE:${n["image" + size]}IMAGE$$`;
        
                if(noTeam){
                    
                    returnArr.push(string + " " + n.name);
                    continue
                }
                                
                if(n.owner == window.gameHandler.playerId) string = `$$IMAGE:images/chars/leftTeamBar-M.pngIMAGE$$` + string + " " + n.name;
                
                else string = string + `$$IMAGE:images/chars/rightTeamBar-M.pngIMAGE$$` + " " + n.name
                
                returnArr.push(string);
//            }
//        }
    }
    
    return returnArr
}

export function DisplayUnselectedCardsAsChoices(owner){
    
    const gh = window.gameHandler;
    
    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    gh.dimmerArtist.SetDOMDisplayTo("flex");
    
    gh.cardChoiceGridArtist.ClearAllChildren();
        
    const scenarioCards = gh.collectionCardHandler.GetCards();
    
    const ownedAndUnlockedAndUnchosenCards = scenarioCards.filter(c => (c.owner == owner && c.unlockedForPlayer == true && c.selectedForTeam == false));
    
    for(const c of ownedAndUnlockedAndUnchosenCards){
        
        const container = document.createElement("div");
        const i = document.createElement("img");
        const nameSpan = document.createElement("div");
        
        i.src = c.imageL;
        
        nameSpan.innerText = c.name;
        nameSpan.classList.add("nameSlot");
        
        gh.cardChoiceGridArtist.AppendElementWithinDOM(container);
        
        container.append(i);
        container.insertAdjacentHTML("beforeend","<br>");
        container.append(nameSpan);
        
        i.onclick = function(){_OnClickCardSelect(c)}
    }
    
}

function _OnClickCardSelect(card){
    
    const gh = window.gameHandler;
    
    gh.dimmerArtist.SetDOMDisplayTo("none");
    
    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const artist = scenario.lastClickedCardSlotArtist;
    
    UpdateCardSlotArtist(artist,card);
    
    card.selectedForTeam = true;
    
    
}

export function UpdateCardSlotArtist(artist,card){
        
    if(artist.associatedCard != null){
        artist.associatedCard.selectedForTeam = false;
        artist.servantArtist.SetDOMInnerTextTo(card.name);
    }

    artist.ClearAllChildren();

    artist.SetCustomArtistPropToValue("associatedCard",card);

    const img = document.createElement("img");

    img.src = card.imageL;

    artist.AppendElementWithinDOM(img);
}