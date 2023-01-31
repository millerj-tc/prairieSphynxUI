class cond
{
    constructor(conditionGroupOwner,EvalFunc,arg1,arg2,arg3){
     
        this.conditionGroupOwner = conditionGroupOwner;
        this.EvalFunc = EvalFunc;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
    }
}

class conditionGroup
{
    constructor(conditionHandlerOwner,type){
        
        this.conditionHandlerOwner = conditionHandlerOwner;
        this.type = type;
        this.conds = [];
    }
    
    AddCondition(EvalFunc,arg1,arg2,arg3){
        
        const $cond = new cond(this,EvalFunc,arg1,arg2,arg3);
        
        this.conds.push($cond);
        
        return this
    }
    
    Evaluate(){
        
        let $trueConds = 0;
        
        for(const cond of this.conds){
            
            if(cond.EvalFunc(cond.arg1,cond.arg2,cond.arg3)) $trueConds++;
        }
        
        if($trueConds > 0 && this.type == "or") return true
        else if($trueConds == this.conds.length && this.type == "and") return true
        else if($trueConds == 0 && this.type == "not") return true
        else return false
    }
}

export class conditionHandler
{
    constructor(){
        
        this.conditionGroups = [];
    }
    
    AddConditionGroup(type = "and"){ //types are "and" or "or"
        
        const $condGrp = new conditionGroup(this,type);
        
        this.conditionGroups.push($condGrp);
        
        return $condGrp
    }
    
    AddConditionGroupByObjReference(condGrpObj){
        
        this.conditionGroups.push(condGrpObj);
    }
    
    Evaluate(){
        
        let $trueCondGrps = 0;
        
        for(const condGrp of this.conditionGroups){
            
            if(condGrp.Evaluate()) $trueCondGrps++
        }
        
        if($trueCondGrps == this.conditionGroups.length) return true
        else return false
    }
}