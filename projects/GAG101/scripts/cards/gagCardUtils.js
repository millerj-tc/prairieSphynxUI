export function LoadCardArrIntoObjCardHandler(cardArr,obj,owner=null){

    for(const c of cardArr){

        const card = obj.cardHandler.AddCard(c); //It's important to use AddCard() rather than just declaring cardHandler.cards = [arr] in order to get disposable copies
        
        card.Deactivate(); //cards must be deactivated as they are passed so that the next period can determine whether or not they need them
        
        if(owner != null) card.owner = owner;
    }
}

export function 
    
    