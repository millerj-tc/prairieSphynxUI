import {exerciseCommand} from "./exerciseCommand.js";
import {exercises} from "./exerciseData.js";
import {ShuffleArray} from "./utils.js";

export function exerciseBeginFlow(){
    
    const sectionCount = document.getElementsByClassName("sectionBuilderTitle").length;
    
    const uiTH = window.uiTH;
    
    const edArtist = uiTH.GetArtistsByAuthorizedDOMId("exerciseDisplay");
    
    const sbArtist = uiTH.GetArtistsByAuthorizedDOMId("sectionBuilders");
    
    const commandHandler = window.commandHandler;
    
    // filter exercises based on user requests ("abs","legs", etc.)?
        
    const patternRequest = LoadUserExercisePatternSelection(sectionCount);
    
    edArtist.ClearAllChildren();
    
    sbArtist.ClearAllChildren();
    
    //const patternRequest = [{difficulty:0.4,duration:1250},{difficulty:0.6,duration:600},{difficulty:0.8,duration:300}];
    
    // long tv workout harder {difficulty:0.6,duration:900},{difficulty:0.8,duration:600},{difficulty:1,duration:300},{difficulty:1.2,duration:150},{difficulty:1.4,duration:75},{difficulty:1.8,duration:35}
    
    // long tv workout {difficulty:0.4,duration:900},{difficulty:0.6,duration:600},{difficulty:0.8,duration:300},{difficulty:1,duration:150},{difficulty:1.2,duration:75},{difficulty:1.4,duration:35}
    
    //{difficulty:0.75,duration:240},{difficulty:1,duration:60},{difficulty:2,duration:30},{difficulty:2.5,duration:30},{difficulty:3,duration:20}
    
    //{difficulty:0.2,duration:10},{difficulty:0.4,duration:10},{difficulty:0.5,duration:45},{difficulty:0.75,duration:15},{difficulty:1,duration:60},{difficulty:1.25,duration:60},{difficulty:1.5,duration:60},{difficulty:1.75,duration:60},{difficulty:2,duration:30}
    
    //{difficulty:0.75,duration:420},{difficulty:0.1,duration:30},{difficulty:2,duration:30}
    
    const builtPattern = _BuildExercisePattern(patternRequest);
    
    commandHandler.PlayExercisePattern(builtPattern);
    
    _SetTimer(patternRequest);
    
    console.error("time is incorrect because it doesn't include transition time");
    
}

// durRegularity measures variation in length of time doing a single exercise within the section
// diffVar measures how often a session will deviate from indicated difficulty
// rateVar measures how consistent the "beat" of the sections are

function LoadUserExercisePatternSelection(sectionCount){
    
    const returnArr = [];
    
    console.log(sectionCount);
    
    for(let i = 0; i < sectionCount; i++){
        
        const difficulty = Number(document.getElementById("difficultySelection" + i).value);
        
        const duration = Number(document.getElementById("durationSelection" + i).value);
        
        const section = {difficulty:difficulty, duration:duration};
        
        returnArr.push(section); 
    }
    
    console.log(returnArr);
    
    return returnArr
}

function _BuildExercisePattern(patternRequest){
    
    const exerciseCommands = [];
    
    for(const section of patternRequest){
        
        // a section is an object with difficulty, duration, diffVar, rateVar, and durRegularity props
        
        let sectionRemainingDuration = section.duration * 1000;
        
        while(sectionRemainingDuration > 0){
                    
            const chosenExercise = _ChooseSubsectionExercise(section);
                        
            const rate = _ChooseRate(chosenExercise,section);
            
            const restTime = _ChooseRestTime(chosenExercise,section);
            
            let reps = _ChooseReps(chosenExercise,section,sectionRemainingDuration,rate,restTime);
            
            if(reps < 1){
                
                reps = 1;
                sectionRemainingDuration = 0;
            }
            
            let transitionTime = 2050;
            
            if(section.difficulty < 1){
                
                transitionTime = 2050 + ((1 - section.difficulty) * 2050);
            }
            
                                
            exerciseCommands.push(new exerciseCommand(chosenExercise.type, reps,rate, restTime,transitionTime));
            
            const exerciseDuration = (1000 * (1/rate) * reps) + restTime + transitionTime;
            
            console.log(chosenExercise.type);
            
            console.log(exerciseDuration);
            
            console.log(`(${reps} * ${rate}) + ${restTime} = ${exerciseDuration}`);
            
            console.log(`${exerciseDuration}`)
            
            console.log(`${sectionRemainingDuration} - ${exerciseDuration} =`);
            
            sectionRemainingDuration = sectionRemainingDuration - exerciseDuration;
            
            
            console.log(sectionRemainingDuration);

            
            
            console.log((reps * rate) + restTime);
            
            
            console.log("~~~");
        }
        
        
    }
    
    return exerciseCommands
    
}



function  _ChooseSubsectionExercise(section){
    
    const shuffledExercises = ShuffleArray(exercises);
    
    return shuffledExercises[0];
}

function _ChooseRate(chosenExercise,section){
    
    return chosenExercise.difficulty1rate + (chosenExercise.difficultyLvRateChange * section.difficulty);
}

function _ChooseReps(chosenExercise,section,sectionRemainingDuration,rate,restTime){
    
    let reps = Math.round(chosenExercise.difficulty1reps * section.difficulty);
    
    while((reps * rate * 1000) + restTime > (sectionRemainingDuration)){
        
        reps--;
    }
    
    return reps
    
}

function _ChooseRestTime(chosenExercise,section){
    
    const restTime = chosenExercise.difficulty1rest - (chosenExercise.difficultyLvRestChange * section.difficulty);
    
    if(restTime < 500) return 500
    
    return restTime
}

function _SetTimer(patternRequest){
    
    let totalTime = 0;
    
    for(const p of patternRequest){
        
        totalTime += p.duration
    }
    
    totalTime = totalTime * 1000;
    
    const rtArtist = window.uiTH.GetArtistsByAuthorizedDOMId("remainingTime");
    
    rtArtist.SetDOMInnerTextTo(totalTime/1000);
    
    setInterval(function(){
        
        totalTime = totalTime - 1000;
        
        rtArtist.SetDOMInnerTextTo(totalTime/1000);
        
    },1000);
}