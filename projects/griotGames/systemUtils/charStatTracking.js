class matchResult
{
    constructor(){
        
        this.win;
        this.xp;
        this.allyChars = [];
        this.enemyChars = [];
    }
}

class charStatsHolder
{
    constructor(char){
        
        this.char = char;
        this.charName = char.characterName;
        this.matches = [];
    }
    
    AddMatchResults(char,scenario){
        
        const $match = new matchResult();
                
        this._GetCharTeammatesEnemies($match,char,scenario);
        
        this._GetScenarioWin($match,char,scenario);
        
        this._GetCharXp($match,char,scenario);
        
        this.matches.push($match);
    }
    
    _GetScenarioWin(match,char,scenario){
        
        if(scenario.winningTeam == char.alignment) match.win = true
        else match.win = false
    }
    
    _GetCharTeammatesEnemies(match,char,scenario){
        
        let $teammates = [];
        
        let $enemies = [];
        
        for(const otherChar of scenario.savedLocCharSlots){
            
            if(otherChar.alignment == char.alignment && otherChar.name != char.name) $teammates.push(otherChar)
            else if(otherChar.alignment != char.alignment) $enemies.push(otherChar);
        }
        
        match.allyChars = $teammates;
        match.enemyChars = $enemies;
    }
    
    _GetCharXp(match,char,scenario){
        
        for(const scenarioChar of scenario.savedLocCharSlots){
            
            if(this.charName == scenarioChar.characterName) match.xp = scenarioChar.xp
        }
    }
    
    GetWinRate(){
        
        let $wins = 0;
        let $matchCount = 0;
        
        for(const match of this.matches) {
            if(match.win) $wins++
            $matchCount++
        }
        
        return $wins/$matchCount
    }
    
    GetWinRateWithAllies(allies){ //-- allies must be arr
        
        let $wins = 0;
        let $matchCount = 0;
        
        for(const match of this.matches) {
            
            let $allyMatches = 0;
            
            for(const ally of allies){
              
              for(const allyObj of match.allyChars) {
                  
                  if(allyObj.name == ally) $allyMatches++ 
              }
            
            }
            
            if($allyMatches < allies.length) continue
            
            if(match.win) $wins++
            $matchCount++
        }
        
        return $wins/$matchCount
    }
    
    GetAverageXp(){
        
        let $xpSum = 0;
        let $matchCount = 0;
        
        for(const match of this.matches){
            $xpSum += match.xp;
            $matchCount++;
        }
        
        return $xpSum/$matchCount
    }
}

export class statsTracker
{
    constructor(){
        
        this.charStatsHolders = [];
    }
    
    GetCharStatsHolder(char){
        
        if(this.charStatsHolders.length == 0) {
        
            return this._AddNewCharStatsHolder(char);
        
        }
        
        for(const csh of this.charStatsHolders){
            

            
            if(csh.charName == char.characterName) return csh
        }
        
        //-- if one doesn't exist, make a new one
               
        return this._AddNewCharStatsHolder(char);

    }
    
    _AddNewCharStatsHolder(char){
        
        const $csh = new charStatsHolder(char);
        
        this.charStatsHolders.push ($csh);
        
        return $csh
    }
    
    ReportMatchForChar(char,scenario){
        
        let $statsHolder = this.GetCharStatsHolder(char);
        
        $statsHolder.AddMatchResults(char,scenario);
    }
    
    DisplayWinRatesByChar(){
        
        for(const char of this.charStatsHolders){
            
            console.log(char.charName + ": " + char.GetWinRate());
        }
    }
    
    DisplayAverageXpByChar(){
        
        for(const char of this.charStatsHolders){
            
            console.log(char.charName + " averageXp: " + char.GetAverageXp());
        }
    }
    
    DisplayWinRateForCharWithAllies(name,allies){ //-- allies must be arr
        
        for(const char of this.charStatsHolders){
            
            if(char.charName == name) console.log(char.charName + " wins with " + allies + ": " + char.GetWinRateWithAllies(allies));
        }
    }
    
}