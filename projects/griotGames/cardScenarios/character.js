import {card} from "./card.js";

export class character extends card
{
    constructor(scenario){
        
        super(scenario);
        this._AddAdditionalProperties = this.AddGenericPropertiesChar;
    }
    
    AddGenericPropertiesChar(){

            this.data.xp = {left:0,right:0};
            this.data.immuneSys = []; //immuneSys is going to be the holder for received statusFX
    }
    
    GetName() {return this.data.name}
    
    GetImage(size = "S"){
        
        if(size == "S") return this.data.imageS
        else if(size == "M") return this.data.imageM
        else if(size == "L") return this.data.imageL
        else console.warn("GetImage has failed for " + this.data.name);   
    }
    
    GetPronouns() {return this.data.pronouns}
}