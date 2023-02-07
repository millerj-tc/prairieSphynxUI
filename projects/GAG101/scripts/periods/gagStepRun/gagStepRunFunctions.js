import {charData} from "../../data/charData.js";

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

export function GetSpanListOfCharImageNameTeam(charArr,size){
    
    const utilityArtist = gameHandler.uiToolsHandler.utilityUIArtist;
    
    const taggedArr = ReplaceNounNamesWithImageTagTeamNameAtSize(charArr,size);
    
    const stringBasedOnNumber = utilityArtist.ReturnStringOfNounsBasedOnNumber(taggedArr);
    
    return utilityArtist.GetSpanWithImageTagsReplacedWithImagesFromText(stringBasedOnNumber);
}


export function GetCardTeammatesAtLevelForStep(card,level,step,enemies = "false"){
    
    let searchArr;
    
    const returnArr = [];
    
    if(level == "step") searchArr = step.cardHandler.GetCards("active");
    if(level == "phase") searchArr = step.GetSuperPeriodByType("phase").cardHandler.GetCards("active");
    if(level == "scenario") searchArr = step.GetSuperPeriodByType("scenario").cardHandler.GetCards("active");
    
    for(const c of searchArr){
        
        if(c.owner == card.owner && c.name != card.name && !enemies) returnArr.push(c);
        else if(c.owner != card.owner && c.name != card.name && enemies) returnArr.push(c);
    }
    
    return returnArr
}

export function DeactivateCardArrAtLevelForStep(cardArr,level,step){
    
    for(const c of cardArr){
        
        const superPeriod = step.GetSuperPeriodByType(level);
        
        for(const card of superPeriod.cardHandler.GetCards("active")){
            
            if(card.name == c.name && card.owner == c.owner){
                
                card.Deactivate();
            }
        }
    }
}

export function AddDebugInfoToCards(cardArr){
    
    for(const c of cardArr){
        
        c.debugName = c.name;
        c.debugOwner = c.owner;
    }
}

export function ReplaceNounNamesWithImageTagTeamNameAtSize(nounArr,size="M"){
    
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