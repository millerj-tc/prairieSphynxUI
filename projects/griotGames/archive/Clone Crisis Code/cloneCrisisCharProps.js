export function AddCloneCrisisSpecificCharProps(arr){
    
    for(const char of arr){
        
        if(char.name == "Beast"){
            
            char.captureText = `"I didn't calculate this outrageous and unjust outcome. Perhaps I misplaced a decimal point..."`;
        }
        
        if(char.name == "Black Panther"){
            
            char.captureText = `"For how long do you think you can hold the King of Wakanda before the reprecussions catch up to you?"`;
        }
        
        if(char.name == "Bishop"){
            
            char.captureText = `"Just remember, I've seen the future. I know what happens to you."`;
        }
        
        if(char.name == "Cyclops"){
            
            char.captureText = `"I know the rest can do it without me! You'll never win!"`;
        }
        
        if(char.name == "Colossus"){

            char.captureText = `"HA! Where will you hold COLOSSUS that he cannot escape from!? Your muscles are punier than my brain! BAHAHAHAHA!!"`;
        }
        
        if(char.name == "Daredevil"){
            
            char.captureText = `"My senses tell me that my decision was correct -- I did the right thing."`;
        }
        
        if(char.name == "Jessica Jones"){
            
            char.captureText = `"Look, I'm hungover and I'm beat up, just stick me someplace with a cot and you won't hear any complaints."`;
        }
        
        if(char.name == "Wolverine"){
            
            char.captureText = `"...this will cost you all at least one limb."`;
        }
        
        if(char.name == "Okoye"){
            
            char.captureText = `"I did my duty. Whatever happens after that is beyond me."`;
        }
        
        if(char.name == "Punisher"){
            
            char.captureText = `"Fuck all of you."`;
        }
        
        if(char.name == "Ghostrider"){
            
            char.captureText = `"I'm GHOSTRIDER. STILL."`;
        }
        
        if(char.name == "Psylocke"){
            
            char.captureText = `"I can sense your ambivalence. You are right to question yourself."`;
        }
    }
}