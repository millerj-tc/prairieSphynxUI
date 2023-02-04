export function ScenarioFlow(scenario){
        
    console.log(scenario);
    
    scenario.cardHandler.EmptyCards();
    
    scenario.LoadCards(); //set cards arr on scenario by Object.Create(masterCard/collectionCard) for each card in scenario
    // this should choose which cards are active vs inactive when the scenario begins
    // active cards are passed down the period chain
    // cards are activated by: being chosen by the player, being chosen randomly, by being chosen by the other player in the Arena, by being chosen by the scenario as a specific chosen opponent (or any combination if a scenario might include random cards)
    // scenario-specific cards can be active or inactive when the scenario is constructed
    
    
    // active cards in the cardHandler are passed down to the next one. That cardHandler will have functions to determine which of those cards are active
    
    scenario.BeginPeriod(); //often this is output like dialogue or narration
    
    while(scenario.GetPeriodActive()){
        
        const phaseHandler = scenario.GetSubPeriodHandlerByPeriodType();
        
        phaseHandler.GotoNextPeriod();
                
        const phase = phaseHandler.GetCurrentActivePeriod();
        
        phase.BeginPeriod();
        
        while(phase.GetPeriodActive()){
            
            const stepHandler = phaseHandler.GetCurrentActivePeriod().GetSubPeriodHandlerByPeriodName();
            
            stepHandler.GotoNextPeriod();
                        
            const step = stepHandler.GetCurrentActivePeriod()
            
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