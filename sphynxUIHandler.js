export class sphynxUIHandler
{
    constructor(){
        
        this.authorizedDOMs = [];
        
        // may want to know who owner is so can report who is calling for stuff and log
        
        for(const a of arguments){
            
            this.authorizedDOMs.push(a);
        }
    }
    
    AddAuthorizedDOMs(){
        
        for(const a of arguments){
            
            this.authorizedDOMs.push(a);
        }
    }
    
    Test(string){
        
        for(const dom of this.authorizedDOMs){
            
            dom.innerText = string;
        }
    }
    
}