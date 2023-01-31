import {exerciseCommand} from "./exerciseCommand.js";
import {exercises} from "./exerciseData.js";
import {ShuffleArray} from "./utils.js";


const uiTH = new uiToolsHandler();

export function exerciseBeginFlow(){
    
    const commandHandler = window.commandHandler;
    
    // filter exercises based on user requests ("abs","legs", etc.)?
    
    // workout was 2 minutes longer than expected
    
    //const patternRequest = LoadUserExercisePatternSelection();
    
    const patternRequest = [{difficulty:0.2,duration:10},{difficulty:0.4,duration:10},{difficulty:0.5,duration:45},{difficulty:0.75,duration:15},{difficulty:1,duration:60},{difficulty:1.25,duration:60},{difficulty:1.5,duration:60},{difficulty:1.75,duration:60},{difficulty:2,duration:30}];
    
    //{difficulty:0.75,duration:420},{difficulty:0.1,duration:30},{difficulty:2,duration:30}
    
    const builtPattern = _BuildExercisePattern(patternRequest);
    
    commandHandler.PlayExercisePattern(builtPattern);
    
    
    
}

// durRegularity measures variation in length of time doing a single exercise within the section
// diffVar measures how often a session will deviate from indicated difficulty
// rateVar measures how consistent the "beat" of the sections are

function _BuildExercisePattern(patternRequest){
    
    const exerciseCommands = [];
    
    for(const section of patternRequest){
        
        // a section is an object with difficulty, duration, diffVar, rateVar, and durRegularity props
        
        let sectionRemainingDuration = section.duration * 1000;
        
        while(sectionRemainingDuration > 0){
                    
            const chosenExercise = _ChooseSubsectionExercise(section);
                        
            const rate = _ChooseRate(chosenExercise,section);
            
            let reps = _ChooseReps(chosenExercise,section,sectionRemainingDuration,rate);
            
            if(reps < 1){
                
                reps = 1;
                sectionRemainingDuration = 0;
            }
            
            const restTime = _ChooseRestTime(chosenExercise,section);
                                
            exerciseCommands.push(new exerciseCommand(chosenExercise.type, reps,rate, restTime));
            
            const exerciseDuration = (1000 * (1/rate) * reps) + restTime;
            
            sectionRemainingDuration = sectionRemainingDuration - exerciseDuration;
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

function _ChooseReps(chosenExercise,section,sectionRemainingDuration,rate){
    
    let reps = Math.round(chosenExercise.difficulty1reps * section.difficulty);
    
    while((reps * rate * 1000) > (sectionRemainingDuration + 1500)){
        
        reps--;
    }
    
    return reps
    
}

function _ChooseRestTime(chosenExercise,section){
    
    const restTime = chosenExercise.difficulty1rest - (chosenExercise.difficultyLvRestChange * section.difficulty);
    
    if(restTime < 500) return 500
    
    return restTime
}