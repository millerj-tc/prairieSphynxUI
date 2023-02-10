export function GetCardSelectedTeammates(card,enemies = "false"){
    
    const returnArr = [];
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    for(const c of cardHandler.GetCards()){
        
        if(c.owner == card.owner && c.name != card.name && c.selectedForTeam == "true" && !enemies) returnArr.push(c);
        else if(c.owner != card.owner && c.name != card.name && c.selectedForTeam == "true" && enemies) returnArr.push(c);
    }
    
    return returnArr
}