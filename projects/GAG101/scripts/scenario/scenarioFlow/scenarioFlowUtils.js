export function DisplayActiveCardsAsChoices(period){
    
    const gh = window.gameHandler;
    
    gh.dimmerArtist.SetDOMDisplayTo("flex");
    
    gh.cardChoiceGridArtist.SetDOMDisplayTo("grid");
    
    period.LoadCards();
    
    const activeCards = period.cardHandler.GetCards("active");
    
    console.log(period);
    
    console.log(gh.cardChoiceGridArtist);
    
    for(const c of activeCards){
        
        const i = document.createElement("img");
        
        i.src = c.imageL;
        
        gh.cardChoiceGridArtist.AppendElementWithinDOM(i);
    }
    
}