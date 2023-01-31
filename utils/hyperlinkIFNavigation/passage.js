import {passageFxHandler} from "./passageFXHandler.js";


export class passage
{
    constructor(id){
        
        this.id = id;
        this.text;
        this.passageFxHandler = new passageFxHandler();

    }
    
    SetText(text){
        
        this.text = text;
    }