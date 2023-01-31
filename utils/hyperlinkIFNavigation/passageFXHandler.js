import {conditionHandler} from "./../conditionHandler/conditionHandler.js";

class passageFx
{
    constructor(fxHandlerOwner,FxFunc,arg0,arg1,arg2){
        
        this.fxHandlerOwner = fxHandlerOwner;
        this.actionLoggerString = "";
        this.actionLoggerDetails = "";
        this.FxFunc = FxFunc;
        this.conditionHandler = new conditionHandler();
        this.arg0 = arg0;
        this.arg1 = arg1;
        this.arg2 = arg2;
    }
    
    SetActionLoggerString(string){
        
        this.actionLoggerString = string;
    }
}

class characterResponse
{
    constructor(text,keywordsArr){
        
        this.text = text;
        this.keywordsArr = keywordsArr;
        this.conditionHandler = new conditionHandler();
        this.actionLoggerString = "";
        this.actionLoggerDetails = "";
    }
    
    SetActionLoggerString(string){
        
        this.actionLoggerString = string;
    }
}

class characterResponseHandler
{
    constructor(characterId){
        
        this.characterId = characterId;
        this.characterResponses = [];
    }
}

export class passageFxHandler
{
    constructor(){
        
        this.passageFxs = [];
        this.defaultFx;
        this.characterResponseHandlers = [];
    }
    
    AddPassageFx(FxFunc,arg0,arg1,arg2){
        
        const $psgFx = new passageFx(this,FxFunc,arg0,arg1,arg2);
        
        this.passageFxs.push($psgFx);
        
        return $psgFx
    }
    
    AddCharacterResponse(characterId,text,keywordsArr){
        
        const $crh = this._GetOrCreateCharResponseHandler(characterId);
        
        const $response = new characterResponse(text,keywordsArr)
        
        $crh.characterResponses.push($response);
        
        return $response
        
    }
    
    _GetOrCreateCharResponseHandler(characterId){
        
        let $crh = null;
        
        for(const crh of this.characterResponseHandlers){
            
            if(crh.characterId == characterId) return crh
        }
        
        if($crh == null){
            
            $crh = new characterResponseHandler(characterId);
            
            this.characterResponseHandlers.push($crh);
            
            return $crh
            
        }
    }
    
    AddCharacterDefaultResponse(characterId,text,keywordsArr){
        
        const $crh = this._GetOrCreateCharResponseHandler(characterId);
        
        $crh.defaultResponse = new characterResponse(text,keywordsArr);
        
        return $crh.defaultResponse;
    }
    
    AddDefaultPassageFx(FxFunc,arg0,arg1,arg2){
        
        const $psgFx = new passageFx(this,FxFunc,arg0,arg1,arg2);
        
        this.defaultFx = $psgFx;
        
        return $psgFx
    }
    
    Evaluate(){
        
        for(const fx of this.passageFxs){
            
            if(fx.conditionHandler.Evaluate()){
                
                if(fx.actionLoggerString != "") this._ReportToActionLogger(`>>>` + fx.actionLoggerString,fx.actionLogerDetails);
                
                fx.FxFunc(fx.arg0,fx.arg1,fx.arg2);
                
                return
            }
        }
        
        if(this.defaultFx != null){
            this.defaultFx.FxFunc(this.defaultFx.arg0,this.defaultFx.arg1,this.defaultFx.arg2);
        }
    }
    
    _ReportToActionLogger(string,details=""){
        
        window.gameHandler.actionLogger.AddAction(string,details);
    }
}