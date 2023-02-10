import {charData} from "../../data/charData.js";
import * as uiPhaseUtils from "./uiPhaseUtils.js";
import * as cardInfoPhaseUtils from "./cardInfoPhaseUtils.js";

export function DupeConkLosers(){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    let dupeArr = _GetDupeCards();
    
    dupeArr = dupeArr.filter(c => c.dataType == "char");
    
    const pairArrArr = _GetPairArrs(dupeArr);
    
    for(const pair of pairArrArr){
        
        console.log(pair[0]);
        
        console.log(pair[1]);
        
        const pair0Rating = _GetTeamRatingForCharInScenarioForStep(pair[0],this);
        
        const pair1Rating = _GetTeamRatingForCharInScenarioForStep(pair[1],this);
        
        if(pair0Rating > pair1Rating){
            
            _DupeConkCardMatchingNameAndOwnerForStep(pair[1].name,pair[1].owner);
        }
        
        else if(pair1Rating > pair0Rating){
            
            _DupeConkCardMatchingNameAndOwnerForStep(pair[0].name,pair[0].owner);
        }
        else{
            
            pair[0].SetProp("doubleDupeConk",1,"DupeConk Losers");
            pair[1].SetProp("doubleDupeConk",1,"DupeConk Losers");
            pair[0].SetProp("dupeConk",1,"DupeConk Losers");
            pair[1].SetProp("dupeConk",1,"DupeConk Losers");
        }

    }
    
    const dupeConkedCards = cardHandler.GetCards().filter(c => c.GetProp("dupeConk") == 1);
    
    for(const c of cardHandler.GetCards()){
        
    }
    
    _DupeContestOutput(dupeConkedCards);
    
    
}

export function RemoveDupeConkStatuses(){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    for(const c of cardHandler.GetCards()){
        
        c.SetProp("dupeConk",0,"Remove DupeConk Statuses");
        c.SetProp("doubleDupeConk",0,"Remove DupeConk Statuses");
    }
}

function _DupeConkCardMatchingNameAndOwnerForStep(name,owner){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    for(const c of cardHandler.GetCards()){
        
        if(c.name == name && c.owner == owner) c.SetProp("dupeConk",1,"DupeConk Losers")
    }
}

function _DupeContestOutput(contestLoserArr){
    
    const artist = window.gameHandler.narrOutputArtist;
    
    const utilityUIArtist = window.gameHandler.uiToolsHandler.utilityUIArtist;
    
    let doubleDupeConkers = contestLoserArr.filter(c => c.GetProp("doubleDupeConk") ==1);
    
    doubleDupeConkers = doubleDupeConkers.sort();
    
    doubleDupeConkers = doubleDupeConkers.slice(doubleDupeConkers.length/2); // remove duplicates from doubleDupeConkers
    
    const singleDupeConkers = contestLoserArr.filter(c => (c.GetProp("dupeConk") == 1 && c.GetProp("doubleDupeConk") != 1));
    
    console.log(doubleDupeConkers);
    
    console.log(singleDupeConkers);
    
    ///
    
    const neitherDOM = document.createElement("div");
    
    const doubleDupeConkersSpan = uiPhaseUtils.GetSpanListOfCharImageNameTeam(doubleDupeConkers,artist.imageSize);
    
    neitherDOM.append(doubleDupeConkersSpan);
    
    const neitherUnpluralizedString = ` can't decide who to side with! [p[[they]/they]p] are sitting this one out.`;
    
    let neitherPluralizedString = utilityUIArtist.ReplaceWordsBasedOnPluralSubjects(doubleDupeConkers,neitherUnpluralizedString);
    
    if(doubleDupeConkers.length == 1) neitherPluralizedString = utilityUIArtist.ReplacePronouns(doubleDupeConkers[0],neitherPluralizedString);
    
    const neitherCapitalizedString = utilityUIArtist.CapitalizeLettersAfterAppropriatePunctuation(neitherPluralizedString);
    
    neitherDOM.append(neitherCapitalizedString);
    
    if(doubleDupeConkers.length > 0) artist.AppendElementWithinDOM(neitherDOM);
    
    ///
    
    const playerDOM = document.createElement("div");
    
    const playerControlledLosers = singleDupeConkers.filter(c => c.owner == window.gameHandler.playerId);
    
    const playerControlledLosersSpan = uiPhaseUtils.GetSpanListOfCharImageNameTeam(playerControlledLosers,artist.imageSize);
    
    playerDOM.append(playerControlledLosersSpan);
    
    const playerUnpluralizedString = ` [p[decides/decide]p] to side with the left team.`;
    
    const playerPluralizedString = utilityUIArtist.ReplaceWordsBasedOnPluralSubjects(playerControlledLosers,playerUnpluralizedString);
    
    playerDOM.append(playerPluralizedString);
    
    if(playerControlledLosers.length > 0) artist.AppendElementWithinDOM(playerDOM);
    
    ///
    
    const nonPlayerDOM = document.createElement("div");
    
    const nonPlayerControlledLosers = singleDupeConkers.filter(c => c.owner != window.gameHandler.playerId);
        
    const nonPlayerControlledLosersSpan = uiPhaseUtils.GetSpanListOfCharImageNameTeam(nonPlayerControlledLosers,artist.imageSize);
    
    nonPlayerDOM.append(nonPlayerControlledLosersSpan);
    
    const nonPlayerUnpluralizedString = ` [p[decides/decide]p] to side with the right team.`;
    
    const nonPlayerPluralizedString = utilityUIArtist.ReplaceWordsBasedOnPluralSubjects(nonPlayerControlledLosers,nonPlayerUnpluralizedString);
    
    nonPlayerDOM.append(nonPlayerPluralizedString);
        
    if(nonPlayerControlledLosers.length > 0) artist.AppendElementWithinDOM(nonPlayerDOM);
    
}

function _GetTeamRatingForCharInScenarioForStep(char){
    
    let teamRating = 0;
    
    let teammates = cardInfoPhaseUtils.GetCardSelectedTeammates(char);
    
    teammates = teammates.filter(c => c.dataType == "char");
    
    teammates = teammates.filter(c => c.name != char.name);
    
    for(const cha of teammates){
        
        teamRating += cha.GetProp("charisma","number");
        
        let cunningPenalty = Math.abs(cha.GetProp("cunning","number") - char.GetProp("cunning","number"));
        
        teamRating += cunningPenalty;
    }
        
    return teamRating;
}

function _GetDupeCards(){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    const returnArr = [];
    
    console.log(cardHandler.GetCards()); 
    
    for(const c of cardHandler.GetCards()){
        
        for(const c2 of cardHandler.GetCards()){
            
            if(c.name == c2.name && c.owner != c2.owner && c.selectedForTeam == true && c2.selectedForTeam == true){
                
                returnArr.push(c);
            }
        }
    }
    
    return returnArr
}

function _GetPairArrs(dupeCardsArr){
    
    const returnArr = [];
    
    for(const c of dupeCardsArr){
        
        for(const c2 of dupeCardsArr){
            
            let dupeMatch = false
            
            if(c.name == c2.name && c != c2){
                
                for(const pair of returnArr){
                    
                    if((pair[0] == c && pair[1] == c2) ||(pair[0] == c2 && pair[1] == c)) dupeMatch = true;
                }
                
                if(!dupeMatch){
                    
                    returnArr.push([c,c2]);
                }
            }
        }
    }
    
    return returnArr
}

