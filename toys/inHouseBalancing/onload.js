import {PermutationsOf,GenerateCombinations} from "/utils/mathAndLogicUtils/miscUtils.js";

const converter = {1:0.1,2:0.37,3:1.02,4:2.22,5:5.52,6:9.62,7:15.72,8:22.62,9:33.62,10:42.22,11:52.02,12:60.12,13:72.12,14:78.42,15:83.72,16:87.32,17:92.22,18:94.32,19:95.72,20:96.62}

export function onload(){   
    const players =[
        
        {
            handle:"10K Hypnotic",
            name:"Brett",
            top:16,
            jg:16,
            mid:16,
            bot:16,
            sup:16
        },
        {
            handle:"Remy lebeau",
            name:"Erik",
            top:13,
            jg:12,
            mid:11,
            bot:9,
            sup:12
        },
        {
            handle:"10K CityMouse",
            name:"Julia",
            top:0,
            jg:0,
            mid:0,
            bot:13,
            sup:10
        },
        {
            handle:"10K Dandilyin",
            name:"Cole",
            top:0,
            jg:12,
            mid:16,
            bot:11,
            sup:16
        },
        {
            handle:"DennisRodman96",
            name:"Danny",
            top:9,
            jg:9,
            mid:12,
            bot:5,
            sup:9
        },
        {
            handle:"BrutusWhy",
            name:"Mike",
            top:0,
            jg:0,
            mid:6,
            bot:0,
            sup:5
        },
        {
            handle:"Bigboy36",
            name:"Abram",
            top:15,
            jg:15,
            mid:13,
            bot:11,
            sup:12
        },
        {
            handle:"Binbik",
            name:"TMan",
            top:15,
            jg:17,
            mid:14,
            bot:0,
            sup:18
        },
        {
            handle:"Jupiterjr",
            name:"Brendan",
            top:12,
            jg:14,
            mid:13,
            bot:14,
            sup:12
        },
        {
            handle:"10k trsckb",
            name:"Joe",
            top:9,
            jg:9,
            mid:7,
            bot:5,
            sup:5
        },
        {
            handle:"10K FallingCat",
            name:"Dave",
            top:5,
            jg:5,
            mid:0,
            bot:6,
            sup:4
        },
        {
            handle:"10k jjnguy",
            name:"Justin",
            top:4,
            jg:0,
            mid:8,
            bot:6,
            sup:8
        },
        {
            handle:"10K Pikachu",
            name:"Joseph",
            top:9,
            jg:10,
            mid:8,
            bot:8,
            sup:9
        },
        {
            handle:"Dawn of the Dew",
            name:"Dewey",
            top:8,
            jg:8,
            mid:4,
            bot:4,
            sup:16
        },
        {
            handle:"Definitely MJ",
            name:"Scott",
            top:11,
            jg:9,
            mid:13,
            bot:14,
            sup:13
        },
        {
            handle:"Mechka",
            name:"Dylan",
            top:17,
            jg:0,
            mid:0,
            bot:16,
            sup:0
        }
        
    ]
    
    // evaluate one group of 10 only
    
    const groupArr = EvaluateGroup([_GetPlayerByName(players,"Abram"),_GetPlayerByName(players,"Brendan"),_GetPlayerByName(players,"Brett"),_GetPlayerByName(players,"Cole"),_GetPlayerByName(players,"Dylan"),_GetPlayerByName(players,"Erik"),_GetPlayerByName(players,"Joe"),_GetPlayerByName(players,"Joseph"),_GetPlayerByName(players,"Julia"),_GetPlayerByName(players,"Mike")],608,5,1);
    
    groupArr.sort(function(a, b){return a.matchDiff - b.matchDiff});
    
    _Declare(`TOTAL VALID COMBOS: ${groupArr.length}`);
    
    for(const match of groupArr){
        
        _Declare(`Group${match.groupNum}/Perm${match.permCount} -- MATCH SCORE: ${match.matchTotal} MATCH DIFF: ${match.matchDiff} \n ${match.team0Names} ${match.team0Total} vs ${match.team1Total} ${match.team1Names}`);
    }
    
    
    return
    
    // evaluate every possible group of 10
    
    let returnArr = [];
    
    const lowestAcceptableMatchScore = 738;
    
    const highestAcceptableMatchDiff = 0.1;
    
    console.warn(`filter out any result with a match score under ${lowestAcceptableMatchScore} or match diff above ${highestAcceptableMatchDiff}`);
    
    const groupsOfUniqueTen = GenerateCombinations(players,10);
    
    _Declare(`UNIQUE GROUPS: ${groupsOfUniqueTen.length}`);
    
    const startingGroup = 1502;
    
    const numberOfGroupsToEvaluate = 750;
    
    for(let i = startingGroup; i < numberOfGroupsToEvaluate + startingGroup; i++){
        
        _Declare(`evaluating group ${i}`);
        
        returnArr = returnArr.concat(EvaluateGroup(groupsOfUniqueTen[i],lowestAcceptableMatchScore,highestAcceptableMatchDiff,i));
    }
    
    
    returnArr = returnArr.sort(function(a, b){return a.matchDiff - b.matchDiff});
    
    _Declare(`TOTAL VALID COMBOS: ${returnArr.length}`);
    
    for(const match of returnArr){
        
        _Declare(`Group${match.groupNum}/Perm${match.permCount} -- MATCH SCORE: ${match.matchTotal} MATCH DIFF: ${match.matchDiff} \n ${match.team0Names} ${match.team0Total} vs ${match.team1Total} ${match.team1Names}`);
    }
    
}

