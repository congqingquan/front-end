// State holder
export type StateHolder<SK extends string, ST> = {
    state: {
        [P in SK]: ST
    }
}

// State handler
export type StateHandler<Hoder, ActionFuntions extends string | number | symbol> =
Hoder extends StateHolder<string, infer ST> ? 
   (
       Hoder & { [P in ActionFuntions]: (stateHolder: Hoder, newStateHolder: Hoder, value: ST) => void } 
   )
   : never