import {ShuffleArray} from "../../../utils/mathAndLogicUtils/miscUtils.js";


export function BeginBedtimeRoutine(){
    
    const rh = window.routineHandler;
    
    _ChooseVoiceProfile();
    
    rh.AddAction("Wash hands", 45);
    
    rh.AddAction("Prepare toothbrush", 30);
    
    rh.AddAction("Brush teeth", 120);
    
    rh.AddAction("Brush tongue", 15);
    
    rh.AddAction("Spit out toothpaste and clean toothbrush", 20);
    
    rh.AddAction("Prepare floss", 20);
    
    rh.AddAction("Floss",120);
    
    rh.AddAction("Get water",120);
    
    rh.BeginRoutine();
}

function _ChooseVoiceProfile(){
    
    const rh = window.routineHandler;
    
    const voicepackArr = ShuffleArray(["../routineCommander/voicepacks/superliminalDrBedtime/","../routineCommander/voicepacks/batmanBedtime/","../routineCommander/voicepacks/robAnybodyBedtime/","../routineCommander/voicepacks/superliminalAIBedtime/"])
    
    rh.voiceProfilePath = voicepackArr[0];
}