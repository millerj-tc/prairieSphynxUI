export function OutputTextDivWithNounImages(string){
    
    //what if it could take any number of arguments (including 0) and did different things if they were arrays or single objects? That way you could include different groups, etc.
    
    //Also build in all the steps of dupeCunk output (replace based on plural subjects, specify pronouns, etc.)
    
    //"[argNN[name (for image)]team?]: Welcome to the Dance of Riddles, [arg01[(use GetSpanList)/team/name]]
    
    const nounGroupsArr = arguments.slice(1);
    
    for(const m of string.match(/\[arg**\[(.*?)\]\]/)){
        
        console.log(m);
    }
}