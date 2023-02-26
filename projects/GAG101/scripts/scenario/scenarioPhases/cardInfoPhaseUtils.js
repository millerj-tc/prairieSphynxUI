export function GetCardSelectedTeammates(card,enemies = false){
    
    const returnArr = [];
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    for(const c of cardHandler.GetCards()){
        
        if(c.owner == card.owner && c.name != card.name && c.selectedForTeam == true && !enemies) returnArr.push(c);
        else if(c.owner != card.owner && c.name != card.name && c.selectedForTeam == true && enemies) returnArr.push(c);
    }
    
    return returnArr
}

export function GetSelectedCardsFor(owner = "any"){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    const returnArr = [];
    
    for(const c of cardHandler.GetCards()){
                
        if(c.selectedForTeam){
            
            if(owner != "any" && c.owner != owner) continue

            returnArr.push(c);
        }
        
    }
    
    return returnArr
}

export function GetCardByNameOwnerSelectedForTeam(name,owner,selectedForTeam = true){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    for(const c of cardHandler.GetCards()){
                
        if(c.name == name && c.owner == owner){
            
            if(selectedForTeam && !c.selectedForTeam) continue
            
            return c
        }
    }
}

export function GetSelectedForContenderWithDupeconkStatus(contenderNum, dupeconk = false){
    
    const gh = window.gameHandler;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    const contender = rp.contenders[contenderNum];
    
    let contenderCards = GetSelectedCardsFor(contender.playerId);
    
    if(!dupeconk) return contenderCards.filter(c => c.GetProp("dupeConk") != 1);
    
    if(dupeconk) return contenderCards.filter(c => c.GetProp("dupeConk") == 1);
}

export function SortCharArrByProp(charArr,prop,descending = true){
    
    if(descending) return charArr.sort(function(a,b){return b.GetProp(prop) - a.GetProp(prop)})
    
    if(!descending) return charArr.sort(function(a,b){return a.GetProp(prop) - b.GetProp(prop)})
}

export function GetCardContenderNum(card){
    
     const gh = window.gameHandler;
    
    const rp = gh.scenarioHandler.GetCurrentScenario().GetCurrentRunProcessor();
    
    for(let i = 0; i < rp.contenders.length; i++){
        
        if(card.owner == rp.contenders[i].playerId) return i
    }
    
    
}