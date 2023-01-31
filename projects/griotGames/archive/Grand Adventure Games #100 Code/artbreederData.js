

export function intializeInterpersRelationships(char){
    
    if(char.name == "Vampiress Smim"){
        
        const $fx = char.AddInterpers("hope");
        
        $fx.targetCharsStrings = ["Aqee","Itaru","Keh"];
        $fx.effectText = "[targets],[[ a/]] former demon hunter[[/s]], [[is/are]] uncomfortable with [owner] on their team. Before she reformed, Smim killed many people.<br><br>";
        $fx.hopeModifier = -1;
        
        //console.log(char);
    }
    
    if(char.name == "Elm"){
        
        const $fx = char.AddInterpers("hope");
        
        $fx.targetCharsStrings = ["Lily","Peneluz"];
        $fx.effectText = "[targets] [[loves/love]] [owner] so much, they are grateful to be on a team with her.<br><br>";
        $fx.hopeModifier = 1;
    }
    
    if(char.name == "Dayaqa"){
        
        const $fx = char.AddInterpers("hope");
        
        $fx.targetCharsStrings = ["Aqee","Izmaela"];
        $fx.effectText = "[owner] has worked a lot with [targets]. She knows exactly which spells to prepare to support them.<br><br>";
        $fx.hopeModifier = 1;
    }
    
    if(char.name == "Hukho"){
        
        const $fx = char.AddInterpers("hope");
        
        $fx.targetCharsStrings = ["Lizzeeta"];
        $fx.effectText = "[owner] and [targets] just don't seem to get along.<br><br>";
        $fx.hopeModifier = -1;
    }
    
    if(char.name == "Lizzeeta"){
        
        const $fx = char.AddInterpers("hope");
        
        $fx.targetCharsStrings = ["Hukho"];
        $fx.effectText = "";
        $fx.hopeModifier = -1;
    }
    
    if(char.name == "Brick"){
        
        const $fx = char.AddInterpers("hope");
        
        $fx.targetCharsStrings = ["Lizzeeta","Lily","Arelta"];
        $fx.effectText = "[targets] [[flirts/flirt]] with [owner] before the Games begin in earnest. Being a goofball himbo, he notices nothing -- which delights them all the more.<br><br>";
        $fx.hopeModifier = 1;
    }
    
    if(char.name == "Viatrix"){
        
        const $fx = char.AddInterpers("hope");
        
        $fx.targetCharsStrings = ["Sinch"];
        $fx.effectText = "[owner] was the one who first believed in [targets] and helped her grow her stength and powers. Sinch is forever indebted to Viatrix for that.<br><br>";
        $fx.hopeModifier = 1;
    }
}


