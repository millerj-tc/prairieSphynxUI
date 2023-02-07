class statusFx
{
    constructor(immuneSysOwner,type,duration,special){
        
        this.immuneSysOwner = immuneSysOwner;
        this.duration = duration;
        this.type = type;
        this.special = special;
    }
    
    Cure(){
        
        this.immuneSysOwner.statusFxs = this.immuneSysOwner.statusFxs.filter(c => c!= this);
    }
    
    CureIfDurationEquals(duration){
        
        if(this.duration = duration) this.Cure();
    }
}

export class immuneSys
{
    constructor(cardOwner){
        
        this.cardOwner = cardOwner;
        this.statusFxs = [];
    }
    
    Stun(duration,special){

        const sfx = new statusFx(this,"stun",duration,special);
        
        this.statusFxs.push(sfx);
        
        if(duration == "phase" || duration == "scenario"){
            
            this.cardOwner.GetParentAtProtoLevel("phase").immuneSys.Stun("none",special);
        }
        
        if(duration == "scenario"){
            
            this.cardOwner.GetParentAtProtoLevel("scenario").immuneSys.Stun("none",special);
        }

        return sfx
    }
    
    DupeConk(){
        
        this.Stun("scenario","dupeConk");
    }
    
    DoubleDupeConk(){
        
        this.Stun("scenario","dupeConk");
        this.Stun("scenario","doubleDupeConk");
    }
    
    IsStunned(){
        
        return this._IsMainTyped("stun");
    }
    
    IsDupeConked(){
        
        return this.IsMainTypedSpecialed("stun","dupeConk");
    }
    
    IsDoubleDupeConked(){
        
        return this.IsMainTypedSpecialed("stun","doubleDupeConk");
    }
    
    IsSpecialed(special){
        
        let match = false
        
        for(const s of this.statusFxs){
            
            if(s.special == special) match = true;
        }
        
        if(match) return true
        return false
    }
        
    IsMainTypedSpecialed(type,special){
        
        let match = false;
        
        for(const s of this.statusFxs){
            
            if(s.type == type && s.special == special) match = true
            
            
        }
        
        if(match) return true
        return false
    }
    
    _IsMainTyped(type){
        
        let match = false
        
        for(const s of this.statusFxs){
            
            if(s.type == type) match = true;
        }
        
        if(match) return true
        return false
    }
}