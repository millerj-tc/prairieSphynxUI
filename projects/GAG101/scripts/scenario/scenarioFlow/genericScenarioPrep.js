export function GenericScenarioPrep(scenario){
    
        this.cardHandler.EmptyCards();
    
        this.LoadCards();

        // how to track card changes as the scenario progresses?
    
        // whenever you change a card, demote it to the cardHandlers archive, storing on it the version that replaced it
    
        // when the new card is destroyed, (usually) search through the archive for the id of the newly destoyed card id and return the one from the archive to the main card handler
    
        // replace all these project specific classes (gagCard, immuneSys) with generic classes with declared functions (AddCard = function(){})?
        
        console.warn("display card choice tray here");
        
        this._CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(this.playerCardSlots,window.gameHandler.playerId,2);
        
        this._CreateNCardSlotDOMArtistsForPlayerIdAtGridColumnStart(this.nonPlayerCardSlots,this.otherPlayerId,3);
        
        this._RandomizePlayerIdCardChoicesForScenario();
        
        this._RandomizePlayerIdCardChoicesForScenario(this.otherPlayerId);
        
        this._CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(window.gameHandler.playerId,1);
        
        this._CreateNameDisplayArtistServantsForCardSlotDOMArtistsForPlayerIdAtGridColumnStart(this.otherPlayerId,4);
        
        this._AttachOnClickCardChoiceToDOMs();
        
        this._AddScenarioRunButton();
        
        this.periodHandler.preppedScenario = this;
}