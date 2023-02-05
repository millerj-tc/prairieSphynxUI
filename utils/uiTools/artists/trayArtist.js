import {domUIArtist} from "./domUIArtist.js";
import {CollapseButtonOnClick} from "./trayArtistTrayMovement.js";

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
        
        dom.onclick = function(){CollapseButtonOnClick(artist)};
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
    
    SetTrayOpenClosedPosition(open,closed){ //should most often be 0 in the argument that matches the initial position
        
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
    
    BeginInitialize(){
        
        const $dom = this._ConvertSingleDOMtoArray(this.authorizedDOMs);
        
        for(const d of $dom){
                    
            d.style.transition += "transform " + this.transitionTime/1000 + "s"; //transition:transform 0.75s   
        }
        
        if(this.toggleCollapseButton == null){
            
            const button = document.createElement("button");
            
            button.style.float = "right";
        
            button.style.margin = "5px";
            
//            button.style.position = "absolute";
//            
//            button.style.bottom = "0px";
            
            this.SetTrayToggleCollapseButtonOpenCloseText("⮞","⮜");
            
            this.authorizedDOMs[0].prepend(button);  
            
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
        
         const $dom = this._ConvertSingleDOMtoArray(this.authorizedDOMs); 
        
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

/*HELP
My tray isn't in the right place: Top, left, etc must be set in stylesheet and display must not be static.

*/