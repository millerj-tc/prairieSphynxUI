class interpersHopeFx
{
    constructor(char,cardZone="team"){
        
        this.ownerCharacter = char;
        this.targetCharsStrings; //ARRAY!
        this.effectText;
        this.hopeModifier;
    }
}

export class charHandler
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
    }
    
    AddGenericPropertiesToCharacters(arr){
        
        for(const char of arr){
            char.hope = 0;
            char.xp = {left:0,right:0};
            char.lastWonHope = null;
            char.removedDuringRun = false;
            char.debuffed = false;
            char.rage = 0;
            char.skipPhases = [];
        }
    }
    
    AddFunctionsToCharacters(arr){
        
        for(const char of arr){
            
            char.IsDebuffed = this.IsDebuffed;
            char.Debuff = this.Debuff;
            char.Rebuff = this.Rebuff;
            char.ModHope = this.ModHope;
            char.AddInterpers = this.AddInterpers;
            char.GetEnemyAlignment = this.GetEnemyAlignment;
            char.Enrage = this.Enrage;
            char.Sooth = this.Sooth;
        }
    }
    
    AddInterpers(type,cardZone){
                    
        let $fx;
        
        if(type == "hope") $fx = new interpersHopeFx(this,cardZone);

        this.interpersFxs.push($fx);
        
        return $fx
        
    }
    
    GetEnemyAlignment(){
        
        if(this.alignment == "left") return "right";
        else if(this.alignment == "right") return "left";
        else {
            console.warn(".GetEnemyAlignment() is malfunctioning, my name is " + this.name + " and my alignment is " + this.alignment);
        }
    }
    
    ModHope(amt){
        
        this.hope += amt;
    }
    
    Debuff(){
        
        this.debuffed = true;
    }
    
    Rebuff(){
        
        this.debuffed = false;
    }
    
    IsDebuffed(){
        
        return this.debuffed
        
    }
    
    Enrage() {this.rage++}
    
    Sooth() {this.rage--}
    
    
}