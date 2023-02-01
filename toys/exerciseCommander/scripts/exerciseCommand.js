export class exerciseCommand
{
    constructor(typ, reps, rate,restTime,transitionTime = 2050){
        
        this.exerciseType = typ;
        this.exerciseReps = reps;
        this.exerciseRate = rate;
        this.restTime = restTime;
        this.transitionTime = transitionTime;
        this.remainingReps = reps;
        this.edArtist = window.uiTH.GetArtistsByAuthorizedDOMId("exerciseDisplay");
    }
    
    Command(){
        
        //if audio, if visual...
        
        //should not use body
        
        this.edArtist.SetDOMInnerTextTo(this.exerciseReps + " " + this.exerciseType);
        
        const audio = new Audio("../exerciseCommander/audio/pianoKey.mp3");
        
        audio.play();
        
        this._Flash("yellow");
        
        this._SetMetronome();
        
        //this._ScheduleEndTrigger();
    }
    
//    _ScheduleEndTrigger(){
//        
//        setTimeout(this._SendEndTriggerToCommandHandler,(this.exerciseReps * this.exerciseRate) * 1000);
//    }
    
    _SetMetronome(){
        
        const commandHandler = window.commandHandler;
        
        for(let i = 0; i < this.exerciseReps + 1; i++){
            
            if(i == this.exerciseReps){
                
                const obj = this;
                
                setTimeout(function(){obj._SendEndTriggerToCommandHandler(obj)}, this.transitionTime + (i * (1/this.exerciseRate) * 1000));
                return
            }
            
            const inst = this;
            
            setTimeout(function(){
                
                  _Tick(inst);
                
//                metFunc();
//                flashFunc("green");
                
                    
            }, this.transitionTime + (i * (1/this.exerciseRate) * 1000));
        }
    }
    
    _MetronomeTick(){
        
        const audio = new Audio("../exerciseCommander/audio/chime.mp3");
        
        audio.play();
    }
    
    _Flash(color){
        
        const edArtist = this.edArtist;
        
        edArtist.SetStylePropToValue("backgroundColor", color);
        
        setTimeout(function(){edArtist.SetStylePropToValue("backgroundColor","white")},250)
    }
    
    _SendEndTriggerToCommandHandler(obj){
        
        this.edArtist.SetDOMInnerTextTo("rest");
        
        setTimeout(function(){window.commandHandler.GotoNextCommand()},obj.restTime)
    }
}

function _Tick(obj){
    
    const edArtist = window.uiTH.GetArtistsByAuthorizedDOMId("exerciseDisplay");
    
    obj._MetronomeTick();
    obj._Flash("green");
    
    obj.remainingReps--;
    
    edArtist.SetDOMInnerTextTo(obj.remainingReps + " " + obj.exerciseType);
}