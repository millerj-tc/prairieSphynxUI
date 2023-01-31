export class cacheHandler
{
    constructor(){
        
    }
    
    SetPlutoUnlocked(){
        
        this._SetItem("plutoUnlocked","true");
    }
    
    GetPlutoUnlocked(){
        
        this._GetItem("plutoUnlocked");
    }
    
    _SetItem(key,data){
        
        localStorage.setItem(key,data);
    }
    
    _GetItem(key,data){
        
        localStorage.getItem(key);
    }
}