function EvaluateGroup(group,lowestAcceptableMatchScore,lowestAcceptableMatchDiff,groupNum){
    
    const returnArr = [];

    const permsWithinGroup = PermutationsOf(group);
    
    //_Declare(`TOTAL PERMUTATIONS OF GROUP: ${permsWithinGroup.length}`);
    
    let validPermsArr = [];
    
    let permCount = 0;
    
    let validPermCount = 0;
    
    let permStart = 0;
    
    let permEnd = permsWithinGroup.length;
    
    for(let i = permStart; i < permEnd; i++){
        
        const perm = permsWithinGroup[i];
        
        //console.log(permsWithinGroup[i]);
        
        let team0Total = 0;
        
        let team1Total = 0;
        
        let invalidPosAssignment = false;
        
        let posString;
        
        permCount++;
        
        for(let posInd = 0; posInd < 5; posInd++){
            
            if(posInd == 0) posString = "top";
            if(posInd == 1) posString = "jg";
            if(posInd == 2) posString = "mid";
            if(posInd == 3) posString = "bot";
            if(posInd == 4) posString = "sup";
            
            const leftPlayer = perm[posInd];
            
            const rightPlayer = perm[posInd+5];
            
            const leftTeamRankRating = leftPlayer[posString];
            
            const rightTeamRankRating = rightPlayer[posString];
            
            if(leftTeamRankRating == 0 || rightTeamRankRating == 0){
                //_Declare(`skipping ${perm[posInd].name}/${perm[posInd+5].name} rating is ${perm[posInd][posString]}/${perm[posInd+5][posString]} for ${posString}`)
                invalidPosAssignment = true;
                break
            }
            else{
                
                const leftTeamPercentilePoints = converter[leftTeamRankRating];
                const rightTeamPercentilePoints = converter[rightTeamRankRating]
                
                //console.log(`Percentile points // ${leftPlayer.name}:${leftTeamPercentilePoints} vs ${rightPlayer.name}:${rightTeamPercentilePoints}`)
                
                team0Total += leftTeamPercentilePoints;
                team1Total += rightTeamPercentilePoints;
            }
        }
        
        if(invalidPosAssignment) continue
        if(team0Total + team1Total < lowestAcceptableMatchScore) continue
        if(Math.abs(team1Total - team0Total) > lowestAcceptableMatchDiff) continue
        
        const team0Names = `${perm[0].name}/${converter[perm[0].top]} ${perm[1].name}/${converter[perm[1].jg]} ${perm[2].name}/${converter[perm[2].mid]} ${perm[3].name}/${converter[perm[3].bot]} ${perm[4].name}/${converter[perm[4].sup]}`;
        
        const team1Names = `${perm[5].name}/${converter[perm[5].top]} ${perm[6].name}/${converter[perm[6].jg]} ${perm[7].name}/${converter[perm[7].mid]} ${perm[8].name}/${converter[perm[8].bot]} ${perm[9].name}/${converter[perm[9].sup]}`;
        
        
        
        //_Declare(`Combo count ${permCount}: ${team0Names} vs ${team1Names}`);
        
        validPermsArr.push({groupNum:groupNum,permCount: permCount, team0Names:team0Names, team1Names:team1Names, team0Total: team0Total, team1Total: team1Total, matchTotal: (team0Total + team1Total), matchDiff:Math.abs(team0Total - team1Total)});
        
        //validPermCount++
        
        //if(validPermCount > 200) break
        
    }
    
    return validPermsArr
    
    //validPermsArr = validPermsArr.sort(function(a, b){return a.matchDiff - b.matchDiff});
    
    //_Declare(`TOTAL VALID COMBOS: ${validPermsArr.length}`);
    
//    for(const match of validPermsArr){
//        
//        _Declare(`Group${groupNum}/Perm${match.permCount} -- MATCH SCORE: ${match.matchTotal} MATCH DIFF: ${match.matchDiff} \n ${match.team0Names} ${match.team0Total} vs ${match.team1Total} ${match.team1Names}`);
//    }
}


function _Declare(string){
    
    console.log(string);
}

function _GetPlayerByName(playerArr,name){
    
    for(const p of playerArr){
        
        if(p.name == name) return p
    }
}