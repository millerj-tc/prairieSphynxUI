export function ScenarioFlow(scenario){
        
    console.log(scenario);
    
    scenario.BeginPeriod(); //often this is output like dialogue or narration
    
    while(scenario.GetPeriodActive()){
        
        const phaseHandler = scenario.GetSubPeriodHandlerByPeriodType();
        
        phaseHandler.ActivateNextPeriod();
                
        const phase = phaseHandler.GetCurrentActivePeriod();
        
        phase.cardHandler.EmptyCards();
    
        phase.LoadCards();
        
        phase.BeginPeriod();
        
        while(phase.GetPeriodActive()){
            
            const stepHandler = phaseHandler.GetCurrentActivePeriod().GetSubPeriodHandlerByPeriodName();
            
            stepHandler.ActivateNextPeriod();
                        
            const step = stepHandler.GetCurrentActivePeriod();
            
            step.cardHandler.EmptyCards();
    
            step.LoadCards();
            
            step.BeginPeriod();
            
            while(step.GetPeriodActive()){
                
                step.Run();
                
                step.PeriodDeactivateFlow(); //set period.periodActive to 'false' if conditions are met
            }
            
            step.EndPeriod(); //set previousStep to currentStep, set currentStep to null -- this way if currentStep is not null, you can "resume" a paused step, phase, scenario, empty stepCards arr
            
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