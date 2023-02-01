export function CollapseButtonOnClick(artist){
        
        // "this" will refer to button DOM

        if(artist.state == "open") _BeginTrayClose(artist);
        if(artist.state == "closed") _BeginTrayOpen(artist);
    }
    
function _BeginTrayClose(artist){
    
        const dom = artist.authorizedDOMs;
        
        const $dom = artist._ConvertSingleDOMtoArray(dom);
        
        for(const d of $dom){
            
            artist.state = "closing";    
        }
        
        _ToggleCollapseButton(artist);
        
        _SetTimeout(artist);
        
        if(artist.clearOnClose) artist.ClearAllChildren(); 
        
            for(const dm of $dom){
            
                const translate = `translate${artist.axis}(${artist.closedPosition})`
                dm.style.transform = translate;
            }
    }
    
function _BeginTrayOpen(artist){
    
        const dom = artist.authorizedDOMs;

        const $dom = artist._ConvertSingleDOMtoArray(dom);
        
        for(const d of $dom){
            
            artist.state = "opening";    
        }
        
        _ToggleCollapseButton(artist);
        
        _SetTimeout(artist);
        
        for(const d of $dom){
            
            d.style.transform = `translate${artist.axis}(${artist.openPosition})`;
        }
    }
    
 function _FinishTransitioningTray(artist){
        
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
    
 function _ToggleCollapseButton(artist){
        
        if(artist.state == "opening"){
            
            if(artist.openButtonText != null) artist.toggleCollapseButton.innerText = artist.closeButtonText;
            if(artist.openButtonSrc != null) artist.toggleCollapseButton.firstChild.src = artist.closeButtonSrc;    
        }
        
        if(artist.state == "closing"){
            
            if(artist.closeButtonText != null) artist.toggleCollapseButton.innerText = artist.openButtonText;
            if(artist.closeButtonSrc != null) artist.toggleCollapseButton.firstChild.src = artist.openButtonSrc;
        }
    }
    
function _SetTimeout(artist){
        
        setTimeout(function(){
            _FinishTransitioningTray(artist);
        },artist.transitionTime);
    }