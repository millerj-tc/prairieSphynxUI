import {domUIArtist} from "./domUIArtist.js";

export class trayArtist extends domUIArtist
{
    constructor(uiToolsHandler, externalOwnerId = null){
        
        super(uiToolsHandler, externalOwnerId);
        this.toolSubtype = "trayArtist";
        this.axis = "X";
        this.openPosition = null;
        this.openButtonText = null;
        this.closeButtonText = null;
        this.openButtonSrc = null;
        this.closeButtonSrc = null;
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
            
            d.dataset.transitionTime = transitionTime;
        }
    }
    
    SetTrayToggleCollapseButtonToDOM(dom){
        
        this.toggleCollapseButton = dom;
        
        const artist = this;
        
        dom.onclick = function(){artist._CollapseButtonOnClick(artist)};
    }
    
    SetTrayToggleCollapseButtonOpenCloseText(openText,closeText){
        
        this.openButtonText = openText;
        this.closeButtonText = closeText;
    }
    
    SetTrayToggleCollapseButtonOpenCloseImg(openSrc,closeSrc){
        
        this.openButtonSrc = openSrc;
        this.closeButtonSrc = closeSrc;
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
    
    _CollapseButtonOnClick(artist){
        
        // "this" will refer to button DOM

        if(artist.state == "open") artist._BeginTrayClose();
        if(artist.state == "closed") artist._BeginTrayOpen();
    }
    
    _BeginTrayClose(dom = this.authorizedDOMs){
        
        const $dom = this._ConvertSingleDOMtoArray(dom);
        
        for(const d of $dom){
            
            this.state = "closing";    
        }
        
        this._ToggleCollapseButton();
        
        this._SetTimeout();
        
        if(this.clearOnClose) this.ClearAllChildren(); 
        
            for(const dm of $dom){
            
                const translate = `translate${this.axis}(${this.closedPosition})`
                dm.style.transform = translate;
            }
    }
    
    _BeginTrayOpen(dom = this.authorizedDOMs){

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
    
    _FinishTransitioningTray(artist){
        
        // "this" would refer to window, must be passed self bc timer
        
        if(artist.state == "closing"){
            artist.state = "closed";
            if(artist.onFinishCloseFunc != null) artist.onFinishCloseFunc();
        }
        if(artist.state == "opening"){
            artist.state = "open";
            if(artist.onFinishOpenFunc != null) artist.onFinishOpenFunc();
        }
    }
    
    _ToggleCollapseButton(){
        
        if(this.state == "opening"){
            
            if(this.openButtonText != null) this.toggleCollapseButton.innerText = this.closeButtonText;
            if(this.openButtonSrc != null) this.toggleCollapseButton.firstChild.src = this.closeButtonSrc;    
        }
        
        if(this.state == "closing"){
            
            if(this.closeButtonText != null) this.toggleCollapseButton.innerText = this.openButtonText;
            if(this.closeButtonSrc != null) this.toggleCollapseButton.firstChild.src = this.openButtonSrc;
        }
    }
    
    _SetTimeout(){
        
        const obj = this;
        
        setTimeout(function(){
            obj._FinishTransitioningTray(obj);
        },obj.transitionTime);
    }
    
    BeginInitialize(){
        
        const $dom = this._ConvertSingleDOMtoArray(this.authorizedDOMs);
        
        for(const d of $dom){
                    
            d.style.transition += "transform " + this.transitionTime/1000 + "s"; //transition:transform 0.75s   
        }
        
        if(this.toggleCollapseButton == null){
            
            const button = document.createElement("button");
            
            button.style.float = "right";
        
            button.style.margin = "5px";
            
            this.SetTrayToggleCollapseButtonOpenCloseText("⮞","⮜");
            
            this.authorizedDOMs[0].append(button);  
            
            this.SetTrayToggleCollapseButtonToDOM(button);
        }
        
        if(this.state == "open"){
            
            if(this.openButtonText != null) this.toggleCollapseButton.innerText = this.closeButtonText;
            if(this.openButtonSrc != null) this.toggleCollapseButton.firstChild.src = this.closeButtonSrc;    
            }

        if(this.state == "closed"){

            if(this.closeButtonText != null) this.toggleCollapseButton.innerText = this.openButtonText;
            if(this.closeButtonSrc != null) this.toggleCollapseButton.firstChild.src = this.openButtonSrc;

        }
            
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