import {CreateElement,GetElementById} from "./ui.js"

export class brainfucker
{
    constructor(impPermId){
        
        this.tape = [0];
        this.tapeIndex = 0;
        this.code = [];
        this.outputString = "";
        this.codeIndex = 0;
        this.commandLibrary = ["[","]","Decrement","Increment","Right","Left","Output","Input"]
        this.impPermId = impPermId;
        
    }
    
    AddCommandToCode(comm){
        
        this.code.push(comm);
    }
    
    StripUnpairedBrackets(){
        
       for(let i = 0; i < this.code.length; i++){
           
           if(this.code[i] == "["){
               
                let matchCounter = 1;
           
               for(let n = i + 1; n < this.code.length ; n++){
                   
                   if(this.code[n] == "[") matchCounter++;
                   
                   if(this.code[n] == "]") matchCounter--;
                   
                   if(matchCounter == 0) break
                   
                   if(n == this.code.length -1) this.code[i] = "*[*";
               }
           }
        
        if(this.code[i] == "]"){
               
                let matchCounter = 1;
           
               for(let n = i - 1; n >= 0 ; n--){
                   
                   if(this.code[n] == "]") matchCounter++;
                   
                   if(this.code[n] == "[") matchCounter--;
                   
                   if(matchCounter == 0) break
                   
                   if(n == 0) this.code[i] = "*]*";
               }
           }
       }
        
    }
    
    OutputTapeAs10LengthString(){
        
        let outputString = "";
        
        for(let i = 0; i < this.tape.length - 1; i++){
            
            let ind = this.tape[i]; 
            
            let ASCII = String.fromCharCode(ind);
            
            outputString = outputString + ASCII;
            
            if(i % 10 == 0) outputString += "\n";
        }
        
        return outputString;
    }
    
    ExecuteCode(){
        
        this.StripUnpairedBrackets();
        
        let loopCount = 0;
        
        let programLoopCount = 0;
        
        for(this.codeIndex = 0;this.codeIndex < this.code.length;this.codeIndex++)
        {
            
            if(loopCount > 500){
                
               this.codeIndex++;
                
            }
            
            if(programLoopCount > 1500){ 
             
                console.warn(`loop count violated by ${this.impPermId}`);
                break
                
            }
            
            let currentCommand = this.code[this.codeIndex];
            let currentCellValue = this.tape[this.tapeIndex];
            
            if(currentCommand == null) break
            if(currentCommand == "Right") this.Right();
            if(currentCommand == "Left") this.Left();
            if(currentCommand == "Increment") this.Increment();
            if(currentCommand == "Decrement") this.Decrement();
            if(currentCommand == "Output") this.Output();
            
//            console.log(currentCommand);
//            console.log(this.tape);
//            console.log(this.code);
//            console.log("you are here:" + this.codeIndex);
//            console.log(this.code[this.codeIndex - 1]);
//            console.log(this.code[this.codeIndex]);
//            console.log(this.code[this.codeIndex + 1]);

            if(currentCommand.slice(0,5) == "Input"){
                
                let lastChar = currentCommand.slice(5);

                this.Input(lastChar);
            }

            if(currentCommand == "["){

                if(currentCellValue !=0){

                    continue
                }
                else {

                   this.codeIndex = this.FindNextBracketIndex(this.codeIndex);
                    loopCount = 0;
                    continue
                }
            }

            if(currentCommand =="]"){

                if(currentCellValue == 0 ||loopCount > 500){
                    
                    continue
                }
                else{

                   this.codeIndex = this.FindPreviousBracketIndex(this.codeIndex);
                    loopCount++;
                    programLoopCount++;
                    continue
                }
            }
        }
        
        this.OutputToWebpage("OUTPUT STRING", "green", this.outputString);
        this.OutputToWebpage("CODE", "blue", this.code);
        this.OutputToWebpage("TAPE", "purple", this.tape);
        this.OutputToWebpage("OUTPUT ALL TAPE", "black", this.OutputTapeAs10LengthString());
        
        
    }
    
    OutputToWebpage(headingText,color,value){
        
        const aO = GetElementById("allOutput");
        
        const output = CreateElement("div");
        
        const heading = CreateElement("div");
        
        heading.classList.add("heading");
        
        heading.style.color = color;
        
        heading.innerText = headingText;
        
        output.append(heading);
        
        output.insertAdjacentHTML("beforeEnd","<br><br>");
        
        const valueDiv = CreateElement("div");
        
        valueDiv.innerText = value;
        
        valueDiv.classList.add("valueOutput");
        
        output.append(valueDiv);
        
        aO.append(output);
        
        aO.insertAdjacentHTML("beforeEnd","<br><br>");

        
    }
    
    FindPreviousBracketIndex(currCodeIndex){
        
        for(let checkedCodeIndex = currCodeIndex; checkedCodeIndex > -2; checkedCodeIndex--){
            
            if(this.code[checkedCodeIndex] == "[") return checkedCodeIndex
            
            if(currCodeIndex == -1) return currCodeIndex + 1
        }
        
    }
    
    FindNextBracketIndex(currCodeIndex){
        
        for(let checkedCodeIndex = currCodeIndex; checkedCodeIndex < this.code.length; checkedCodeIndex++){
            
            if(this.code[checkedCodeIndex] == "]") return checkedCodeIndex
            
            if(currCodeIndex == this.code.length) return currCodeIndex + 1
        }
    }
    
    Right(){
        
        this.tapeIndex++;
        
        if(this.tapeIndex > this.tape.length - 1){
            
            this.tape.push(0);
        }
    }
    
    Left(){
        
        this.tapeIndex--;
        
        if(this.tapeIndex == -1){
            
            this.tape.splice(0,0,0);
            this.tapeIndex = 0;
        }
    }
    
    Increment(){
        
        this.tape[this.tapeIndex] = this.tape[this.tapeIndex] + 1;
        
    }
    
    Decrement(){
        
        this.tape[this.tapeIndex] = this.tape[this.tapeIndex] - 1;
    }
    
    Input(char){
        
        let ASCII = char.charCodeAt(0);
        
        this.tape[this.tapeIndex] = ASCII;
    }
    Output(){
        
        let ASCII = String.fromCharCode(this.tape[this.tapeIndex]);
        
        this.outputString = this.outputString + ASCII;
    }
    
}