export const artbreederData = [
    

{
name:"Vampiress Smim",
dataType:"char",
image125:"images/artbreeder/smim-125.png",
image75:"images/artbreeder/smim-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:17,
toughness:12,
cunning:11,
spirit:3,
charisma:16,
speed:12,
cume:15,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Itaru",
dataType:"char",
image125:"images/artbreeder/itaru-125.png",
image75:"images/artbreeder/itaru-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:16,
toughness:10,
cunning:13,
spirit:6,
charisma:7,
speed:9,
cume:11,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Keh",
dataType:"char",
image125:"images/artbreeder/keh-125.png",
image75:"images/artbreeder/keh-75.png",
pronouns:{they: "they", them: "them", their: "their", theirs: "theirs", themself: "themself"},
power:15,
toughness:15,
cunning:8,
spirit:11,
charisma:1,
speed:14,
cume:12,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Peneluz",
dataType:"char",
image125:"images/artbreeder/peneluz-125.png",
image75:"images/artbreeder/peneluz-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:14,
toughness:8,
cunning:5,
spirit:8,
charisma:3,
speed:6,
cume:5,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Sinch",
dataType:"char",
image125:"images/artbreeder/sinch-125.png",
image75:"images/artbreeder/sinch-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:13,
toughness:14,
cunning:10,
spirit:17,
charisma:8,
speed:7,
cume:13,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Aqee",
dataType:"char",
image125:"images/artbreeder/aqee-125.png",
image75:"images/artbreeder/aqee-75.png",
pronouns:{they: "they", them: "them", their: "their", theirs: "theirs", themself: "themself"},
power:12,
toughness:13,
cunning:16,
spirit:10,
charisma:12,
speed:13,
cume:16,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Leigh",
dataType:"char",
image125:"images/artbreeder/leigh-125.png",
image75:"images/artbreeder/leigh-75.png",
pronouns:{they: "he", them: "him", their: "him", theirs: "his", themself: "himself"},
power:11,
toughness:4,
cunning:3,
spirit:16,
charisma:2,
speed:11,
cume:6,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Hukho",
dataType:"char",
image125:"images/artbreeder/hukho-125.png",
image75:"images/artbreeder/hukho-75.png",
pronouns:{they: "he", them: "him", their: "him", theirs: "his", themself: "himself"},
power:10,
toughness:11,
cunning:9,
spirit:7,
charisma:17,
speed:15,
cume:14,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Lizzeeta",
dataType:"char",
image125:"images/artbreeder/lizzeeta-125.png",
image75:"images/artbreeder/lizzeeta-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:9,
toughness:17,
cunning:7,
spirit:13,
charisma:14,
speed:16,
cume:17,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Elm",
dataType:"char",
image125:"images/artbreeder/elm-125.png",
image75:"images/artbreeder/elm-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:8,
toughness:16,
cunning:4,
spirit:14,
charisma:10,
speed:8,
cume:10,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Viatrix",
dataType:"char",
image125:"images/artbreeder/viatrix-125.png",
image75:"images/artbreeder/viatrix-75.png",
pronouns:{they: "they", them: "them", their: "their", theirs: "theirs", themself: "themself"},
power:7,
toughness:5,
cunning:6,
spirit:12,
charisma:15,
speed:3,
cume:7,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Lily",
dataType:"char",
image125:"images/artbreeder/lily-125.png",
image75:"images/artbreeder/lily-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:6,
toughness:6,
cunning:15,
spirit:9,
charisma:13,
speed:10,
cume:9,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Izmaela",
dataType:"char",
image125:"images/artbreeder/izmaela-125.png",
image75:"images/artbreeder/izmaela-75.png",
pronouns:{they: "xe", them:"xem", their: "xyr", theirs: "xyrs", themself: "xemself"},
power:5,
toughness:9,
cunning:12,
spirit:2,
charisma:5,
speed:17,
cume:8,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Dayaqa",
dataType:"char",
image125:"images/artbreeder/dayaqa-125.png",
image75:"images/artbreeder/dayaqa-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:4,
toughness:7,
cunning:14,
spirit:4,
charisma:9,
speed:4,
cume:4,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Brick",
dataType:"char",
image125:"images/artbreeder/brick-125.png",
image75:"images/artbreeder/brick-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:3,
toughness:2,
cunning:1,
spirit:15,
charisma:11,
speed:5,
cume:3,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Gerard",
dataType:"char",
image125:"images/artbreeder/gerard-125.png",
image75:"images/artbreeder/gerard-75.png",
pronouns:{they: "he", them: "him", their: "him", theirs: "his", themself: "himself"},
power:2,
toughness:3,
cunning:17,
spirit:1,
charisma:4,
speed:1,
cume:2,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
},

{
name:"Arelta",
dataType:"char",
image125:"images/artbreeder/arelta-125.png",
image75:"images/artbreeder/arelta-75.png",
pronouns:{they: "she", them: "her", their: "hers", theirs: "hers", themself: "herself"},
power:1,
toughness:1,
cunning:2,
spirit:5,
charisma:6,
speed:2,
cume:1,
interpersFxs: [],
interpersTeamBuffs: [],
interpersLocDebuffs: [],
interpersLocBuffs: []
}
    
    
]