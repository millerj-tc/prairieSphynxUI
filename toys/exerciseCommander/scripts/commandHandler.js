export class commandHandler
{
    constructor(){
        
        this.commands = [];
        this.currentCommandInd;
        this.elapsedExerciseTime = 0;
    }
    
    PlayExercisePattern(builtPattern){
        
        this._LoadCommands(builtPattern);
        
        this.currentCommandInd = 0;
        
        this._PlayCommand();
    }
    
    _LoadCommands(builtPattern){
        
        this.commands = builtPattern;
    }
    
    _PlayCommand(){
        
        this.commands[this.currentCommandInd].Command();
        
    }
    
    GotoNextCommand(){
        
        this.currentCommandInd++;
        
        if(this.currentCommandInd > this.commands.length - 1){
            
            const edArtist = uiTH.GetArtistsByAuthorizedDOMId("exerciseDisplay");
            
            edArtist.SetDOMInnerTextTo("Done!");
            
            return
        }
        
        this._PlayCommand();
        
    }
    
    
}