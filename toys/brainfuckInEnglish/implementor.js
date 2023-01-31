import {brainfucker} from "./brainfucker.js";
import {CreateElement, GetElementById} from "./ui.js";

export class implementor
{
    constructor(){
        
        this.inputs = [];
        this.inputConverters = [];
        this.languageMachine = null;
    }
    
    SetLanguageMachineToBrainfucker(){
        
        this.languageMachine = new brainfucker(this.impPermId);
    }
    
    RunLanguageMachine(){
        
        const aO = GetElementById("allOutput");
        
        aO.append("PERM ID: " + this.impPermId);
        
        aO.insertAdjacentHTML("beforeEnd","<br><br>");
        
        this.languageMachine.ExecuteCode();
    }
    
    SetInputCriteriaForCommand(inputCrit,command,commandMod = null){
        
        //inputCrit should be a function that returns true or false
        
        const inCon = {inputCrit:inputCrit, command:command}
        
        //command mod can be a function that returns something to append to the command
        
        if(commandMod != null) inCon.commandMod = commandMod;
        
        this.inputConverters.push(inCon);
    }
    
    ProcessInputs(){
        
        for(const inp of this.inputs){
            
            for(const inCon of this.inputConverters){
                
                if(inCon.inputCrit(inp)){
                    
                    let command = inCon.command;
                    
                    if(inCon.commandMod != null) command += inCon.commandMod(inp);
                   
                    this.languageMachine.AddCommandToCode(command);
                }
            }
        }
        
    }
}