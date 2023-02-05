// domUIArtist is in charge of a specific DOM in the UI (or multiple DOMs that will behave in the exact same way)
// the project should have a uiToolsHandler and can add any number of domUIArtists to handle any number of DOMs with the uiToolsHandler method AddDOMUIArtist()

export class domUIArtist
{
    constructor(uiToolsHandler, externalOwnerId = null){
        
        this.authorizedDOMs = [];
        this.toolType = "domUIArtist";
        this.uiToolsHandler= uiToolsHandler;
        this.externalOwnerId = externalOwnerId;
    }
    
    AddAuthorizedDOMs(){
        
        for(const a of arguments){            

            this.authorizedDOMs.push(a[0]);
        }
    }
    
    GetElementInsideDOMById(id,dom = this.authorizedDOMs[0]){
    
        if(typeof dom == "string") console.error("Passed string -- please pass DOM object");

        for(const child of dom.children){

            if(child.id == id) return child
        }
        
        return null
    
    }
    
    ScrollDOMIntoView(dom = this.authorizedDOMs[0]){
    
        dom.scrollIntoView(); //trying without "true" for mobile
    }
    
    // These methods will all take a single DOM or an array object of DOMs (that's what the _ConvertSingleDOMtoArray accomplishes)
    
    AppendElementWithinDOM(element,dom = this.authorizedDOMs){

        const $dom = this._ConvertSingleDOMtoArray(dom);
        
        for(const a of $dom){
            
            a.append(element);

        }
        
    }
    
    
    SetDOMDisplayTo(display,dom = this.authorizedDOMs){

        const $dom = this._ConvertSingleDOMtoArray(dom);
                
        for(const a of $dom){

            a.style.display = display;
        }
    }
    
    ClearAllChildren(dom = this.authorizedDOMs){
        
        const $dom = this._ConvertSingleDOMtoArray(dom);
        
        for(const a of $dom){
            
            const $children = [...a.children];

            for(const c of $children){

                c.remove();
            }
        }

    }
    
    ClearInnerHTML(dom = this.authorizedDOMs){
        
        const $dom = this._ConvertSingleDOMtoArray(dom);
    
        for(const a of $dom){
        
            a.innerHTML = "";
        }
    }
    
    SetDOMInnerTextTo(text,dom = this.authorizedDOMs){
        
        const $dom = this._ConvertSingleDOMtoArray(dom);
    
        for(const d of $dom){
            
            d.innerText = text;
        }
    }
    
    SetStylePropToValue(styleProp,value){
    
        for(const d of this.authorizedDOMs){
         
            d.style[styleProp] = value;
        }
        
        
    }
    

    _ConvertSingleDOMtoArray(dom){
        
        let $dom = dom;
        
        if(!Array.isArray($dom)) $dom = [dom];
        
        return $dom
    }
    
    ErrorCheck(){
        
        let errorFound = false;
        
        if(this.authorizedDOMs.length == 0){
            console.error(`domUIHandler has no authorized DOMS`)
            errorFound = true;
        }
        
        if(this.externalOwnerId != null && typeof this.externalOwnerId != "string"){
            console.error("domUIHandler external owner id is not string, cannot JSON!");
            errorFound = true;
        }
        
        if(errorFound){
            console.log(this);
            console.log(`external owner id is ${this.externalOwnerId}`);
            console.log("authorized DOMS are:");
            console.log(this.authorizedDOMs);
            console.log(`~~~`);
        }
    }
    
}