export function ScenarioFlow(scenario){
        
    //"protoLevel" -> "period"
    
    scenario.LoadCards(); //set cards arr on scenario by Object.Create(masterCard/collectionCard) for each card in scenario
    // this should choose which cards are active vs inactive when the scenario begins
    // active cards are passed down the period chain
    // cards are activated by: being chosen by the player, being chosen randomly, by being chosen by the other player in the Arena, by being chosen by the scenario as a specific chosen opponent (or any combination if a scenario might include random cards)
    // scenario-specific cards can be active or inactive when the scenario is constructed
    
    scenario.BeginPeriod(); //often, this is output like dialogue or narration
        
    scenario.periodActive = true;
    
    while(scenario.periodActive == true){
        
        const ph = scenario.phaseHandler;
        
        ph.ChoosePhase(); //ChoosePhase/ChooseStep should be linear unless a special "nonlinear" prop (default = false) is true on the object. this will set currentPhase on phaseHandler;
        
        ph.currentPhase.periodActive = true;
        
        ph.LoadCards();
        
        ph.currentPhase.BeginPeriod();
        
        while(currentPhase.periodActive == true){
            
            const sh = currentPhase.stepHandler;
            
            sh.ChooseStep();
            
            sh.currentStep.periodActive = true;
            
            sh.LoadCards();
            
            sh.currentStep.BeginPeriod();
            
            while(currentStep.periodActive == true){
                
                sh.currentStep.Evaluate();
                
                sh.currentStep.IsStepOver(); //set currentStep.periodActive to 'false' if conditions are met
            }
            
            sh.currentStep.EndStep(); //set previousStep to currentStep, set currentStep to null -- this way if currentStep is not null, you can "resume" a paused step, phase, scenario, empty stepCards arr
            
            ph.currentPhase.IsPhaseOver();
        }
        
        currentPhase.EndPhase();
        
        scenario.IsScenarioOver();
    }
    
    scenario.EndScenario();
    
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