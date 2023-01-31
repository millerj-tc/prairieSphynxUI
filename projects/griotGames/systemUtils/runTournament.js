import {statsTracker} from "./charStatTracking.js";


export function RunTournament()
{
    const $entries = [
        
    ]
    
    const $statsTracker = new statsTracker();
    
    console.log("tournament begin");
    
    for(const entry of $entries){
        
        console.log("=============== evaluating " + entry.rosterName.toUpperCase() + " ===============");
        
        let $competitionArr = $entries.filter(e => e != entry);
        
        for(const opp of $competitionArr){
            
            console.log("vs " + opp.rosterName);
                    
            for(const scenario of window.gameHandler.scenarioHandler.scenarios){

                let $leftTeam = _LoadTournamentChoices(scenario,entry,"left");

                let $rightTeam = _LoadTournamentChoices(scenario,opp,"right");
                
                scenario.scenarioHandler.GotoScenario(scenario);
                
                scenario.ScenarioRun(true); //-- set to TRUE for tournament output during matches
                
                console.log("WINNERS FOR " + scenario.id + ": " + scenario.winningTeam);
                
                if(scenario.winningTeam == "left"){
                    
                    for(const char of scenario.savedLocCharSlots) $statsTracker.ReportMatchForChar(char,scenario)
                    
                    entry.winCount++;
                }
                
            }
        
        }
        
        console.log(entry.rosterName + " won " + entry.winCount + "/" + $competitionArr.length + " matches. WR%=" + (entry.winCount/$competitionArr.length));
        
    }
    
    $statsTracker.DisplayWinRatesByChar();
    //$statsTracker.DisplayAverageXpByChar();
    $statsTracker.DisplayWinRateForCharWithAllies("Wolverine", ["Bishop"]);
    $statsTracker.DisplayWinRateForCharWithAllies("Wolverine", ["Cyclops"]);
    $statsTracker.DisplayWinRateForCharWithAllies("Cyclops", ["Psylocke"]);
    $statsTracker.DisplayWinRateForCharWithAllies("Wolverine", ["Wolverine"]);
}
    
 function _LoadTournamentChoices(scenario,entry,alignment){
     
     let $returnTeam = [];
                
    for(const loc of scenario.cardZoneHandler.cardZones){

        let $charsAssignedToCardZone = [...entry[scenario.id][loc.id]];

        for(const charSlot of loc.charSlots){
            


            for(const char of entry[scenario.id][loc.id]){

                if(alignment == charSlot.alignment) {
                    

                    let $charInst = scenario.GetScenarioChar($charsAssignedToCardZone.shift());
                
                    scenario.savedLocCharSlots.push({characterName: $charInst.name,alignment: alignment, cardZoneId: loc.id, selectId: charSlot.selectId});
                    
                    $returnTeam.push({name:$charInst.name,wins:0});

                    break

                }
            }
        }
    }
     
     return $returnTeam
}