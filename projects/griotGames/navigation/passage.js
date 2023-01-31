import {passageFxHandler} from "./passageFXHandler.js";

class source
{
    constructor(id){
        
        this.id = id;
        this.allusionWords = [];
    }
    
    SetAllusionWords(arr){
        
        for(const word of arr){
            
            if(!word.hasOwnProperty("text") || !word.hasOwnProperty("frequency")){
                
                console.error(`SetAllusionWords: ${word} is missing text or frequency!`);
            }
            
            this.allusionWords.push(word);
        }
    }
    
    AddAllusionWord(wordObj){
        
        if(!typeof wordObj == "Object") console.error(`passed non-object: passed a ${typeof wordObj}`);
        
        this.allusionWords.push(wordObj);
    }
}

export class sourceHandler
{
    constructor(){
        
        this.sources = [];
    }
}

export class passage
{
    constructor(id){
        
        this.id = id;
        this.text;
        this.passageFxHandler = new passageFxHandler();
        this.sources = [];
        this.usedKeywords = [];
    }
    
    SetText(text){
        
        this.text = text;
    }
    
    AddSource(id){
        
        const $source = new source(id);
        
        window.gameHandler.sourceHandler.sources.push($source);
        
        this.sources.push($source);
        
        return $source
    }
    
    SetUsedKeywords(arr){
        
        if(arr == null || !Array.isArray(arr)) console.error("passed non or null arr");
        
        this.usedKeywords = arr;
    }
    
}