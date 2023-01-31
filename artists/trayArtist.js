import {domUIArtist} from "./domUIArtist.js";

export class trayArtist extends domUIArtist
{
    constructor(uiToolsHandler, externalOwnerId = null){
        
        super(uiToolsHandler, externalOwnerId);
        this.toolSubtype = "trayArtist";
        this.axis = null;
        this.openPosition = null;
        this.closedPosition = null;
        this.state = "closed";
        this.transitionTime = 500;
        this.clearOnClose = false;
        this.onFinishOpenFunc = null;
        this.onFinishCloseFunc = null;
        this.toggleCollapseButton = null;
    }
    
    // These methods will all take a single DOM or an array object of DOMs (that's what the _ConvertSingleDOMtoArray accomplishes)
    
    SetTrayTransitionTime(transitionTime,dom = this.authorizedDOMs){

        const $dom = this._ConvertSingleDOMtoArray(dom);
        
        for(const d of $dom){
            
            d.dataset.transitionTime = transitionTime
        }
    }
    
    SetTrayToggleCollapseButtonToDOM(dom){
        
        this.toggleCollapseButton = dom;
    }
    
    SetTrayBeginState(str){
        
        if(str != "open" && str != "closed"){ 
            console.error("tray begin state must be open or closed for");
            console.log(this);
        }
        
        this.state = str;
    }
    
    SetTrayTransitionTime(time){
        
        this.transitionTime = time;
    }
    
    SetTrayToClearOnClose(){
        
        this.clearOnClose = true;
    }
    
    SetTrayAxis(axis){
        
        if(axis != "X" && axis != "Y"){
            
            console.error("set tray axis is not X or Y!");
            console.log(this);
        }
        
        this.axis = axis;
    }
    
    SetTrayOpenClosedPosition(open,closed){
        
        console.warn("could use some validation here")
        
        this.openPosition = open;
        this.closedPosition = closed;
        
        
    }
    
    SetOnFinishOpenFunc(fn){
        
        this.onFinishOpenFunc = fn;
    }
    
    SetOnFinishCloseFunc(fn){
        
        this.onFinishCloseFunc = fn;
    }
    
    BeginTrayClose(dom = this.authorizedDOMs){
        
        const $dom = this._ConvertSingleDOMtoArray(dom);
        
        for(const d of $dom){
            
            this.state = "closing";    
        }
        
        this._ToggleCollapseButton();
        
        this._SetTimeout();
        
        if(this.clearOnClose) this.ClearAllChildren(); 
        
            for(const dm of $dom){
            
            dm.style.transform = `translate${this.axis}(${this.closedPosition})`;
            }
    }
    
    BeginTrayOpen(dom = this.authorizedDOMs){
        
        const $dom = this._ConvertSingleDOMtoArray(dom);
        
        for(const d of $dom){
            
            this.state = "opening";    
        }
        
        this._ToggleCollapseButton();
        
        this._SetTimeout();
        
        for(const d of $dom){
            
            d.style.transform = `translate${this.axis}(${this.openPosition})`;
        }
    }
    
    _FinishTransitioningTray(){
        
        if(this.state == "closing"){
            this.state = "closed";
            this.onFinishCloseFunc();
        }
        if(this.state == "opening"){
            this.state = "open";
            this.onFinishOpenFunc();
        }
    }
    
    _ToggleCollapseButton(){
        
        
    }
    
    _SetTimeout(){
        
        const obj = this;
        
        setTimeout(obj._FinishTransitioningTray,obj.transitionTime);
    }
    
    ErrorCheck(){
        
        super.ErrorCheck();
        
        let errorFound = false;
        
        if(this.toggleCollapseButton == null){
            
            console.error("tray has no collapse button");
            errorFound = true;
        }
        
        if(this.openPosition == null){
            
            console.error("open position of tray is not specified")
            errorFound = true;
        }
        
        if(this.closedPosition == null){
            
            console.error("closed position of tray is not specified")
            errorFound = true;
        }
        
        if(errorFound){
            console.log("~and~");
            console.log(this);
            console.log("~~~~~~~~");
        }
    }
    
}