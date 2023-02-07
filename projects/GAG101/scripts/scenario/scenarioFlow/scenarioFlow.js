export function ScenarioFlow(scenario){
        
    const gh = window.gameHandler;
    
    console.log(scenario);
    
    scenario.BeginPeriod(); //often this is output like dialogue or narration
    
    gh.narrOutputArtist.ClearAllChildren();
    
    const phaseHandler = scenario.GetSubPeriodHandlerByPeriodType();
        
    phaseHandler.ActivateNextPeriod();
    
    while(scenario.GetPeriodActive()){    
                
        const phase = phaseHandler.GetCurrentActivePeriod();
        
        phase.cardHandler.EmptyCards();
    
        phase.LoadCards();
        
        phase.BeginPeriod();
        
        const stepHandler = phaseHandler.GetCurrentActivePeriod().GetSubPeriodHandlerByPeriodType();
            
        stepHandler.ActivateNextPeriod();
        
        while(phase.GetPeriodActive()){
                        
            const step = stepHandler.GetCurrentActivePeriod();
            
            step.cardHandler.EmptyCards();
    
            step.LoadCards();
            
            step.BeginPeriod();
            
            while(step.GetPeriodActive()){
                
                console.log(step);
                
                step.Run();
                
                step.PeriodDeactivateFlow(); //set period.periodActive to 'false' if conditions are met. Normally, activate the next period in the period handler
            }
            
            step.EndPeriod(); 
            
            phase.PeriodDeactivateFlow();
        }
        
        phase.EndPeriod();
        
        scenario.PeriodDeactivateFlow();
    }
    
    scenario.EndPeriod();
    
//    - load copies of all cards into a scenario (including unchosen ones that can "appear" mid-simulation, might be cards from firebase)
//- choose a starting phase
//Phase loop:
//    - declare the phase via output (if necesary)
//    - choose the starting step
//    Step loop:
//        - perform step operations
//        - determine how the current step ends
//        - determine how to move to the next step
//    - determine how the current phase ends
//    - determine how to move to the next phase
//- perform a bunch of operations on the cards, leading changed card properties (changed card properties could be at the step, phase, scenario, or player collection level)
//- check what happened and output text to show player what happened (potentially in concise mode)
}

function _RunPhases(scenario){
    
    const phaseHandler = scenario.GetSubPeriodHandlerByPeriodType();
    
    for(const phase of phaseHandler.periods){
        
        phaseHandler.ActivateNextPeriod();
        
        const phase = phaseHandler.GetCurrentActivePeriod();
        
        phase.cardHandler.EmptyCards();
    
        phase.LoadCards();
        
        phase.BeginPeriod();
        
        _RunSteps(phase);
        
        
        
        
        
    }
}

function _RunSteps(phase){
    
    const stepHandler = phase.GetSubPeriodHandlerByPeriodType();
    
    stepHandler.ActivateNextPeriod();
    
    for(const step of stepHandler.periods){
        
        
        
        const step = stepHandler.GetCurrentActivePeriod();
        
        step.cardHandler.EmptyCards();
        
        step.LoadCards();
        
        step.BeginPeriod();
        
        step.Run();
        
        step.PeriodDeactivateFlow(); //deactivate self and activate next if done
    }
}