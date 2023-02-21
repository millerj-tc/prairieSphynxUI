export class utilityUIArtist
{
    constructor(uiToolsHandler){
        
        this.uiToolsHandler = uiToolsHandler;
    }
    
    CapitalizeLettersAfterAppropriatePunctuation(text){
    
        return text.replace(/(?<=\. \W*|\! \W*|\? \W*|\: \W*)\w/mg,function(match){return match.toUpperCase()})

    }
    
    ReplaceNReturnWithBr(text){
    
        return text.replace(/\n/gm,"<br>");
    }
    
    GetSpanWithImageTagsReplacedWithImagesFromText(text){
        
        //ex: $$IMAGE:/images/char/char.pngIMAGE$$
                
        let textSplitArr = text.split("IMAGE##");
        
        const span = document.createElement("span");
        
        for(const t of textSplitArr){
            
            const imgLink = t.match(/(?<=\#\#IMAGE:)(.*)/gm);
            
            const img = document.createElement("img");

            if(imgLink != null) img.src = imgLink;
            
            const plainText = t.replace(/\#\#IMAGE:(.*)/gm,"");
            
            span.append(plainText);
            
            span.append(img);    
        }
                
        return span
    }
    
    ReturnStringOfNounsBasedOnNumber(nounArr){
        
        // nounArr must be strings
        
        let $returnString = "";
        
        for(let i = 0; i < nounArr.length; i++){
            
            if(nounArr.length == 1) $returnString = nounArr[0];
            else if(i == nounArr.length - 1){
                
                $returnString += " and " + nounArr[i];
            }
            else if(nounArr.length == 2) $returnString += nounArr[i]
            else $returnString += nounArr[i] + ",";
        }
            
        return $returnString
    }
    
    ReplacePronouns(obj,string,pIndex = ""){
    
        let $returnString = string;
        
        let they;
        let them;
        let their;
        let theirs;
        let themself;
        
        let pronounObj = obj
        
        if(Array.isArray(obj) && obj.length > 1){
            
            they = "they";
            them = "them";
            their = "their";
            theirs = "theirs";
            themself = "themselves";
        }
        
        else {
            
            if(Array.isArray(obj) && obj.length == 1){
            
                pronounObj = obj[0];
            }

            if(pronounObj.GetPronouns == null){

                console.log(pronounObj);

                they = pronounObj.pronouns.they;
                them = pronounObj.pronouns.them;
                their = pronounObj.pronouns.their;
                theirs = pronounObj.pronouns.theirs;
                themself = pronounObj.pronouns.themself;
            }

            else{

                they = pronounObj.GetPronouns().they;
                them = pronounObj.GetPronouns().them;
                their = pronounObj.GetPronouns().their;
                theirs = pronounObj.GetPronouns().theirs;
                themself = pronounObj.GetPronouns().themself;
            }
        }
        
        $returnString = $returnString.replaceAll("[p" + pIndex + "[they]]",they);

        $returnString = $returnString.replaceAll("[p" + pIndex + "[them]]",them);

        $returnString = $returnString.replaceAll("[p" + pIndex + "[their]]",their);

        $returnString = $returnString.replaceAll("[p" + pIndex + "[theirs]]",theirs);

        $returnString = $returnString.replaceAll("[p" + pIndex + "[themself]]",themself);

        if(they != "they"){

            $returnString = $returnString.replaceAll("[p" + pIndex + "[are]]","is");
        }
        else{
            
            $returnString = $returnString.replaceAll("[p" + pIndex + "[are]]","are");
        }

        return $returnString
    }
    
    ReplaceWordsBasedOnPluralSubjects(arrayOfSubjects,string,pIndex){ 
        //arrayOfSubjects could be any array that represents the subjects in the sentence (objects, strings, etc.), all this cares about is counting the number to determine if there's more than 1 
        //string ex: " ~s~manages/manage~~ to capture "
    
        let $returnString = string;
        
        let pInd;
        
        if(pIndex == null) pInd = "";
        else pInd = pIndex
        
        const regex = new RegExp(`\\~s` + pInd + `\\~(.*?)\\~(.*?)\\~`,"gm");

        if($returnString.match(regex) == null) return $returnString

        if(arrayOfSubjects.length < 1) console.warn("ReplaceWordsBasedOnPluralSubjects passed 0 length array!")

        let $matches;

        let replacerFunc;
        
        if(arrayOfSubjects.length == 1) replacerFunc = this._SingleSubjectsReplacer
        else replacerFunc = this._PluralSubjectsReplacer
        
        $returnString = $returnString.replace(regex,replacerFunc);

        return $returnString
    }


    _SingleSubjectsReplacer(match){
        
        console.log(match);
        
        const regex = new RegExp(`(?<=\\~s(.*?)\\~)(.*?)(?=\\~(.*?)\\~)`,"gm");
        
        const internalMatch = match.match(regex)[0];

        return internalMatch.split("/")[0];
    }

    _PluralSubjectsReplacer(match){

        const regex = new RegExp(`(?<=\\~s(.*?)\\~)(.*?)(?=\\~(.*?)\\~)`,"gm");
        
        const internalMatch = match.match(regex)[0];

        return internalMatch.split("/")[1];
    }
    
    ReplaceWordsBasedOnPluralSubjectsOld(arrayOfSubjects,string,pIndex){ 
        //arrayOfSubjects could be any array that represents the subjects in the sentence (objects, strings, etc.), all this cares about is counting the number to determine if there's more than 1 
        //string ex: " [p[manages/manage]p] to capture "
    
        let $returnString = string;

        if($returnString.match(/\[p(.*?)\[(.*?)\]p\]/) == null) return $returnString

        if(arrayOfSubjects.length < 1) console.warn("ReplaceWordsBasedOnPluralSubjects passed 0 length array!")

        let $modifiedGroup;

        let $matches;
        
        let pInd;
        
        if(pIndex == null) pInd = "";
        else pInd = pIndex
        
        const regex = new RegExp(`\\[p` + pInd + `\\[(.*?)\\](.*?)\\]`,"gm");

        const $matchCount = $returnString.match(/\[p\[(.*?)\]p\]/g).length;

        for(let i = 0; i < $matchCount; i ++){

             $modifiedGroup = $returnString.match(/\[p\[(.*?)\]p\]/)[1];

            // below used to be "if(array.length == 1 || array.hasOwnProperty("dataType"))"
            if(arrayOfSubjects.length == 1) $modifiedGroup = $modifiedGroup.split("/")[0]
            else if(arrayOfSubjects.length > 1) $modifiedGroup = $modifiedGroup.split("/")[1]

            $returnString = $returnString.replace(/\[p\[(.*?)\]p\]/,$modifiedGroup);
        }

        return $returnString
    }
}
