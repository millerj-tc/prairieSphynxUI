class statusFx
{
    constructor(immuneSysOwner,type,duration,special){
        
        this.immuneSysOwner = immuneSysOwner;
        this.type = type;
        this.special = special;
    }
}

export class immuneSys
{
    constructor(cardOwner){
        
        this.cardOwner = cardOwner;
        this.statusFxs = [];
    }
    
    Stun(duration,special){
        
        const sfx = new statusFx(this,"stun",special);
        
        this.statusFxs.push(sfx);
        
        if(duration == "phase" || duration == "scenario"){
            
            this.cardOwner.GetParentAtProtoLevel("phase").immuneSys.Stun("none",special);
        }
        
        if(duration == "scenario"){
            
            this.cardOwner.GetParentAtProtoLevel("scenario").immuneSys.Stun("none",special);
        }
        
        return sfx
    }
    
    IsStunned(){
        
        let match = false
        
        for(const s of this.statusFxs){
            
            if(s.type == "stun") match = true;
        }
        
        if(match) return true
        return false
    }
}