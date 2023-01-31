import {gridDOMHandler} from "./gridDOMHandler.js";

export class uiHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        //this.availableChars = this.gameHandler.database.data;
        
        this.cardZoneTable;
        
        this.rosterViewLocked = false;
        
        this.storedOutputDivs = [];
        
    }
    
    AddGrid(classes = []){
        
       const $gdh = new gridDOMHandler(this);
        
        return $gdh
    }
    
    ResizeOnResize(){
        
        //document.getElementById("content").style.top = "-750px";
        
        if(window.innerWidth < 1150){
    
            document.getElementById("output").style.position = "static";
            document.getElementById("output").style.maxHeight = "";
            document.getElementById("output").style.overflowY = "";
            
            document.getElementById("output").style.fontSize = "calc(12px + 1.5vw)"
            
        }
        else{
            
            document.getElementById("output").style.maxHeight = "90vh"
            document.getElementById("output").style.fontSize = "1.4vw"
            document.getElementById("output").style.position = "fixed"
            document.getElementById("output").style.left = "785px"
            document.getElementById("output").style.textAlign = "left"
            document.getElementById("output").style.padding = "20px"
            document.getElementById("content").style.maxWidth = "75vw";
            document.getElementById("output").style.overflowY = "auto";
        }
    }
    
    _CreateCollapseButton(){
        
        const $collapseButton = document.createElement("button");
        $collapseButton.id = "rosterCollapseButton";
        $collapseButton.style.fontSize = "32pt";
        $collapseButton.style.float = "right";
        $collapseButton.setAttribute("data-collapsed","true");
        
        $collapseButton.onclick = function(){
       
            if($collapseButton.getAttribute("data-collapsed") == "true"){
            
                window.gameHandler.uiHandler.ExpandRosterDisplay();    

            }
            else{
                
                window.gameHandler.uiHandler.CollapseRosterDisplay();
            }

        };
        
        $collapseButton.innerHTML = ">";
        
        document.getElementById("content").append($collapseButton);
    }
    
    CreateLockButton(){
        
        const $lockButton = document.createElement("button");
        $lockButton.id = "rosterLockButton";
        $lockButton.style.fontSize = "15pt";
        $lockButton.style.marginTop = "15px";
        $lockButton.style.float = "right";
        $lockButton.setAttribute("data-locked","false");
        
        $lockButton.onclick = function(){
       
            if(window.gameHandler.uiHandler.rosterViewLocked){
            
                window.gameHandler.uiHandler.rosterViewLocked = false;
                $lockButton.innerHTML = "🔓";    

            }
            else{
                
                window.gameHandler.uiHandler.rosterViewLocked = true;
                $lockButton.innerHTML = "🔒"
            }

        };
        
        if(!this.rosterViewLocked) $lockButton.innerHTML = "🔓";
        if(this.rosterViewLocked) $lockButton.innerHTML = "🔒";
        
        document.getElementById("content").append($lockButton);
    }
    
    CollapseRosterDisplay(){
        
        const $collapseButton = document.getElementById("rosterCollapseButton");
        
        $collapseButton.setAttribute("data-collapsed","true");
        document.getElementById("content").style.transform = "translateX(0px)";
        document.getElementById("output").style.transform = "translateX(0px)";
        document.getElementById("output").style.marginRight = "150px";
        $collapseButton.innerHTML = ">";
    }
    
    ExpandRosterDisplay(){
        
        const $collapseButton = document.getElementById("rosterCollapseButton");
        
        const $rosterWidth = document.getElementById("content").clientWidth;
        
        document.getElementById("content").style.transform = "translateX(" + ($rosterWidth - 25) + "px)";
        document.getElementById("output").style.transform = "translateX(" + ($rosterWidth - 25) + "px)";
        document.getElementById("output").style.marginRight = "500px";
        $collapseButton.setAttribute("data-collapsed","false");
        $collapseButton.innerHTML = "<";
    }
    
    CreateEvalGoButton(){
        
        const $evalButton = document.createElement("button");
        $evalButton.style = "font-size:32pt"
        $evalButton.onclick = function(){
            
            setTimeout(function(){
                
                const $collapseButton = document.getElementById("rosterCollapseButton");
                                
                if($collapseButton.getAttribute("data-collapsed") == "false" && !window.gameHandler.uiHandler.rosterViewLocked){
            
                    window.gameHandler.uiHandler.CollapseRosterDisplay();
                }
                        
                window.gameHandler.ResetGameOnSimulationRun();
                
                if(window.gameHandler.scenarioHandler.currentScenario != undefined);{
                
                    window.gameHandler.scenarioHandler.currentScenario.ScenarioRun();

                    if(window.gameHandler.scenarioHandler.currentScenario.previousScenario != null) document.getElementById("output").querySelector(".outputDiv" + window.gameHandler.scenarioHandler.currentScenario.previousScenario.id).scrollIntoView(true);
                }
            },350);
            
        };
        $evalButton.innerHTML = "See results!";
        
        document.getElementById("content").append($evalButton);
    }
    
    CreateStageContinueButton(scenarioId){
        
        const $stageContinueButton = document.createElement("button");
        $stageContinueButton.classList.add("stageContinueButton");
        $stageContinueButton.innerHTML = "continue";
        
        document.getElementById("outputDiv" + scenarioId).append($stageContinueButton);
        
        return $stageContinueButton
    }
    
    CreateScenarioRewindButton(){
        
        const $rewindButton = document.createElement("button");
        $rewindButton.style = "font-size:32pt"
        $rewindButton.onclick = function(){
            
            setTimeout(function(){
                
                const $scenHandler = window.gameHandler.scenarioHandler;
                
                if($scenHandler.currentScenario.previousScenario != null){
                    
                    $scenHandler.currentScenario.ClearThisScenarioOutput();
                    
                    $scenHandler.GotoScenario($scenHandler.currentScenario.previousScenario);
                }
                else{
                    
                    $scenHandler.currentScenario.ClearThisScenarioOutput();
                    
                    $scenHandler.currentScenario.ScenarioPrep();
                }
            },350);
            
        };
        $rewindButton.innerHTML = "<<";
        
        document.getElementById("content").append($rewindButton);
    }
    
    CreateCardZoneTable(){
        
        const $SH = this.gameHandler.scenarioHandler.currentScenario;
        
        document.getElementById("content").innerHTML = "";
        
        this.cardZoneTable = document.createElement("div");
        this.cardZoneTable.style = `display: grid;
            justify-items: center;
            align-items: center;
            gap: 5px;
            padding: 5px;`;
        
        this.cardZoneTable.classList.add("rosterBackground");
        
        let $gridTemplateColumns = "auto";
        
        if($SH.usesCardZoneAssignment) $gridTemplateColumns += " auto";
        if(!$SH.playingNoninteractiveStages) $gridTemplateColumns += " auto";
        
           
        this.cardZoneTable.style.gridTemplateColumns = $gridTemplateColumns
        
        document.getElementById("content").append(this.cardZoneTable);
        
        const $col0Head = document.createElement("div");
        let $span = document.createElement("span");
        $span.style.color = "blue";
        $span.style.fontWeight = "bold";
        $span.style.fontSize = "24pt";
        $span.innerHTML = "Left Team";
        $col0Head.append($span);
        this.cardZoneTable.append($col0Head);
        
        
        if(this.gameHandler.scenarioHandler.currentScenario.usesCardZoneAssignment){
            const $col1Head = document.createElement("div");
            let $mspan = document.createElement("span");
            $mspan.style.fontWeight = "bold";
            $mspan.style.fontSize = "24pt";
            $mspan.innerHTML = "CardZones";
            $col1Head.append($mspan);
            this.cardZoneTable.append($col1Head);
        }
        
        if(!$SH.playingNoninteractiveStages){
            const $col2Head = document.createElement("div");
            let $rspan = document.createElement("span");
            $rspan.style.color = "red";
            $rspan.style.fontWeight = "bold";
            $rspan.style.fontSize = "24pt";
            $rspan.innerHTML = "Right Team";
            $col2Head.append($rspan);
            this.cardZoneTable.append($col2Head);
            
        }
    }
    
    UpdateCharImage(slot){
        
        
        const $character = this.gameHandler.database.GetObjFromString(document.getElementById(slot.selectId).value);
        
        //slot.UpdateChar($character);
        
        document.getElementById(slot.imageSpanId).innerHTML = `<img src="` + slot.character.imageM + `">`;
        
    }
    
    ClearOutput(){
        
        document.getElementById("output").innerHTML = "";
    }
    
    UpdateOutput(string){
        
        document.getElementById("output").innerHTML += string;
        
        // [[[smim/keh,itaru]]] Keh and Itaru don't trust Smim. <-- indicate groupings of images with /. Create some code to handle 1-4 images per group (nice little grid, etc.)
    }
    
    NewStageOutputDiv(string){
        
        const $div = document.createElement("div");
        
        $div.classList.add("outputDiv" + this.gameHandler.scenarioHandler.currentScenario.id);
        
        $div.style.marginBottom = "20px";
        
        $div.innerHTML = string;
        
        document.getElementById("output").append($div);
        
        if($div.querySelector("img") != undefined) {
            
            // -- HELPFUL TIP: this wasn't working correctly because it wasn't waiting for the image to load in
            // before the fix, it was sometimes returning the image height as 0 bc it hadn't loaded yet.
            
            $div.querySelector("img").onload = function() {
                $div.style.minHeight = $div.querySelector("img").height + "px";
            };
        }
        
        return $div
    }
    
    CreateCardZoneRows(){
        
        console.log("begin cz rows");
        
        for(const cz of this.gameHandler.scenarioHandler.currentScenario.cardZoneHandler.cardZones){
            
            console.log("cz " + cz.id);
            console.log(cz);
            console.error("must load in cardslots into cardzone on init since that isn't automatic anymore. Set grid layout in scenario -- assign each grid space to different elements.");
            
            cz.cardSlots = [];
        
            let col0 = document.createElement("div");
            col0.style.display = "flex";
            col0.style.alignItems = "center";
            col0.style.backgroundColor = cz.bgColor;

            let col1 = document.createElement("div");
            col1.style.backgroundColor = cz.bgColor;

            let col2 = document.createElement("div");
            col2.style.display = "flex";
            col2.style.alignItems = "center";
            col2.style.backgroundColor = cz.bgColor;


            this.cardZoneTable.append(col0);
            if(this.gameHandler.scenarioHandler.currentScenario.usesCardZoneAssignment) this.cardZoneTable.append(col1);
            if(!this.gameHandler.scenarioHandler.currentScenario.playingNoninteractiveStages) this.cardZoneTable.append(col2);

            const col0Content = document.createElement("div");
            const col1Content = document.createElement("div");
            const col2Content = document.createElement("div");

            col0.append(col0Content);
            if(this.gameHandler.scenarioHandler.currentScenario.usesCardZoneAssignment) col1.append(col1Content);
            if(!this.gameHandler.scenarioHandler.currentScenario.playingNoninteractiveStages) col2.append(col2Content);
            

            for(let i = 0; i < cz.cardSlots.length; i++){
                
                console.log("Creating cz row");

                let $leftSlotDiv = document.createElement("div");
                $leftSlotDiv.id = this.SetDivId("left",cz.id,i);
                $leftSlotDiv.style = "min-height:125px;grid-column-start:1";

                col0Content.append($leftSlotDiv);

                let $rightSlotDiv = document.createElement("div");
                $rightSlotDiv.id = this.SetDivId("right",cz.id,i);
                $rightSlotDiv.style = "min-height:125px;grid-column-start:3;vertical-align:middle";
                col2Content.append($rightSlotDiv);

                let $leftSelector = document.createElement("select");
                $leftSelector.style = "position:relative;top:" + $leftSlotDiv.clientHeight/2 + "px;";
                $leftSelector.id = this.SetSelectorId("left",cz.id,i);

                const $leftImage = document.createElement("span");
                $leftImage.style = "float:right";
                $leftImage.id = `left`+ cz.id + `Char` + i + `Image`;
                $leftImage.width = 200;
                $leftImage.height = 200;

                let $leftSlot = cz.AddCharSlot("left",$leftSelector.id,$leftImage.id);

                $leftSlotDiv.append($leftSelector);
                $leftSlotDiv.append($leftImage);

                this.AddSelectorOptions($leftSelector,$leftSlot);

                $leftSelector.addEventListener("change", function() {

                    const $charObj = window.gameHandler.scenarioHandler.currentScenario.GetScenarioChar($leftSelector.value);
                    $leftSlot.UpdateChar($charObj);
                    window.gameHandler.choiceCount++;
                });

                let $rightSelector = document.createElement("select");
                $rightSelector.style = "position:relative;top:" + $rightSlotDiv.clientHeight/2 + "px;";
                $rightSelector.id = this.SetSelectorId("right",cz.id,i);

                const $rightImage = document.createElement("span");
                $rightImage.style = "float:left";
                $rightImage.id = `right`+ cz.id + `Char` + i + `Image`;
                $rightImage.width = 200;
                $rightImage.height = 200;

                let $rightSlot;

                if(!this.gameHandler.scenarioHandler.currentScenario.playingNoninteractiveStages) $rightSlot = cz.AddCharSlot("right",$rightSelector.id,$rightImage.id);

                $rightSlotDiv.append($rightImage);
                $rightSlotDiv.append($rightSelector);

                this.AddSelectorOptions($rightSelector,$rightSlot);


                //col2.append($rightSlot);

                $rightSelector.addEventListener("change", function() {

                    const $charObj = window.gameHandler.scenarioHandler.currentScenario.GetScenarioChar($rightSelector.value);
                    $rightSlot.UpdateChar($charObj);
                    window.gameHandler.choiceCount++;
                });


            }

            if(this.gameHandler.scenarioHandler.currentScenario.usesCardZoneAssignment){

                let $czCount = this.gameHandler.scenarioHandler.currentScenario.cardZoneHandler.cardZones.length;

                let $czImg = document.createElement("img");

                $czImg.src = cz.image;

                col1Content.append($czImg);
                col1Content.style = `justify-items: center;
                    align-items: center;
                    vertical-align:center;
                    text-align:center;
                    grid-column-start: 2;
                    grid-row-start: ` + Number(1 + $czCount) + `;
                    grid-row-end:` + Number($czCount + cz.charSlots) + `;`

            }
            
        }
        
    }
    
    SetRosterCollapsibleCoords(){
        
        const $collapsible = document.getElementById("content");
        
        const $collapsibleLeft = ((-1 * $collapsible.clientWidth) + 50);
        

        
        $collapsible.style.left = $collapsibleLeft + "px";
        
        const $output = document.getElementById("output");
        
        $output.style.left = $collapsibleLeft + $collapsible.clientWidth + 50 + "px";
    }
    
    SetDivId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `SlotDiv`
    }
    
    SetSelectorId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `Selector`
    }
    
    SetSelectorToChar(selector,char){
        
        
        if(selector == null) return
        
        if(char == null) return
        
        for(let i=0; i < selector.length; i++){
            
            
            if(selector.options[i].text == char.name){ 

                selector.selectedIndex = i;
            }
        }
    }
        
    AddSelectorOptions(selector,slot){
        
        const $availableChars = this.gameHandler.scenarioHandler.currentScenario.GetAllChars(slot.alignment);
        
        const $alphaSortedChars = $availableChars.sort(function(a, b) {
            let textA = a.data.name.toUpperCase();
            let textB = b.data.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
        for(const char of $alphaSortedChars){
            
            let $option = document.createElement("option");
            
            $option.text = char.data.name;
            
            selector.add($option);
        }
    }
}