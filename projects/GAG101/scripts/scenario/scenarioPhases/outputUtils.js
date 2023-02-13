export function OutputTextDivWithNounImages(string){
    
    //what if it could take any number of arguments (including 0) and did different things if they were arrays or single objects? That way you could include different groups, etc.
    
    //Also build in all the steps of dupeCunk output (replace based on plural subjects, specify pronouns, etc.)
    
    //"[argNN[name (for image)]team]: Welcome to the Dance of Riddles, [arg01[(use GetSpanList)/team/name]]
    
    const returnDOM = document.createElement("div");
    
    const replacementArr = [];
    
    const nounGroupsArr = Array.from(arguments).slice(1);
    
    const text = string.replace(/\[arg..\[(.*?)\](.*?)\]/gm,_OutputTextReplacementFunction)
    
//    for(const m of string.match(/\[arg..\[(.*?)\](.*?)\]/gm)){
//        
//        console.log(m.match("argNN"));
//        
//        console.log(m.match("]team]"));
//    }
}

function _OutputTextReplacementFunction(match,string){
    
    let returnString;
    
    if(match.includes("[argNN[")){
        
        
    }
    
    return returnString
}