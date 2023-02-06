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

export function Console(){
    
    const char = this.cardHandler.GetCards()[0];
    
    console.log(char);
    
    console.log(_GetCardTeammatesAtLevelForStep(char,"scenario",this));
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