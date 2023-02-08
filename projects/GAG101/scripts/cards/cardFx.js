export class cardFx
{
    constructor(type,duration){
        
        this.cardFxHandler;
        this.duration = duration;
        this.type = type;
        this.active = true;
    }
    
    Deactivate(){
        
        this.active = false;
    }
    
    DeactivateIfDurationEquals(duration){
        
        if(this.duration == duration) this.Deactivate();
    }
}

export class operableNumberCardFx extends cardFx //obj.constructor.name
{
    constructor(key,value,duration){
        
        super("operableNumber",duration);
        this.key = value; 
    }
}