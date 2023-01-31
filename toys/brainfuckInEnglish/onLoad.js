import {impCreator} from "./impCreator.js";
import {permutator} from "./permute.js";

export function OnLoad(){
    
    const inputs = `In 1998 New York City, quadriplegic forensics expert Lincoln Rhyme is bed-bound after an accident that left him completely paralyzed from the neck down. Amelia Donaghy, a newly recruited patrol officer, discovers a mutilated corpse buried at a Civil War-era railroad bed. Due to clue-like objects found at the crime scene, Rhyme concludes that the scene was staged and subsequently teams up with an initially hesitant Amelia, impressed by her natural forensic instincts.

The killer poses as a taxi driver and, before Rhyme and Amelia met, abducts married couple Alan and Lindsay Rubin. Alan is the body discovered by Amelia at the railroad station, while Lindsay is revealed to be alive and tied up at a steam junction. Using the clues found at the railroad bed, including a torn piece of scrap paper, Rhyme successfully tracks the whereabouts of Lindsay. The detectives and Amelia arrive too late and she is scalded to death by an open steam pipe. Amelia finds a piece of Lindsay's bone by her body and another scrap of paper. Rhyme instructs Amelia to sever Lindsay's hands, which are securely chained to the pipe, for evidence, but she refuses and storms off from the crime scene.

The killer abducts an NYU student, who is taken to a derelict slaughterhouse and tied to a pole. The killer surgically removes a piece of bone from the student, leaving an open wound that attracts nearby rats. Amelia and Rhyme, again using the clues left by the killer at the scene of the previous murder, find the victim's body which has been mutilated by rats. Amelia finds another scrap of paper and a piece of bone. The pressure of the tense investigation and bureaucratic challenges to Amelia and Rhyme's involvement in the case begin to have serious impacts on Rhyme's health and stability. Thelma, Rhyme's carer and nurse, reveals to Amelia that he intends to euthanize himself out of fear of seizures that could leave him in a vegetative state.

After piecing together the message the killer was sending using the scrap paper left at each scene, Amelia and Rhyme are led to an old crime novel called The Bone Collector, where it is revealed the killer is replicating the crimes from the fictional story. This leads them to the killer's next victims, a grandfather and granddaughter who have been tied to a pier during a rise in tide. The paramedics successfully resuscitate the young girl, but the grandfather is pronounced dead. At the scene, Amelia finds another piece of bone, part of an old police badge, and a subway map. These clues together with the asbestos left by the killer at the scene of Lindsay's death lead Amelia to an abandoned subway station, where she sees numbers on the side of a carriage that has been tampered with to spell out Rhyme's police badge number.

The killer arrives at Rhyme's house and kills both Thelma and Police Captain Howard Cheney. The killer is revealed to be Richard Thompson, the medical technician in charge of Rhyme's medical equipment. Richard's real name is Marcus Andrews, a former forensics expert, who was convicted after Rhyme wrote an article exposing him for planting evidence that resulted in the wrongful imprisonment of six innocent people, one of whom hanged himself. Believing that he was right to imprison those people, Marcus blames Rhyme for his imprisonment and the abuse he endured during his incarceration, and attempts to kill Rhyme out of revenge. Rhyme retaliates by crushing Marcus' hand in his medical bed, resulting in a struggle between the two that forces them both onto the floor. Unable to move, Rhyme is almost killed by Marcus until Amelia arrives and shoots Marcus dead.

The following Christmas, Rhyme, having abandoned his plans to commit suicide, meets his sister and niece coming to visit him along with Amelia and his other colleagues.`.split(" ");
    
    const devil = new impCreator();
    
    devil.AddInputCrit(function(){
            if(arguments[0].length == 1) return true
    });
    
    devil.AddInputCrit(function(){
            if(arguments[0].length == 2) return true
    });
    
    devil.AddInputCrit(function(){
            if(arguments[0].length == 3) return true
    });
    
    devil.AddInputCrit(function(){
            if(arguments[0].length == 4) return true
    });
    
    devil.AddInputCrit(function(){
            if(arguments[0].length == 5) return true
    });
    
    devil.AddInputCrit(function(){
            if(arguments[0].length == 6) return true
    });
    
    devil.AddInputCrit(function(){
            if(arguments[0].length == 7) return true
    });
    
    devil.AddInputCrit(function(){
            if(arguments[0].length == 8) return true
    });
    
    devil.CreateImps(20,34);
    
    devil.RunImpsWithInput(inputs);
    
}