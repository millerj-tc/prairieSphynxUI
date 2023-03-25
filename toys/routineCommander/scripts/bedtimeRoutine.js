import {ShuffleArray} from "../../../utils/mathAndLogicUtils/miscUtils.js";


export function BeginBedtimeRoutine(){
    
    const rh = window.routineHandler;
    
    _ChooseVoiceProfile();
    
    rh.AddAction("Wash hands", 60);
    
    rh.AddAction("Brush teeth", 60);
    
    rh.AddAction("Floss",60);
    
    rh.AddAction("Get water",60);
    
    // non repeating reminders
    
    // custom function for each routine / action so that you can have special lines that only pertain to being near the end or beginning of certain actions, etc.
    
    // routine intro
    ///action intro
    ////action reminders?
    
    rh.BeginRoutine();
}

function _ChooseVoiceProfile(){
    
    const rh = window.routineHandler;
    
    const voicepackArr = ShuffleArray(["../routineCommander/voicepacks/superliminalDrBedtime/","../routineCommander/voicepacks/batmanBedtime/","../routineCommander/voicepacks/robAnybodyBedtime/","../routineCommander/voicepacks/superliminalAIBedtime/"])
    
    rh.voiceProfilePath = voicepackArr[0];
}