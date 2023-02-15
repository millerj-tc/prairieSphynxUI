import { getDatabase, ref, child, push, update } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export class actionLogger
{
    constructor(){
        
        this.sessionKey;
        this.actionLog = [];
        this.intervalId = 0;
        this.optOut;
    }
    
    SetOptOut(bool){
        
        this.optOut = bool;
    }
    
    SetSessionKey(key){
        
        this.sessionKey = key;
    }
    
    AddAction(actionHeader,actionString = "none"){
        
        this.actionLog.push({actionHeader:actionHeader,actionString:actionString});
    }
    
    ReportAndStartNewInterval(){
        
        if(this.actionLog.length == 0){
            
            //this._ReportAction("none","none");
        }
        else{
            
            let actionIndex = 0;
            
            for(const action of this.actionLog){
                
                this._ReportAction(actionIndex + " " + action.actionHeader,action.actionString);
                actionIndex++;
            }
        }
        
        this.actionLog = [];
        this.intervalId += 10;
    }
    
    _ReportAction(actionHeader,actionString) {
      const db = getDatabase();
        const objIntervalId = this.intervalId;

      // A post entry.
      const postData = {
        action: actionString,
      };

      // Get a key for a new Post.
      const newActionKey = push(child(ref(db), 'actions ')).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates['/sessions/' + this.sessionKey + `/actions/` + this._ReturnLeadCharacterAndObjIntervalId(objIntervalId) + "-" + actionHeader + `/` +  newActionKey] = postData;

      return update(ref(db), updates);
    }
    
    _ReturnLeadCharacterAndObjIntervalId(objIntervalId){
        
        const leadCharArr = [
          
            {leadChar: "a", lessThanOrEqualTo: 99},
            {leadChar: "b", lessThanOrEqualTo: 999},
            {leadChar: "c", lessThanOrEqualTo: 9999},
            {leadChar: "d", lessThanOrEqualTo: 99999},
            {leadChar: "e", lessThanOrEqualTo: 999999},
            {leadChar: "f", lessThanOrEqualTo: 9999999},
            {leadChar: "g", lessThanOrEqualTo: 99999999},
            {leadChar: "h", lessThanOrEqualTo: 999999999},
            {leadChar: "i", lessThanOrEqualTo: 9999999999},
            {leadChar: "j", lessThanOrEqualTo: 99999999999},
            {leadChar: "k", lessThanOrEqualTo: 999999999999},
            {leadChar: "l", lessThanOrEqualTo: 9999999999999},
            {leadChar: "m", lessThanOrEqualTo: 99999999999999},
        ];
        
        for(const i of leadCharArr){
            
            if(objIntervalId <= i.lessThanOrEqualTo) return i.leadChar + objIntervalId;
        }
    }
}

