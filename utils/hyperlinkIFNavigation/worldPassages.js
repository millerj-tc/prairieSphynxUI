import {GoToPassage,AppendToDivOnce,AddAllusionWordToSource,PermanentlyUnlockPassageSpan} from "./passageFX.js";
import {PoemTextContainsWord,PoemLength} from "./../poemEvaluation/poemFXConditions.js";

export function InitializeWorldPassages(){
    
    const playerName = window.gameHandler.playerName;
    
    const $passageHandler = window.gameHandler.passageHandler;
    
    const $characterHandler = window.gameHandler.characterHandler;
    
    /// HOT APARTMENT

    const hotApartment = $passageHandler.AddPassage("hotApartment");
    
    const $yselda = $characterHandler.AddCharacter("yselda","Yselda","she");
    $yselda.AddToPassagePresence("hotApartment");
    $yselda.AddPoemEvalMetric(5,PoemLength,"<=",15);
    $yselda.AddPoemEvalMetric(5,PoemLength,"<=",12);
    $yselda.AddPoemEvalMetric(5,PoemLength,"<=",10);
    $yselda.AddPoemEvalMetric(5,PoemLength,"<=",8);
    $yselda.AddPoemEvalMetric(3,PoemTextContainsWord,"—");
    $yselda.AddPoemEvalMetric(2,PoemTextContainsWord,".");
    $yselda.AddPoemEvalMetric(2,PoemTextContainsWord,",");
    $yselda.AddPoemEvalMetric(10,PoemTextContainsWord,"stones");
    $yselda.AddPoemEvalMetric(5,PoemTextContainsWord,"BERIN");
    $yselda.AddPoemEvalMetric(10,PoemTextContainsWord,"dirt");
    $yselda.AddPoemEvalMetric(15,PoemTextContainsWord,"tender");
    $yselda.AddPoemEvalMetric(5,PoemTextContainsWord,"glittering");
    $yselda.AddPoemEvalMetric(5,PoemTextContainsWord,"sweet");
    $yselda.AddPoemEvalMetric(10,PoemTextContainsWord,"wafting");
    $yselda.AddPoemEvalMetric(10,PoemTextContainsWord,"The Spires");
    $yselda.AddPoemEvalMetric(10,PoemTextContainsWord,"mystery");
    $yselda.AddPoemEvalMetric(5,PoemTextContainsWord,"winks");
    $yselda.AddPoemEvalMetric(15,PoemTextContainsWord,"kindness");
    $yselda.AddPoemEvalMetric(15,PoemTextContainsWord,"barrowwillows");
    $yselda.AddPoemEvalMetric(-15,PoemTextContainsWord,"silver");
    $yselda.AddPoemEvalMetric(-15,PoemTextContainsWord,"old");
    $yselda.AddPoemEvalMetric(-15,PoemTextContainsWord,"grayed");
    $yselda.AddPoemEvalMetric(-100,PoemLength,"<=",4);

    hotApartment.SetText(`
        You smell sweat and sweet as you wake in a cozy place<br>
        -- one familiar for all the Poietai like yourself.<br><br>

        <span id='navigationOutputPlayerPoemSpeak'></span><span id='yseldaResponse'>You get up from your little roll up mattress while trying not to wake your slumbering peers.<br><br>

        Yselda walks in with a smile and hands you a mug.<br>
        She waits patiently while you finishing sipping it,<br>
        admiring the birds out the window.<br><br>

        "You've gotten your winks and your water. Now pay me, itinerant one."</span>

        <span id='courtyardButton'></span>
        <p><i>Click the ▼ at the top of the screen to bring down the poem creation menu. When you're happy with what you've got, click Recite to share your poem with Yselda.</i></p><br><br>

        <span id='yseldaFavoriteLink'></span>

    `);

    const hotApartmentSrc = hotApartment.AddSource("hotApartment");

    hotApartmentSrc.SetAllusionWords([
        {text:"sweet",frequency:1.2,domeFrequency: 0.75},
        {text:"sweat",frequency:1.2,domeFrequency: 0.75},
        {text:"winks",frequency:1.2,domeFrequency: 0.6},
        {text:"sipping",frequency:1.2,domeFrequency: 0.4},
        {text:"old",frequency:1.5,domeFrequency: 0.85},
        {text:"silver",frequency:1.5,domeFrequency: 0.70},
    ]);
    
    const $pfxYseldaOldRespo = hotApartment.passageFxHandler.AddCharacterResponse("yselda",
        `"Oh yes, I know you see me and think 'ancient'. Now '{{keywords}}'. 'Chronowasted', some have even said!"<br><br>"I've heard it all, Clichéd ${playerName}. Maybe take it a different direction next time? Heh heh heh."`, ["silver","old","grayed"]);
    
    $pfxYseldaOldRespo.conditionHandler.AddConditionGroup("or")
        .AddCondition(PoemTextContainsWord,"poemCreator","silver")
        .AddCondition(PoemTextContainsWord,"poemCreator","old")
        .AddCondition(PoemTextContainsWord,"poemCreator","grayed");
    
    $pfxYseldaOldRespo.SetActionLoggerString("yseldaOldResponse");
    
    const $pfxYseldaBerinRespo = hotApartment.passageFxHandler.AddCharacterResponse("yselda",
        `"{{middle|And }} Berin got ahold of you, eh? One of my all time favorites and now they've inspired you too. It's wonderful to connect with people, isn't it?"`
    )
    
    $pfxYseldaBerinRespo.conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemTextContainsWord,"poemCreator","BERIN");
    
    $pfxYseldaBerinRespo.SetActionLoggerString("yseldaBerinResponse");
    
    const $pfxYseldaKeysRespo = hotApartment.passageFxHandler.AddCharacterResponse("yselda",
        `"'Keys'{{last| you mentioned as well}}, yes, 'keys'...Wait a second, where are my keys? Oh my oh my...." Yselda scooters away.`
    );
    
    $pfxYseldaKeysRespo.conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemTextContainsWord,"poemCreator","keys");
    
    $pfxYseldaKeysRespo.SetActionLoggerString("yseldaKeysResponse");
    
    const $pfxYseldaDefaultRespo = hotApartment.passageFxHandler.AddCharacterDefaultResponse("yselda",
    `"I shall consider this, clever ${playerName}. Thank you for sharing with me."`);
    
    $pfxYseldaDefaultRespo.SetActionLoggerString("yseldaDefaultResponse");
    hotApartment.passageFxHandler.AddPassageFx(AppendToDivOnce,"courtyardButton",`[[Courtyard|hotApartmentCourtyard]]`);
    
    /// HOT APARTMENT COURTYARD
    
    const hotApartmentCourtyard = $passageHandler.AddPassage("hotApartmentCourtyard");
    
    const $berin = $characterHandler.AddCharacter("berin","Berin","they");
    $berin.AddToPassagePresence("hotApartmentCourtyard");
    $berin.AddPoemEvalMetric(-100,PoemLength,"<=",6);
    $berin.AddPoemEvalMetric(-15,PoemTextContainsWord,"burden");
    $berin.AddPoemEvalMetric(5,PoemLength,">=",8);
    $berin.AddPoemEvalMetric(5,PoemLength,">=",10);
    $berin.AddPoemEvalMetric(5,PoemLength,">=",12);
    $berin.AddPoemEvalMetric(5,PoemLength,">=",14);
    $berin.AddPoemEvalMetric(10,PoemLength,">=",16);
    $berin.AddPoemEvalMetric(10,PoemLength,">=",18);
    $berin.AddPoemEvalMetric(10,PoemLength,">=",20);
    $berin.AddPoemEvalMetric(8,PoemTextContainsWord,"pray");
    $berin.AddPoemEvalMetric(8,PoemTextContainsWord,"roll");
    $berin.AddPoemEvalMetric(8,PoemTextContainsWord,"wobbling");
    $berin.AddPoemEvalMetric(8,PoemTextContainsWord,"vigor");
    $berin.AddPoemEvalMetric(15,PoemTextContainsWord,"vim");
    $berin.AddPoemEvalMetric(4,PoemTextContainsWord,"teetering");
    $berin.AddPoemEvalMetric(8,PoemTextContainsWord,"glittering");
    $berin.AddPoemEvalMetric(10,PoemTextContainsWord,"grinning");
    $berin.AddPoemEvalMetric(10,PoemTextContainsWord,"licked");
    $berin.AddPoemEvalMetric(10,PoemTextContainsWord,"tender");
    $berin.AddPoemEvalMetric(10,PoemTextContainsWord,"ate");
    $berin.AddPoemEvalMetric(15,PoemTextContainsWord,"feet");
    $berin.AddPoemEvalMetric(30,PoemTextContainsWord,"BERIN");
    

    hotApartmentCourtyard.SetText(`
        You step into the courtyard of Yselda's inn. Bowed barrowwillow trees arc over the intricate brickwork of the courtyard's floor.<br>
        Small spindly tables wobble under the burdens that they unfalteringly bear.<br>
        Sitting at one of the tables is Berin. They are resplendent in rolls of fat, bushy beard hairs, and twinkling eye makeup and gesture you over.<br><br>

        <span id='navigationOutputPlayerPoemSpeak'></span><span id='berinResponse'>"Regale me, Poietai, and I shall tell you something in return."<br><br></span>

        [[Back inside|yseldasKitchens]]<br><br>
        [[Out into the world!|yseldaRoadToSpires]]<br><br>
        `);
    const hotApartmentCourtyardSrc = hotApartmentCourtyard.AddSource("hotApartmentCourtyard");
    
    hotApartmentCourtyardSrc.SetAllusionWords([
        {text:"barrowwillows",frequency:1.6,domeFrequency: 0.33},
        {text:"wobbling",frequency:1.6,domeFrequency: 0.4},
        {text:"burden",frequency:1.6,domeFrequency: 0.78},
        {text:"glittering",frequency:1.6,domeFrequency: 0.72},
        {text:"bricks",frequency:1.6,domeFrequency: 0.6},
        {text:"roll",frequency:1.6,domeFrequency: 0.68},
    ]);
    
    const $pfxBerinBarrowwillowResponse = hotApartmentCourtyard.passageFxHandler.AddCharacterResponse("berin",
        `
        "I love the barrowwillows here - they are probably hundreds of years old, brought over from Xosa before the cataclysm. Barrowwillow berries are poisonous of course, but if you make a tea of the stems you can see sights that are beyond description."
                                                               `,[]);
        const $barrowwillowsCon = $pfxBerinBarrowwillowResponse.conditionHandler.AddConditionGroup("and");
        $barrowwillowsCon.AddCondition(PoemTextContainsWord,"poemCreator","barrowwillows");
    
    $pfxBerinBarrowwillowResponse.SetActionLoggerString("berinBarrowwillowsResponse");
    
    const $pfxBerinBerinRespo = hotApartmentCourtyard.passageFxHandler.AddCharacterResponse("berin",
        `
        "A poem about BERIN themself! There is no end to what one could say about Berin. The trick is to believe in yourself -- then you too can be an endless font. Perhaps you will get there some day -- BAHAHAHAHAHA -- I know you will! I look forward to it."
                                                               `,[]);
    $pfxBerinBerinRespo.conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemTextContainsWord,"poemCreator","BERIN");
    
    $pfxBerinBerinRespo.SetActionLoggerString("berinBerinResponse");
    
    const $pfxBerinBriefResponse = hotApartmentCourtyard.passageFxHandler.AddCharacterResponse("berin",
        `
        "Brevity you've brought me {{last|as well}} I see, then I shall supply the wit -- BRAHAHAHAHOOHA!"<br><br>

        They take a sip of their tea. "This story begins about twelve years ago when I was living with my friend Brick. We were impetuous fools, in love and in debt, when we hatched a scheme to achieve renown and fame....."<br><br>

        You try to pay attention but are constantly distracted by the mesmerizing jiggles and jangles of their bangle-adorned body and the blinding flashes of light from their shining teeth. You have no idea how much time has passed.<br><br>

        "...which of course brought us to our ruin, but also closer together. I tell you, I will never provoke a Time Koala again."

        
                                                               `,[]);
    $pfxBerinBriefResponse.conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemLength,"poemCreator","<=",5);
    
    $pfxBerinBriefResponse.SetActionLoggerString("berinBriefResponse");
    
    const $pfxBerinDefaultRespo = hotApartmentCourtyard.passageFxHandler.AddCharacterDefaultResponse("berin",
        `
        "Lovely, Poietai, just lovely. For that I shall share a beautiful poem as well: BERIN!! Didn't you know? For one great as me, merely uttering my name IS poetry -- BAHAHAHAHA! Good fun, good fun."
                                                                      `);
    
    $pfxBerinDefaultRespo.SetActionLoggerString("berinDefaultResponse");
    
    hotApartmentCourtyard.passageFxHandler.AddPassageFx(AddAllusionWordToSource,{text:"BERIN",frequency:1.85,domeFrequency: 0.25},hotApartmentCourtyardSrc)
        .conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemLength,"poemCreator",">=",0)
    
    /// YSELDA'S KITCHENS
    
    const yseldasKitchens = $passageHandler.AddPassage("yseldasKitchens");

    yseldasKitchens.SetText(`
        Yselda is nowhere to be found inside, you can't even make it through her kitches without her guidance.<br>
        It's a maze of teetering piles of cookware and odd objects.<br>
        Pots and pans of belly-filling-loving-kindness simmer on the range, tended to by scores of dormouse assistants wearing tiny cook hats.<br>
        You admire their vim (perhaps even more their vigor!)<br>
        The smells wafting to your nose are pure enticement.<br>
        They are too busy to speak to you at the moment, however.<br><br>

        <span id='navigationOutputPlayerPoemSpeak'></span>

        [[Courtyard|hotApartmentCourtyard]]

    `);

    const yseldasKitchensSrc = yseldasKitchens.AddSource("yseldasKitchens");

    yseldasKitchensSrc.SetAllusionWords([
        {text:"vigor",frequency:1.4,domeFrequency: 0.5},
        {text:"simmer",frequency:1.4,domeFrequency: 0.4},
        {text:"cooks",frequency:1.4,domeFrequency: 0.6},
        {text:"teetering",frequency:1.4,domeFrequency: 0.4},
        {text:"wafting",frequency:1.4,domeFrequency: 0.42},
        {text:"kindness",frequency:1.4,domeFrequency: 0.75},
        {text:"vim",frequency:1.4,domeFrequency: 0.4},
    ]);
    
    /// THE ROAD TO THE SPIRES OF LIGHT
    
    const yseldaRoadToSpires = $passageHandler.AddPassage("yseldaRoadToSpires");

    yseldaRoadToSpires.SetText(`
        
        And now you see there is road and road and road,<br>
        unceasing — uncompromising — unknown.<br>
        Far and tucked away in the clouds you see the tall Spires,<br>
        and wonder at their lost wonder.<br>
        Most know that they use to shine with a light like a second moon.<br>
        This mystery and more await you.<br>
        All you have to do is take a step.<br><br>

        <span id='navigationOutputPlayerPoemSpeak'></span><span id='nodasolResponse'>But before you can...a familiar friend approaches. Tall and tall and grinning — Nodasol the Wanderer.<br><br>

        "Hail, Poietai."<br><br></span>

        [[Back to Yselda's courtyard|hotApartmentCourtyard]]<br><br>

    `);

    const yseldaRoadToSpiresSrc = yseldaRoadToSpires.AddSource("yseldaRoadToSpires");

    yseldaRoadToSpiresSrc.SetAllusionWords([
        {text:"road",frequency:1.2,domeFrequency: 0.7},
        {text:"uncompromising",frequency:1,domeFrequency: 0.35},
        {text:"the Spires",frequency:1,domeFrequency: 0.3},
        {text:"uncompromising",frequency:0.9,domeFrequency: 0.35},
        {text:"wonder",frequency:1.2,domeFrequency: 0.55},
        {text:"mystery",frequency:1.1,domeFrequency: 0.55},
        {text:"approach",frequency:1.2,domeFrequency: 0.55},
        {text:"grinning",frequency:1.2,domeFrequency: 0.55},
        {text:"hail",frequency:1.2,domeFrequency: 0.55},
    ]);
    
    const $pfxNodasol68Respo = yseldaRoadToSpires.passageFxHandler.AddCharacterResponse("nodasol",
        `"This is so close to greatness. Hmmm." He ponders. "Can't say exactly what it is, just ever so slightly off."`);
    
    $pfxNodasol68Respo.conditionHandler.AddConditionGroup("or")
        .AddCondition(PoemLength,"poemCreator","==",6)
        .AddCondition(PoemLength,"poemCreator","==",8);
    
    $pfxNodasol68Respo.SetActionLoggerString("nodasol68Respo");
    
    const $pfxNodasol7Respo = yseldaRoadToSpires.passageFxHandler.AddCharacterResponse("nodasol",
        `"Music to my ears..."`);
    
    $pfxNodasol7Respo.conditionHandler.AddConditionGroup("or")
        .AddCondition(PoemLength,"poemCreator","==",7)
    
    $pfxNodasol7Respo.SetActionLoggerString("nodasol7Respo");
    
    const $pfxNodasolBerinRespo = yseldaRoadToSpires.passageFxHandler.AddCharacterResponse("nodasol",
        `"Aha, so old Berin is at Yselda's, eh? I saw our friend Brick recently, I shall have to pass on his regards."`);
    
    $pfxNodasolBerinRespo.conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemTextContainsWord,"poemCreator","berin");
    
    $pfxNodasolBerinRespo.SetActionLoggerString("nodasolBerinRespo");
    
    const $pfxNodasolBarrowwillowsRespo = yseldaRoadToSpires.passageFxHandler.AddCharacterResponse("nodasol",
        `At the mention of barrowwillows, Nodasol's grin fades for a moment before he fastens it back on to his cheeks. "Yes, they're... pretty, aren't they?"`);
    
    $pfxNodasolBarrowwillowsRespo.conditionHandler.AddConditionGroup("and")
        .AddCondition(PoemTextContainsWord,"poemCreator","barrowwillows");
    
    $pfxNodasolBarrowwillowsRespo.SetActionLoggerString("nodasolBarrowwillowsRespo");
    
    const $pfxNodasolFoodRespo = yseldaRoadToSpires.passageFxHandler.AddCharacterResponse("nodasol",
        `"Goodness gracious, I'm so hungry! I'm sure Yselsa's dormice are cooking something delightfilling."`);
    
    const $nodasolsolFoodRespoCond = $pfxNodasolFoodRespo.conditionHandler.AddConditionGroup("or")
        .AddCondition(PoemTextContainsWord,"poemCreator","cooks")
        .AddCondition(PoemTextContainsWord,"poemCreator","simmer")
        .AddCondition(PoemTextContainsWord,"poemCreator","licked")
        .AddCondition(PoemTextContainsWord,"poemCreator","ate")
        .AddCondition(PoemTextContainsWord,"poemCreator","sweet");
    
    const $addDelightfilling = yseldaRoadToSpires.passageFxHandler.AddPassageFx(AddAllusionWordToSource,{text:"delightfilling",frequency:1.25,domeFrequency: 0.35},yseldaRoadToSpiresSrc);
    
    $addDelightfilling.conditionHandler.AddConditionGroupByObjReference($nodasolsolFoodRespoCond);
    
    $pfxNodasolFoodRespo.SetActionLoggerString("nodasolFoodRespo");
    
    const $pfxNodasolDefaultRespo = yseldaRoadToSpires.passageFxHandler.AddCharacterDefaultResponse("nodasol",
        `
        "You know what, ${playerName} — you never cease to make me smile or wonder at life.<br> That's a good thing!"
                                                                      `);
    
    $pfxNodasolDefaultRespo.SetActionLoggerString("nodasolDefaultResponse");

    const $nodasol = $characterHandler.AddCharacter("nodasol","Nodasol","he");
    $nodasol.AddToPassagePresence("yseldaRoadToSpires");
    $nodasol.AddPoemEvalMetric(-100,PoemLength,"<=",2);
    $nodasol.AddPoemEvalMetric(5,PoemLength,"<=",6);
    $nodasol.AddPoemEvalMetric(20,PoemLength,"==",7);
    $nodasol.AddPoemEvalMetric(5,PoemLength,">=",8);
    $nodasol.AddPoemEvalMetric(-15,PoemTextContainsWord,"uncompromising");
    $nodasol.AddPoemEvalMetric(8,PoemTextContainsWord,"wafting");
    $nodasol.AddPoemEvalMetric(8,PoemTextContainsWord,"vim");
    $nodasol.AddPoemEvalMetric(5,PoemTextContainsWord,"barrowwillows");
    $nodasol.AddPoemEvalMetric(5,PoemTextContainsWord,"bricks");
    $nodasol.AddPoemEvalMetric(5,PoemTextContainsWord,"silver");
    $nodasol.AddPoemEvalMetric(5,PoemTextContainsWord,"winks");
    $nodasol.AddPoemEvalMetric(5,PoemTextContainsWord,"little");
    $nodasol.AddPoemEvalMetric(5,PoemTextContainsWord,"note");
    $nodasol.AddPoemEvalMetric(5,PoemTextContainsWord,"sighs");
    $nodasol.AddPoemEvalMetric(5,PoemTextContainsWord,"shard");
    $nodasol.AddPoemEvalMetric(8,PoemTextContainsWord,"shard");
    $nodasol.AddPoemEvalMetric(8,PoemTextContainsWord,"wonder");
    $nodasol.AddPoemEvalMetric(8,PoemTextContainsWord,"grinning");
    $nodasol.AddPoemEvalMetric(10,PoemTextContainsWord,"hail");
}