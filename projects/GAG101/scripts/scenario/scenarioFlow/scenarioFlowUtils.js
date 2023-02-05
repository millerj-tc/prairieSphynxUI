export function DisplayActiveCardsAsChoices(period){
    
    const gh = window.gameHandler;
    
    gh.dimmerArtist.SetDOMDisplayTo("flex");
    
    period.LoadCards();
    
    const scenarioCards = period.cardHandler.GetCards();
    
    console.log(period);
    
    console.log(gh.cardChoiceGridArtist);
    
    for(const c of scenarioCards){
        
        const i = document.createElement("img");
        
        i.src = c.imageL;
        
        gh.cardChoiceGridArtist.AppendElementWithinDOM(i);
    }
    
}