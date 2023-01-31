import {GoToPassage,AppendToDivOnce,AddAllusionWordToSource} from "./passageFX.js";
import {PoemTextContainsWord,PoemLength} from "./../poemEvaluation/poemFXConditions.js";

export function InitializeWorldPassages(){
    const $passageHandler = window.gameHandler.passageHandler;

    const hotApartment = $passageHandler.AddPassage("hotApartment");

    hotApartment.SetText(`
        You smell sweat and sweet as you wake in a cozy place<br>
        -- one familiar for all the Poietai like yourself.<br><br>

        You get up from your little roll up mattress while trying not to wake your slumbering peers.<br><br>

        Yselda walks in with a smile and hands you a mug.<br>
        She waits patiently while you finishing sipping it,<br>
        admiring the birds out the window.<br><br>

        "You've gotten your winks and your water. Now pay me, itinerant one."<br><br>

        <span id='navigationOutputPlayerPoemSpeak'></span>

        <span id='yseldaResponse'></span>
        <span id='courtyardButton'></span>
        <p><i>Click the \\/ at the top of the screen to bring down the poem creation menu. When you're happy with what you've got, click Recite to share your poem with Yselda.</i></p>

    `);

    const hotApartmentSrc = hotApartment.AddSource("hotApartment");

    hotApartmentSrc.SetAllusionWords([
        {text:"sweet",frequency:2.5},
        {text:"sweat",frequency:2.5},
        {text:"winks",frequency:2.5},
        {text:"sipping",frequency:2.5},
        {text:"old",frequency:3},
        {text:"silver",frequency:3},
    ]);
    
    hotApartment.passageFxHandler.AddCharacterResponse("yselda",
        `"Oh yes, I know you see me and think 'ancient'. Now '{{keywords}}'. 'Chronowasted', some have even said!"<br><br>"I've heard it all, Clichéd Poietai. Maybe take it a different direction next time? Heh heh heh."`, ["silver","old","grayed"])
        .conditionHandler.AddConditionGroup("or")
        .AddCondition(PoemTextContainsWord,"silver")
        .AddCondition(PoemTextContainsWord,"old")
        .AddCondition(PoemTextContainsWord,"grayed");
    
    hotApartment.passageFxHandler.AddCharacterResponse("yselda",
        `"'Keys'{{last| you mentioned as well}}, yes, 'keys'...Wait a second, where are my keys? Oh my oh my...." Yselda scooters away.`
    )
        .conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemTextContainsWord,"keys");
    
    hotApartment.passageFxHandler.AddCharacterDefaultResponse("yselda",
    `"I shall consider this, clever Poietai. Thank you for sharing with me."`);
    
    hotApartment.passageFxHandler.AddPassageFx(AppendToDivOnce,"courtyardButton",`[[Courtyard|hotApartmentCourtyard]]`);
    
    const hotApartmentCourtyard = $passageHandler.AddPassage("hotApartmentCourtyard");

    hotApartmentCourtyard.SetText(`
        You step into the courtyard of Yselda's inn. Bowed barrowwillow trees arc over the intricate brickwork of the courtyard's floor.<br>
        Small spindly tables wobble under the burdens that they unfalteringly bear.<br>
        A person, resplendent in rolls of fat, bushy beard hairs, and twinkling eye makeup gestures you over.<br><br>
        "Regale me, Poietai, and I shall tell you something in return."<br><br>
        `);
    const hotApartmentCourtyardSrc = hotApartmentCourtyard.AddSource("hotApartmentCourtyard");
    
    hotApartmentCourtyardSrc.SetAllusionWords([
        {text:"barrowwillows",frequency:3},
        {text:"wobbling",frequency:3},
        {text:"burden",frequency:3},
        {text:"glittering",frequency:3},
        {text:"bricks",frequency:3},
        {text:"roll",frequency:3},
    ]);
    
    hotApartmentCourtyard.passageFxHandler.AddCharacterResponse("berin",
        `
        "I love the barrowwillows here - they are probably hundreds of years old, brought over from Xosa before the cataclysm. Barrowwillow berries are poisonous of course, but if you make a tea of the stems you can see sights that are beyond description."
                                                               `,[])
        .conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemTextContainsWord,"barrowwillows");
    
    hotApartmentCourtyard.passageFxHandler.AddCharacterResponse("berin",
        `
        "A poem about BERIN themself! There is no end to what one could say about Berin. The trick is to believe in yourself -- then you too can be an endless font. Perhaps you will get there some day -- BAHAHAHAHAHA -- I know you will! I look forward to it."
                                                               `,[])
        .conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemTextContainsWord,"BERIN");
    
    hotApartmentCourtyard.passageFxHandler.AddCharacterResponse("berin",
        `
        "Brevity you've brought me {{last|as well}} I see, then I shall supply the wit -- BRAHAHAHAHOOHA!"<br><br>

        They take a sip of their tea. "This story begins about twelve years ago when I was living with my friend Brick. We were impetuous fools, in love and in debt, when we hatched a scheme to achieve renown and fame....."<br><br>

        You try to pay attention but are constantly distracted by the mesmerizing jiggles and jangles of their bangle-adorned body and the blinding flashes of light from their shining teeth. You have no idea how much time has passed.<br><br>

        "...which of course brought us to our ruin, but also closer together. I tell you, I will never provoke a Time Koala again."

        
                                                               `,[])
        .conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemLength,"lessThanOrEqualTo",3);
    
    hotApartmentCourtyard.passageFxHandler.AddCharacterDefaultResponse("berin",
        `
        "Lovely, Poietai, just lovely. For that I shall share my name: BERIN!! Didn't you know? For one great as me, merely uttering my name IS poetry -- BAHAHAHAHA! Good fun, good fun."
                                                                      `);
    
    hotApartmentCourtyard.passageFxHandler.AddPassageFx(AddAllusionWordToSource,{text:"BERIN",frequency:3.25},hotApartmentCourtyardSrc)
        .conditionHandler.AddConditionGroup("not")
        .AddCondition(PoemLength,"lessThanOrEqualTo",3)
        .AddCondition(PoemTextContainsWord,"BERIN")
        .AddCondition(PoemTextContainsWord,"barrowwillows");

}