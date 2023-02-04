export class cacheHandler
{
    constructor(){
        
    }
    
    SetItem(key,data){
        
        localStorage.setItem(key,data);
    }
    
    GetItem(key){
        
        return localStorage.getItem(key);
        
        //localStorage.getItem(cString)
    }
}