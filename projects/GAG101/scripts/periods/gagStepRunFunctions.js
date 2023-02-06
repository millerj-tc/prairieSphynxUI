import {charData} from "../data/charData.js";

export function ActivateDuplicateCards(){
    
    for(const c of this.cardHandler.GetCards()){
        
        for(const c2 of this.cardHandler.GetCards()){
            
            if(c.name == c2.name && c != c2){
                
                c.Activate();
            }
        }
    }
}

export function GetAndActivateAllPhaseCards(){
    
    const phase = this.GetSuperPeriodByType("phase");
    
    const phaseCards = phase.cardHandler.GetCards();
    
    for(const c of phaseCards){
        
        const card = this.cardHandler.AddCard(c);
        
        card.Activate();
    }
    
    
}

export function DeactivateDupedCharsWhoLoseDupeContest(){
    
    let dupeArr = _GetDupeCards(this);
    
    dupeArr = dupeArr.filter(c => c.dataType == "char");
    
    const pairArrArr = _GetPairArrs(dupeArr);
    
    for(const pair of pairArrArr){
        
        const deactivatedCards = [];
        
        const pair0Rating = _GetTeamRatingForCharInScenarioForStep(pair[0],this);
        
        const pair1Rating = _GetTeamRatingForCharInScenarioForStep(pair[1],this);
        
        if(pair0Rating > pair1Rating){
            
            deactivatedCards.push(pair[1]);
        }
        
        else if(pair1Rating > pair0Rating){
            
            deactivatedCards.push(pair[0]);
        }
        else{
            
            deactivatedCards.push(pair[0]);
            deactivatedCards.push(pair[1]);
        }
        
        
        _DeactivateCardArrAtLevelForStep(deactivatedCards,"phase",this);

    }
    
    
}

function _DupeContestOutput(contestLoserArr){
    
    const artist = gameHandler.narrOutputArtist;
    
    const utilityArtist = gameHandler.uiToolsHandler.utilityUIArtist;
    
    const div = document.createElement("div");
    
    const taggedArr = _ReplaceNounNamesWithImageTagTeamNameAtSize(contestLoserArr);
    
    const charString = utilityArtist.ReturnStringOfNounsBasedOnNumber(gussiedArr);
    
    const outputString = " feel alienated by their team and decide not to participate.";
    
    console.warn("need to go through each team and the characters that sided with them. Also everything above can probably be built into one big function here");
    
    
}

function _GetTeamRatingForCharInScenarioForStep(char,step){
    
    let teamRating = 0;
    
    const scenario = step.GetSuperPeriodByType("scenario");
    
    let teammates = _GetCardTeammatesAtLevelForStep(char,"scenario",step);
    
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

function _GetCardTeammatesAtLevelForStep(card,level,step){
    
    let searchArr;
    
    const returnArr = [];
    
    if(level == "step") searchArr = step.cardHandler.GetCards("active");
    if(level == "phase") searchArr = step.GetSuperPeriodByType("phase").cardHandler.GetCards("active");
    if(level == "scenario") searchArr = step.GetSuperPeriodByType("scenario").cardHandler.GetCards("active");
    
    for(const c of searchArr){
        
        if(c.owner == card.owner && c.name != card.name) returnArr.push(c);
    }
    
    return returnArr
}

function _DeactivateCardArrAtLevelForStep(cardArr,level,step){
    
    for(const c of cardArr){
        
        const superPeriod = step.GetSuperPeriodByType(level);
        
        for(const card of superPeriod.cardHandler.GetCards("active")){
            
            if(card.name == c.name && card.owner == c.owner){
                
                card.Deactivate();
            }
        }
    }
}

function _AddDebugInfoToCards(cardArr){
    
    for(const c of cardArr){
        
        c.debugName = c.name;
        c.debugOwner = c.owner;
    }
}

function _ReplaceNounNamesWithImageTagTeamNameAtSize(nounArr,size){
    
    const returnArr = [];
    
    for(const n of nounArr){
        
        console.warn("careful where you put other non-char nouns or this will break");
        
        for(const c of charData){
            
            if(n.name == c.name){
                
                returnArr.push(`$$IMAGE:${c["image" + size]}IMAGE$$ ${c.name}`);
            }
        }
    }
    
    return returnArr
}