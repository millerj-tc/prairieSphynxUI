export class cardFxHandler
{
    constructor(cardOwner){
        
        this.cardOwner = cardOwner;
        this.cardFxs = [];
    }
    
    ApplyFx(type,duration){
        
        const sfx = new cardFx(type,duration);
        
        this.cardFxs.push(sfx);
    }
}
    
//    Stun(duration,special){
//
//        const sfx = new statusFx(this,"stun",duration,special);
//        
//        this.cardFxs.push(sfx);
//        
//        if(duration == "phase" || duration == "scenario"){
//            
//            this.cardOwner.GetParentAtProtoLevel("phase").immuneSys.Stun("none",special);
//        }
//        
//        if(duration == "scenario"){
//            
//            this.cardOwner.GetParentAtProtoLevel("scenario").immuneSys.Stun("none",special);
//        }
//
//        return sfx
//    }
//    
//    DupeConk(){
//        
//        this.Stun("scenario","dupeConk");
//    }
//    
//    DoubleDupeConk(){
//        
//        this.Stun("scenario","dupeConk");
//        this.Stun("scenario","doubleDupeConk");
//    }
//    
//    IsStunned(){
//        
//        return this._IsMainTyped("stun");
//    }
//    
//    IsDupeConked(){
//        
//        return this.IsMainTypedSpecialed("stun","dupeConk");
//    }
//    
//    IsDoubleDupeConked(){
//        
//        return this.IsMainTypedSpecialed("stun","doubleDupeConk");
//    }
//    
//    IsSpecialed(special){
//        
//        let match = false
//        
//        for(const s of this.cardFxs){
//            
//            if(s.special == special) match = true;
//        }
//        
//        if(match) return true
//        return false
//    }
//        
//    IsMainTypedSpecialed(type,special){
//        
//        let match = false;
//        
//        for(const s of this.cardFxs){
//            
//            if(s.type == type && s.special == special) match = true
//            
//            
//        }
//        
//        if(match) return true
//        return false
//    }
//    
//    _IsMainTyped(type){
//        
//        let match = false
//        
//        for(const s of this.cardFxs){
//            
//            if(s.type == type) match = true;
//        }
//        
//        if(match) return true
//        return false
//    }

