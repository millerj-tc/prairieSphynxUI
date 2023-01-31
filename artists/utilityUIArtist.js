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
    
    ReplacePronouns(obj,string){
    
        let $returnString = string;
        
        // you could improve this by letting the coder type [1-they] / [2-they] for two different characters who might use different pronoun sets

        $returnString = $returnString.replaceAll("[they]",obj.GetPronouns().they);

        $returnString = $returnString.replaceAll("[them]",obj.GetPronouns().them);

        $returnString = $returnString.replaceAll("[their]",obj.GetPronouns().their);

        $returnString = $returnString.replaceAll("[theirs]",obj.GetPronouns().theirs);

        $returnString = $returnString.replaceAll("[themself]",obj.GetPronouns().themself);

        if(obj.GetPronouns().they != "they"){

            $returnString = $returnString.replaceAll("[are]","is");
        }

        return $returnString
    }

}