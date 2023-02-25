import {ShuffleArray} from "/utils/mathAndLogicUtils/miscUtils.js";
import {UpdateCardSlotArtist,DisplayUnselectedCardsAsChoices} from "../scenarioPhases/uiPhaseUtils.js";
import {CollapseButtonOnClick} from "/utils/uiTools/artists/trayArtistTrayMovement.js";
import {RunPvPTournament} from "/projects/GAG101/scripts/pvp/pvpScenarioTournament.js";
import {SortWinscoreThenDate} from "/projects/GAG101/scripts/pvp/tournamentHandler.js";
import {OutputTextDivWithNounImages} from "../scenarioPhases/uiPhaseUtils.js";
import {charData} from "../../data/charData.js";

import { getDatabase, ref, child, get, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function GenericScenarioPrep(scenarioName,mode,contender0CardSlots,contender1CardSlots){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;
    
    gh.scenarioHandler.SetCurrentScenarioByName(scenarioName)

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    scenario.SetMode(mode);
    
    UnselectAllPlayerCards();
    
    gh.narrOutputArtist.ClearAllChildren();
    
    gh.cardChoiceTrayArtist.SetDOMDisplayTo("block");
    
    CreateNCardSlotsForContenderNumber(contender0CardSlots,0,2,1);
    
    CreateNCardSlotsForContenderNumber(contender1CardSlots,1,3,4);
    
    RandomizePlayerIdChoicesForContenderNum(gh.playerId,0);
    
    if(mode != "story") RandomizePlayerIdChoicesForContenderNum("AI",1);
    
    AttachOnClickCardChoiceToDOMsForContenderNum(0);
    
    if(mode != "story") AttachOnClickCardChoiceToDOMsForContenderNum(1);
    
    AddScenarioRunButton();
    
    if(mode == "pvp") {
        AddScenarioRunPvPButton();
        GetAndAnnouncePvPLeaderboard();
    }
    
    
}

export function UnselectAllPlayerCards(){
    
    const cardHandler = window.gameHandler.collectionCardHandler;
    
    const playerCards = cardHandler.GetCards(window.gameHandler.playerId);
    
    for(const card of playerCards){
        
        card.selectedForTeam = false;
    }
}

export function CreateNCardSlotsForContenderNumber(n,contenderNum,imgGridColumnStart,nameSlotGridColumnStart){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    for(let i = 0; i < n; i++){

        const dom = document.createElement("div");

        dom.id = "contender" + contenderNum + "CardSlot" + i;

        const artist = scenario.uiToolsHandler.AddDOMUIArtist(dom);

        artist.SetStylePropToValue("grid-column-start",imgGridColumnStart);
        artist.SetStylePropToValue("grid-row-start",(i+1).toString());

        const cardChoiceTrayArtist = window.gameHandler.uiToolsHandler.GetArtistsByAuthorizedDOMId("cardChoiceTrayGrid");

        cardChoiceTrayArtist.AppendElementWithinDOM(dom);
        
        // then create nameslot div
        
        const nameSlot = document.createElement("div");

        nameSlot.id = "contender" + contenderNum + "CardNameSlot" + i;

        nameSlot.classList.add("nameSlot");

        const subArtist = scenario.uiToolsHandler.AddDOMUIArtist(nameSlot);

        subArtist.SetStylePropToValue("grid-column-start",nameSlotGridColumnStart);

        subArtist.SetStylePropToValue("grid-row-start",dom.style.gridRowStart);

        //subArtist.SetDOMInnerTextTo(artist.associatedCard.name);

        cardChoiceTrayArtist.AppendElementWithinDOM(nameSlot);
        
        artist.nameSlotArtist = subArtist;
    }

}

export function RandomizePlayerIdChoicesForContenderNum(playerId,contenderNum){
        
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const contenderCards = cardHandler.GetCards().filter(c => (c.owner == playerId && c.unlockedForPlayer == true));
    
    const shuffledAvailableCards = ShuffleArray(contenderCards);

    const slotArtistsArr = scenario.uiToolsHandler.tools.filter(t => t.GetAuthorizedDOMs().id.includes("contender" + contenderNum + "CardSlot"));

    for(const artist of slotArtistsArr){

        const card = shuffledAvailableCards.shift();

        UpdateCardSlotArtist(artist,card);

        card.selectedForTeam = true;
    }
}


export function SetCardForContenderSlot(card,owner,contenderNum,slotNum){
    
    const gh = window.gameHandler;
        
    card.owner = owner; 

    const scenario = gh.scenarioHandler.GetCurrentScenario();
    
    const artist = scenario.uiToolsHandler.GetArtistsByAuthorizedDOMId("contender" + contenderNum + "CardSlot" + slotNum);

    UpdateCardSlotArtist(artist,card);
    
    card.selectedForTeam = true;
}

    
export function AttachOnClickCardChoiceToDOMsForContenderNum(num){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    for(const tool of scenario.uiToolsHandler.tools){

        const dom = tool.GetAuthorizedDOMs();

        if(dom.id.includes("contender" + num + "CardSlot")){

            dom.onclick = function(){
                
                if(gh.cardChoiceGridArtist.GetStyleProp("display") == "grid") return //otherwise you can "click through" the dimmer layer and mess up the lastClickedCardSlotArtist part and it gets ALLL fucked up

                
                DisplayUnselectedCardsAsChoices(tool.associatedCard.owner); //UpdateCardSlotArtist sets "associatedCard"


                scenario.lastClickedCardSlotArtist = tool;
                            }
        }
    }  
}
    
export function AddScenarioRunButton(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    const but = document.createElement("button");
    
    scenario.uiToolsHandler.AddDOMUIArtist(but);

    but.innerText = "Run scenario";

    but.onclick = function(){

        scenario.QueueProcess();
        
        scenario.ProcessNextInQueue();
        
        CollapseButtonOnClick(gh.cardChoiceTrayArtist);

    }

    gh.cardChoiceTrayArtist.AppendElementWithinDOM(but);
    

}

export function AddScenarioRunPvPButton(){
    
    const gh = window.gameHandler;

    const cardHandler = gh.collectionCardHandler;

    const scenario = gh.scenarioHandler.GetCurrentScenario();
        
    const but = document.createElement("button");
    
    scenario.uiToolsHandler.AddDOMUIArtist(but);

    but.innerText = "Submit Team to PvP Tournament";

    but.onclick = function(){

        RunPvPTournament();
        
        CollapseButtonOnClick(gh.cardChoiceTrayArtist);

    }

    gh.cardChoiceTrayArtist.AppendElementWithinDOM(but);
    

}

export function GetAndAnnouncePvPLeaderboard(){

    const returnArr = [];
    
    const db = getDatabase();
    const dbRef = ref(db);
    
    get(child(dbRef, 'GAG101Scenarios/' + window.gameHandler.scenarioHandler.GetCurrentScenario().scenarioName + '/submissions')).then((snapshot) => {
      if (snapshot.exists()) {

     const data = snapshot.val();

        if(data == ""){

            return

        }

        const returnArr = [];
        
        for(const userSubmission in data){
            
            const userSubmissionObj = data[userSubmission];
            
            const submissionTeamArr = [];
            
            for(const member in userSubmissionObj.team){
                
                const memberObj = userSubmissionObj.team[member];
                
                submissionTeamArr.push(memberObj.card);
            }
            
            returnArr.push({teamAsJSONArr:submissionTeamArr, username:userSubmissionObj["submittingUser"],timestamp: userSubmissionObj["submissionTimestamp"],ws:userSubmissionObj["winscore"]});
                  
        }

        _AnnouncePvPLeaderboard(returnArr);    


      } else {
        console.log("No data available");
      }
    }).catch((error) => {
        
        window.gameHandler.loginWrapperArtist.SetDOMDisplayTo("block");
        
      console.error(error);
    });

}

function _AnnouncePvPLeaderboard(leaderboardJSONArr){
    
    const orderedArr = leaderboardJSONArr.sort(SortWinscoreThenDate);
    
    const scenario = window.gameHandler.scenarioHandler.GetCurrentScenario();
    
    const noArtist = window.gameHandler.narrOutputArtist;
    
    OutputTextDivWithNounImages(`${scenario.scenarioName} Leaderboard`);
    
    noArtist.InsertHTMLAdjacentToDOM("beforeend", "<br><br>");
    
    for(let leaderInd = 0; leaderInd < orderedArr.length; leaderInd++){
        
        const leader = orderedArr[leaderInd];
        
        const genericCardArr = [];
        
        for(const cardJSON of leader.teamAsJSONArr){
            
            const card = JSON.parse(cardJSON);

            for(const char of charData){

                if(card.name == char.name){
                    
                    genericCardArr.push(char);
                       
                }
            }
        }
        
        const subDate = new Date(leader.timestamp);
        
        OutputTextDivWithNounImages(`${leaderInd + 1}. ${leader.username}: [arg0[]] (${subDate.toDateString()})`,genericCardArr);
        
        window.gameHandler.narrOutputArtist.InsertHTMLAdjacentToDOM("beforeend", "<br><br>");
        
        
    }
    
    OutputTextDivWithNounImages("You may only submit once per day for each adventure.");
    
    noArtist.InsertHTMLAdjacentToDOM("beforeend","<br><br>");
    
}