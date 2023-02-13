import {uiToolsHandler} from "/utils/uiTools/uiToolsHandler.js";


export function Onload(){
    
    window.uiTH = new uiToolsHandler();
    
    const edDOM = document.getElementById("exerciseDisplay");
    
    const rtDOM = document.getElementById("remainingTime");
    
    const sbDOM = document.getElementById("sectionBuilders");
    
    uiTH.AddDOMUIArtist(edDOM);
    
    uiTH.AddDOMUIArtist(rtDOM);
    
    uiTH.AddDOMUIArtist(sbDOM);
    
    uiTH.InitializeAllTools();
    
    _AddSectionBuilder();
}

export function _AddSectionBuilder(){
    
    const uiTH = window.uiTH;
    
    const sbArtist =uiTH.GetArtistsByAuthorizedDOMId("sectionBuilders");
    
    const sectionBuilderContainer = document.createElement("div");
    
    const sectionBuilderTitle = document.createElement("div");
    
    const sectionCount = document.getElementsByClassName("sectionBuilderTitle").length;
    
    sectionBuilderContainer.classList.add("sectionBuilderTitle");
    
    sectionBuilderTitle.innerText = "New Section";
    
    sectionBuilderContainer.append(sectionBuilderTitle);
    
    const selectionSpan = document.createElement("div");
    
    selectionSpan.classList.add("selectionSpan");
    
    const durationContainer = document.createElement("div");
    
    const durationSelection = document.createElement("input");
    
    durationSelection.type = "number";
    
    durationSelection.id = "durationSelection" + sectionCount;
    
    durationSelection.classList.add("durationSelection","selection");
    
    const durationLabel = document.createElement("label");
    
    durationLabel.for = durationSelection.id;
    
    durationLabel.innerText = "Enter section duration in seconds"
    
    const difficultyContainer = document.createElement("div");
    
    const difficultySelection = document.createElement("input");
    
    difficultySelection.type = "number";
    
    difficultySelection.id = "difficultySelection" + sectionCount;
    
    difficultySelection.classList.add("difficultySelection","selection");
    
    const difficultyLabel = document.createElement("label");
    
    difficultyLabel.for = difficultySelection.id;
    
    difficultyLabel.innerText = "Enter section difficult (try 0.5, 1, or 1.5 to start)";
    
    
    
    durationContainer.append(durationSelection);
    
    durationContainer.insertAdjacentHTML("beforeend","<br>");
    
    durationContainer.append(durationLabel);
    
    difficultyContainer.append(difficultySelection);
    
    difficultyContainer.insertAdjacentHTML("beforeend","<br>");
    
    difficultyContainer.append(difficultyLabel);
    
        
    
    
    
    
    
    sectionBuilderContainer.append(selectionSpan);
    
    
    const newSectionButton = document.createElement("button");
    
    newSectionButton.innerText = "Add another section";
    
    newSectionButton.onclick = function(){
        
        newSectionButton.style.display = "none";
        _AddSectionBuilder();
    }
    
    selectionSpan.append(durationContainer);
    
    selectionSpan.append(difficultyContainer);
    
    sectionBuilderContainer.append(newSectionButton);
    
    sectionBuilderContainer.insertAdjacentHTML("beforeend","<br><br>");
    
    sbArtist.AppendElementWithinDOM(sectionBuilderContainer);
}