export function GetCardsFromScryfall(db) {
    
    const name = "Anafenza";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var txt = this.responseText;
        var obj = JSON.parse(txt);
    
        
        console.log(BuildMagicData(name,obj.data,db));
        
        window.db.data.push(BuildMagicData(name,obj.data,db));
        
        //window.db.OutputData();
    }
  };
    xhttp.open("GET", `https://api.scryfall.com/cards/search?q=` + name + `&unique=cards`, true);
    xhttp.send();
}

function GetCardPower(card){
    
    if(card.hasOwnProperty("power")) return Number(card.power);
    else return 0
}

function GetCardToughness(card){
    
    if(card.hasOwnProperty("toughness")) return Number(card.toughness);
    else return 0
}

function GetCardStrategy(card){
    
    if(card.hasOwnProperty("cmc")) return Number(card.cmc);
    else return 0
}

function GetCardSpeed(card){
    
    const $typeLine = card.type_line.toLowerCase();
    const $oracleText = GetOracleText(card).toLowerCase();
    
    console.log($oracleText.match("flash"));
    
    if($typeLine.match("instant") !=null ||
      $oracleText.match("flash") !=null) return 1;
    else return 0
}

function GetCardRenown(card){
    
    const $legalities = card.legalities;
    
    let $renown = 0;
    
    if($legalities.commander == "not_legal") $renown++
    if($legalities.legacy == "not_legal") $renown++
    if($legalities.standard == "not_legal") $renown++
    if($legalities.vintage == "not_legal") $renown++
    if($legalities.modern == "not_legal") $renown++
    
    return $renown
}

function GetCardCunning(card){
    
    const $colorID = card.color_identity;
    const $oracleText = GetOracleText(card).toLowerCase();
    
    let $cunning = 0;
    
    for(const color of $colorID){
        
        if(color == "U" || color == "B") $cunning++
    }
    
    if($oracleText.split(" ").length > 50) $cunning++
    
    return $cunning
}


function GetOracleText(card){
    
    if(card.hasOwnProperty("oracle_text")) return card.oracle_text
    
    if(card.hasOwnProperty("card_faces")) return card.card_faces[0].oracle_text + " " + card.card_faces[1].oracle_text
    
    else return ""
}

function SkipPartialNameMatch(name,card){
    
    const $testName = card.name.replace("'s","").replace(",","");
    
    if($testName.match(name) != null) return false
    else{ 
        //console.log("skipped " + $testName);
        return true
    }
}

function SkipSilverBorderCards(card){
    
    if(card.border_color == "silver") return true
    else return false
}

function AssignCharacterTraits(name,list){
    
    let $obj = {name:name, cards:0, power:0, toughness:0, strategy:0, speed:0, renown:0, cunning:0};
    
    for(const card of list){
        
        if(SkipPartialNameMatch(name,card)) continue
        if(SkipSilverBorderCards(card)) continue
        
        $obj.power += GetCardPower(card);
        $obj.toughness += GetCardToughness(card);
        $obj.strategy += GetCardStrategy(card);
        $obj.speed += GetCardSpeed(card);
        $obj.renown += GetCardRenown(card);
        $obj.cunning += GetCardCunning(card);
        $obj.cards++;
        
    }
    
    return $obj
}

function BuildMagicData(name,list){
    
    
    return AssignCharacterTraits(name,list);
    
}



export const magicData = [
    
     {

    },
    
    
]