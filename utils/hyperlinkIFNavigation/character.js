import {poem} from "./../poemRememberer/poemMemoryHandler.js";
import {GetElementById,SetInnerTextTo,ClearInnerHTML} from "./../ui.js";
import {ReplaceNReturnWithBr} from "./../uiUtils.js";

export class character
{
    constructor(id,name,pronouns = "they"){
        
        this.id = id;
        this.name = name;
        
        if(pronouns == "he"){
            
            this.pronouns = {they: "he", them: "him", their: "his", theirs: "his", themself: "himself", are:"is"};

        }
        else if(pronouns == "she"){
            
            this.pronouns = {they: "she", them: "her", their: "her", theirs: "hers", themself: "herself",are:"is"};
        }
    
        else if(pronouns == "they"){
            
            this.pronouns = {they: "they", them: "them", their: "their", theirs: "theirs", themself: "themself",are:"are"};   
        }
    }
    
    GetCharacterName(){
        
        if(this.identityRevealed) return this.name;
        
        else return this.unrevealedDescription;
    }
    
    GetPronouns(){
        
        return this.pronouns;
    }