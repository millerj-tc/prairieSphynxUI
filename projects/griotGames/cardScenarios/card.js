export class card
{
    constructor(scenario){
        
        this.scenario = scenario;
    }
    
    AddGenericProperties(){
        
        this.data.alignment;
        this.data.removedDuringRun = false;
        this.data.skipPhases = [];
        
        if(this._AddAdditionalProperties != null) this._AddAdditionalProperties();
    }
    
    GetAlignment() {return this.alignment}
    
    GetEnemyAlignment(){
        
        if(this.data.alignment == "left") return "right";
        else if(this.data.alignment == "right") return "left";
        else {
            console.warn(".GetEnemyAlignment() is malfunctioning, my name is " + this.name + " and my alignment is " + this.data.alignment);
        }
    }
    
    
}