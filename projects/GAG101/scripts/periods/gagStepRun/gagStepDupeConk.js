import {charData} from "../../data/charData.js";
import * as gagStepRunFunctions from "./gagStepRunFunctions.js";

export function DupeConkLosers(){
    
    let dupeArr = _GetDupeCards(this);
    
    dupeArr = dupeArr.filter(c => c.dataType == "char");
    
    const pairArrArr = _GetPairArrs(dupeArr);
    
    const deactivatedCards = [];
    
    for(const pair of pairArrArr){
        
        gagStepRunFunctions.AddDebugInfoToCards(pair);
        
        console.log(pair[0]);
        
        console.log(pair[1]);
        
        const pair0Rating = _GetTeamRatingForCharInScenarioForStep(pair[0],this);
        
        const pair1Rating = _GetTeamRatingForCharInScenarioForStep(pair[1],this);
        
        if(pair0Rating > pair1Rating){
            
            _DupeConkCardMatchingNameAndOwnerForStep(pair[1].name,pair[1].owner,this);
        }
        
        else if(pair1Rating > pair0Rating){
            
            _DupeConkCardMatchingNameAndOwnerForStep(pair[0].name,pair[0].owner,this);
        }
        else{
            
            pair[0].immuneSys.DoubleDupeConk();
            pair[1].immuneSys.DoubleDupeConk();
        }

    }
    
    const dupeConkedCards = this.cardHandler.GetCards().filter(c => c.immuneSys.IsDupeConked());
    
    _DupeContestOutput(dupeConkedCards);
    
    
}

function _DupeConkCardMatchingNameAndOwnerForStep(name,owner,step){
    
    for(const c of step.cardHandler.GetCards()){
        
        if(c.name == name && c.owner == owner) c.immuneSys.DupeConk();
    }
}

function _DupeContestOutput(contestLoserArr){
    
    const artist = window.gameHandler.narrOutputArtist;
    
    const utilityUIArtist = window.gameHandler.uiToolsHandler.utilityUIArtist;
    
    let doubleDupeConkers = contestLoserArr.filter(c => c.immuneSys.IsDoubleDupeConked());
    
    doubleDupeConkers = doubleDupeConkers.sort();
    
    doubleDupeConkers = doubleDupeConkers.slice(doubleDupeConkers.length/2); // remove duplicates from doubleDupeConkers
    
    const singleDupeConkers = contestLoserArr.filter(c => !c.immuneSys.IsDoubleDupeConked());
    
    console.log(doubleDupeConkers);
    
    console.log(singleDupeConkers);
    
    ///
    
    const neitherDOM = document.createElement("div");
    
    const doubleDupeConkersSpan = gagStepRunFunctions.GetSpanListOfCharImageNameTeam(doubleDupeConkers,artist.imageSize);
    
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
    
    const playerControlledLosersSpan = gagStepRunFunctions.GetSpanListOfCharImageNameTeam(playerControlledLosers,artist.imageSize);
    
    playerDOM.append(playerControlledLosersSpan);
    
    const playerUnpluralizedString = ` [p[decides/decide]p] to side with the left team.`;
    
    const playerPluralizedString = utilityUIArtist.ReplaceWordsBasedOnPluralSubjects(playerControlledLosers,playerUnpluralizedString);
    
    playerDOM.append(playerPluralizedString);
    
    if(playerControlledLosers.length > 0) artist.AppendElementWithinDOM(playerDOM);
    
    ///
    
    const nonPlayerDOM = document.createElement("div");
    
    const nonPlayerControlledLosers = singleDupeConkers.filter(c => c.owner != window.gameHandler.playerId);
        
    const nonPlayerControlledLosersSpan = gagStepRunFunctions.GetSpanListOfCharImageNameTeam(nonPlayerControlledLosers,artist.imageSize);
    
    nonPlayerDOM.append(nonPlayerControlledLosersSpan);
    
    const nonPlayerUnpluralizedString = ` [p[decides/decide]p] to side with the right team.`;
    
    const nonPlayerPluralizedString = utilityUIArtist.ReplaceWordsBasedOnPluralSubjects(nonPlayerControlledLosers,nonPlayerUnpluralizedString);
    
    nonPlayerDOM.append(nonPlayerPluralizedString);
        
    if(nonPlayerControlledLosers.length > 0) artist.AppendElementWithinDOM(nonPlayerDOM);
    
}

function _GetTeamRatingForCharInScenarioForStep(char,step){
    
    let teamRating = 0;
    
    const scenario = step.GetSuperPeriodByType("scenario");
    
    let teammates = gagStepRunFunctions.GetCardTeammatesAtLevelForStep(char,"scenario",step);
    
    teammates = teammates.filter(c => c.dataType == "char");
    
    teammates = teammates.filter(c => c.name != char.name);
    
    for(const cha of teammates){
        
        teamRating += cha.charisma;
        
        let cunningPenalty = Math.abs(char.cunning - cha.cunning);
        
        teamRating += cunningPenalty;
    }
    
    return teamRating;
}

function _GetDupeCards(step){
    
    const returnArr = [];
    
    console.log(step.cardHandler.GetCards()); 
    
    for(const c of step.cardHandler.GetCards()){
        
        for(const c2 of step.cardHandler.GetCards()){
            
            if(c.name == c2.name && c.owner != c2.owner){
                
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

