import {character} from "./character.js";

export class characterHandler{
    
    constructor(){
        
        this.characters = [];
    }
    
    AddCharacter(id,name,pronouns){
        
        const $char = new character(id,name,pronouns);
        
        this.characters.push($char);
        
        return $char
    }
    
    GetCharacterById(id){
        
        for(const char of this.characters){
            
            if(char.id == id) return char
        }
    }
}