import {implementor} from "./implementor.js";
import {permutator} from "./permute.js";

export class impCreator
{
    constructor(){
        
        this.inputCrits = [];
        this.moddedInputCrits = [];
        this.imps = [];
        
    }
    
    AddInputCrit(fu){
        
        this.inputCrits.push(fu);
    }
    
    CreateImps(n,start=0){
        
        let targetImpCount = n;
        
        let impCount = 0;
        
        let inputCritPermutes = permutator(this.inputCrits);
        
        while(impCount < targetImpCount ){
              
            const newImp = new implementor();
            
            newImp.impPermId = impCount + start;
            
            newImp.SetLanguageMachineToBrainfucker();
            
            for(let i = 0; i < newImp.languageMachine.commandLibrary.length; i++){
                
                let startPermute = impCount + start;
                
                let currentPermute = inputCritPermutes[startPermute];
                
                if(newImp.languageMachine.commandLibrary[i] == "Input"){ 
                
                    newImp.SetInputCriteriaForCommand(currentPermute[i], newImp.languageMachine.commandLibrary[i],  function(){return arguments[0][0]});
                    
                }
                else
                    
                {
                    
                    newImp.SetInputCriteriaForCommand(currentPermute[i], newImp.languageMachine.commandLibrary[i])
                    
                }
                
                
        
            }
            
            this.imps.push(newImp);
                  
            impCount++;
        }
    }
    
    RunImpsWithInput(inp){
        
        for(const imp of this.imps){
            
            imp.inputs = inp;
            
            imp.ProcessInputs();
            
            imp.RunLanguageMachine();
        }
    }
    
    
}