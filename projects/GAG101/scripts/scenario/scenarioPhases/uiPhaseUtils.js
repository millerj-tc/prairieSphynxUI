import {charData} from "../../data/charData.js";

export function OutputTextDivWithNounImages(string){
    
    //"[argNN[name (for image)]team]: Welcome to the Dance of Riddles, [arg01[(use GetSpanList)/team/name]]
    
    let returnString = string;
    
    const gh = window.gameHandler;
    
    const utilityArtist = gameHandler.uiToolsHandler.utilityUIArtist;
    
    const returnDOM = document.createElement("div");
    
    const replacementArr = [];
    
    const nounGroupsArr = Array.from(arguments).slice(1);
    
    returnString = returnString.replace(/\[argN\[(.*?)\](.*?)\]/gm,_OutputTextReplacementFunction);
    
    let matchArr = returnString.match(/\[arg\d\[(.*?)\](.*?)\]/gm);
    
    if(matchArr != null){
    
        for(let i = 0; i < matchArr.length; i++){

            const match = matchArr[i];

            const regex = new RegExp(`\\[arg` + i + `\\[(.*?)\\](.*?)\\]`,"gm");

            let teamBar = false;

            let attachName = false;

            if(match.includes("]team")){

                teamBar = true;
            }

            if(match.includes("name]")){

                attachName = true;
            }

            const replacementString = _GetStringListingNounsBasedOnNumber(nounGroupsArr[i],gh.narrOutputArtist.imageSize,teamBar,attachName);

            returnString = returnString.replace(regex,replacementString); //for some reason replace was removing one "$" at either end so they have been forced in manually

            returnString = utilityArtist.ReplaceWordsBasedOnPluralSubjects(nounGroupsArr[i],returnString,i);

            returnString = utilityArtist.ReplacePronouns(nounGroupsArr[i],returnString,i);

            returnString = utilityArtist.CapitalizeLettersAfterAppropriatePunctuation(returnString);
        }

    }
     
    gh.narrOutputArtist.AppendElementWithinDOM(utilityArtist.GetSpanWithImageTagsReplacedWithImagesFromText(returnString));

}

function _OutputTextReplacementFunction(match,string){
    
    //only works from charData
    
    const gh = window.gameHandler
    
    let returnString;
    
    let teamBar = false;
    
    let attachName = false;
    
    if(match.includes("]team")){
        
        teamBar = true;
    }
    
    if(match.includes("name]")){
        
        attachName = true;
    }
    
    //if(match.includes("[argNN[")){
        
        let nounObj;
        
        for(const noun of charData){
            
            if(noun.name == string) nounObj = noun
        }
        
        returnString = GetNounUtilArtistImageTagAtSize(nounObj,gh.narrOutputArtist.imageSize,teamBar,attachName);
    //}
    
    
    return returnString
}

export function GetSpanListOfCharImageNameTeam(charArr,size,team = true,name = true){ //returns a span DOM element with images embedded
    
    const utilityArtist = gameHandler.uiToolsHandler.utilityUIArtist;
    
    const stringBasedOnNumber = _GetStringListingNounsBasedOnNumber(charArr,size,team,name);
    
    return utilityArtist.GetSpanWithImageTagsReplacedWithImagesFromText(stringBasedOnNumber);
}

function _GetStringListingNounsBasedOnNumber(nounArr,size,team,name){
    
    const utilityArtist = gameHandler.uiToolsHandler.utilityUIArtist;
    
    const taggedArr = ReplaceNounNamesWithImageTagTeamNameAtSize(nounArr,size,team,name);
    
    return utilityArtist.ReturnStringOfNounsBasedOnNumber(taggedArr);
}

export function AddDebugInfoToCards(cardArr){
    
    for(const c of cardArr){
        
        c.debugName = c.name;
        c.debugOwner = c.owner;
    }
}

export function ReplaceNounNamesWithImageTagTeamNameAtSize(nounArr,size="M",team = true,name = true){ //gives you back arr of strings with image tags (references that utilityartist can use with GetSpanWithImageTagsReplacedWithImagesFromText)
    
    const returnArr = [];
    
    console.log(nounArr);
    
    for(const n of nounArr){
                
        returnArr.push(GetNounUtilArtistImageTagAtSize(n,size,team,name));
    }
    
    console.log(returnArr);
    
    return returnArr
}

export function GetNounUtilArtistImageTagAtSize(noun,size="M",team = false, name = false){
    
    let returnString = `##IMAGE:${noun["image" + size]}IMAGE##`;
    
    if(team){
        
        if(noun.owner == window.gameHandler.playerId) returnString = `##IMAGE:images/chars/leftTeamBar-M.pngIMAGE##` + returnString;
        
        else returnString += `##IMAGE:images/chars/rightTeamBar-M.pngIMAGE##`;
    }
    
    if(name) returnString += " " + noun.name;
    
    return returnString
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

    gh.dimmerArtist.GetAuthorizedDOMs().onclick = function(){gh.dimmerArtist.SetDOMDisplayTo("none");}
    
}

function _OnClickCardSelect(card){
    
    const gh = window.gameHandler;
    
    //gh.dimmerArtist.SetDOMDisplayTo("none");
    
    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const artist = scenario.lastClickedCardSlotArtist;
    
    UpdateCardSlotArtist(artist,card);
    
    card.selectedForTeam = true;
    
    
}

export function UpdateCardSlotArtist(artist,card,size="M"){
        
    if(artist.associatedCard != null){
        artist.associatedCard.selectedForTeam = false;
        artist.servantArtist.SetDOMInnerTextTo(card.name);
    }
    
    console.log(artist);

    artist.ClearAllChildren();

    artist.SetCustomArtistPropToValue("associatedCard",card);

    const img = document.createElement("img");

    img.src = card["image" + size];

    artist.AppendElementWithinDOM(img);
}