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

export function DeactivateDupedCardsWhoLoseDupeContest(){
    
    const dupeArr = _GetDupeCards(this);
    
    console.log(_GetPairArrs(dupeArr));
}

function _GetDupeCards(step){
    
    const returnArr = [];
    
    for(const c of step.cardHandler.GetCards()){
        
        for(const c2 of step.cardHandler.GetCards()){
            
            if(c.name == c2.name && c != c2){
                
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
                
                    c.debugDisplay = c.name;
                    c2.debugDisplay = c2.name;
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

function _DeactivateCardArrAtLevel(cardArr,level,step=this){
    
    for(const c of cardArr){
        
        const superPeriod = step.GetSuperPeriodByType(level);
        
        for(const card of superPeriod.cardHandler.GetCards("active")){
            
            if(card.name == c.name && card.owner == c.owner){
                
                card.Deactivate();
            }
        }
    }
}