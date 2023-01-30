import {sphynxUIHandler} from "./sphynxUIHandler.js";

export function Test(){
    
    const div0 = document.createElement("div")
    
    document.body.append(div0);
    
    const div1 = document.createElement("div")
    
    document.body.append(div1);
    
    window.sphynxUIHandler.AddAuthorizedDOMs(div0,div1);
    
    window.sphynxUIHandler.Test("booyah");
    
    const div2 = document.createElement("div")
    
    document.body.append(div2);
    
    const div3 = document.createElement("div")
    
    document.body.append(div3);
    
    const suih = new sphynxUIHandler(div2,div3);
    
    suih.Test("dood");
}