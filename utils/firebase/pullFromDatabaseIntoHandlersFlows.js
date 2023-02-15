import {GetUserPoems} from "./firebaseGetUserData.js";

export function PullPoemsFromProfileIntoMemoryFlow(data){
    
    const poemObjArr = data;
    
    _ParsePoemText(data,poemObjArr);
}

function _ParsePoemText(data,poemObjArr){
    
    for(const poemObjString in poemObjArr){
        
        const pulledPoemObj = data[poemObjString];
    
        window.gameHandler.poemMemoryHandler.AddPoemToMemory(pulledPoemObj.poemText,poemObjString);
    }
}

export function PullDomeWordsFromDBIntoMindFlow(data){
    
    const domeObjArr = data;
    
    for(const domeObjString in domeObjArr){
        
        const pulledDomeObj = data[domeObjString];
        
        window.gameHandler.domeWordHandler.AddDomeWord(pulledDomeObj.text,pulledDomeObj.frequency,domeObjString);
    }
}