import {charData} from "../../data/charData.js";

export function OutputTextDivWithNounImages(string){
    
    //"[argNN[name (for image)]team]: Welcome to the Dance of Riddles, [arg0[(use GetSpanList)/team/name]]
    
    let returnString = string;
    
    const gh = window.gameHandler;
    
    const utilityArtist = gameHandler.uiToolsHandler.utilityUIArtist;
    
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
    
    const returnSpan = utilityArtist.GetSpanWithImageTagsReplacedWithImagesFromText(returnString)
     
    gh.narrOutputArtist.AppendElementWithinDOM(returnSpan);
    
    return returnSpan

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
    
    for(const n of nounArr){
                
        returnArr.push(GetNounUtilArtistImageTagAtSize(n,size,team,name));
    }
    
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
    
    if(artist.associatedCard != null){
        artist.associatedCard.selectedForTeam = false;
        artist.nameSlotArtist.SetDOMInnerTextTo(card.name);
    }
    
    UpdateCardSlotArtist(artist,card);
    
    card.selectedForTeam = true;
    
    
}

export function UpdateCardSlotArtist(artist,card,size="M"){
        
    

    artist.ClearAllChildren();

    artist.SetCustomArtistPropToValue("associatedCard",card);

    const img = document.createElement("img");

    img.src = card["image" + size];

    artist.AppendElementWithinDOM(img);
    
    artist.nameSlotArtist.SetDOMInnerTextTo(card.name);
}

export function AnnounceOtherPlayer(){
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const runP = scenario.GetCurrentRunProcessor();
    
    const player0Username = runP.contenders[0].playerUsername;
    
    const player0Id = runP.contenders[0].playerId;
    
    const player1Username = runP.contenders[1].playerUsername;
    
    const player1Id = runP.contenders[1].playerId;
    
    const player0Cards = window.gameHandler.collectionCardHandler.GetCards(player0Id).filter(c => c.selectedForTeam);
    
    const player1Cards = window.gameHandler.collectionCardHandler.GetCards(player1Id).filter(c => c.selectedForTeam);
    
    const artist = window.gameHandler.narrOutputArtist;
    
    console.log(player0Cards);
    
    console.log(player1Cards);
    
    const announceSpan = OutputTextDivWithNounImages(`${player0Username} [arg0[]] VS [arg1[]] ${player1Username} `,player0Cards,player1Cards);
    
    artist.InsertHTMLAdjacentToDOM("beforeend",`<br><br>`);
    
    const bottomOfPage = document.getElementById("bottomOfPage");
    
    setTimeout(function(){bottomOfPage.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})},50);
}

export function AnnounceTournamentResults(){
    
    const th = window.gameHandler.tournamentHandler;
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const uiTH = window.gameHandler.uiToolsHandler;
    
    const runP = scenario.GetCurrentRunProcessor();
    
    const artist = window.gameHandler.narrOutputArtist;
    
    const defeatedArr = [];
    
    const defeatedByArr = [];
    
    const tiedArr = [];
        
    for(const contender of th.contenders){
        
        if(contender.defeatedByPlayer) defeatedArr.push(contender.playerUsername);
        
        if(contender.defeatedPlayer) defeatedByArr.push(contender.playerUsername);
        
        if(contender.tiedPlayer) tiedArr.push(contender.playerUsername);
    }
    
    const defeatedString = uiTH.utilityUIArtist.ReturnStringOfNounsBasedOnNumber(defeatedArr);
    
    const defeatedByString = uiTH.utilityUIArtist.ReturnStringOfNounsBasedOnNumber(defeatedByArr);
    
    const tiedString = uiTH.utilityUIArtist.ReturnStringOfNounsBasedOnNumber(tiedArr);
    
    OutputTextDivWithNounImages(`You defeated: ${defeatedString}`);
    
    artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    OutputTextDivWithNounImages(`You tied: ${tiedString}`);
    
    artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
    OutputTextDivWithNounImages(`You were defeated by: ${defeatedByString}`);
    
    setTimeout(function(){bottomOfPage.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})},50);
}