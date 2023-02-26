import {charData} from "../../data/charData.js";
import * as uiPhaseUtils from "./uiPhaseUtils.js";
import * as cardInfoPhaseUtils from "./cardInfoPhaseUtils.js";

export function DupeConkLosers(){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    let dupeArr = _GetDupeCards();
    
    dupeArr = dupeArr.filter(c => c.dataType == "char");
    
    const pairArrArr = _GetPairArrs(dupeArr);
    
    for(const pair of pairArrArr){
        
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
            console.log(`double dupeconked ${pair[0].name},${pair[1].name} for ${pair[0].owner},${pair[1].owner}`); 
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
        
        if(c.name == name && c.owner == owner) {
            
            c.SetProp("dupeConk",1,"DupeConk Losers");
            console.log(`dupeconked ${c.name} for ${c.owner}`);   
        }
    }
}

function _DupeContestOutput(contestLoserArr){
    
    const gh = window.gameHandler;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    const contender0 = rp.contenders[0];
    
    const contender1 = rp.contenders[1];
    
    const artist = window.gameHandler.narrOutputArtist;
    
    const utilityUIArtist = window.gameHandler.uiToolsHandler.utilityUIArtist;
    
    let doubleDupeConkers = contestLoserArr.filter(c => c.GetProp("doubleDupeConk") ==1);
    
    doubleDupeConkers.sort(function (a, b) {
      if (a.owner < b.owner) {
        return -1;
      }
      if (a.owner > b.owner) {
        return 1;
      }
      return 0;
    });
        
    doubleDupeConkers = doubleDupeConkers.slice(doubleDupeConkers.length/2); // remove duplicates from doubleDupeConkers
        
    const singleDupeConkers = contestLoserArr.filter(c => (c.GetProp("dupeConk") == 1 && c.GetProp("doubleDupeConk") != 1));
    
    ///
    
    const neitherDOM = document.createElement("div");
    
    
    if(doubleDupeConkers.length > 0){
        
        uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]name] can't decide who to side with! ~s0~[p0[they]]/they~~ [p0[are]] sitting this one out.",doubleDupeConkers);
        
        artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>")
        
    }
    
    
    const leftLosers = singleDupeConkers.filter(c => c.owner == contender0.playerId);
    
    
    if(leftLosers.length > 0){
        
        uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]name] ~s0~decides/decide~~ to side with the right team!",leftLosers);
        
         artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>")
    }
    
    ///
    
    
    const rightLosers = singleDupeConkers.filter(c => c.owner == contender1.playerId);
        
    if(rightLosers.length > 0){ 
    
        uiPhaseUtils.OutputTextDivWithNounImages("[arg0[]name] ~s0~decides/decide~~ to side with the left team!",rightLosers);
        
         artist.InsertHTMLAdjacentToDOM("beforeend","<br><br>")
    }
    
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

