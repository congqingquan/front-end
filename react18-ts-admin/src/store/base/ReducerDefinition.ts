import { AnyAction } from "redux";

// State holder
export type StateHolder<SK extends string, ST> = {
    state: {
        [P in SK]: ST
    }
}

// State handler
export type StateHandler<Holder, ActionFuntions extends string | number | symbol> = Holder extends StateHolder<string, infer ST> ?
    (
        Holder & { [P in ActionFuntions]: (stateHolder: Holder, newStateHolder: Holder, value: ST) => void }
    )
    : never

// State reducer func
export function createStateReducerFn
    // generic
    <SK extends string, ST, ActionFuntions extends string | number | symbol>
    // param list
    (stateHandler: StateHandler<StateHolder<SK, ST>, ActionFuntions>):
    // return value type
    (stateHolder: StateHolder<SK, ST>, action: AnyAction) => StateHolder<SK, ST>
// function body
{
    // initalState = stateHandler
    return (stateHolder = stateHandler, action) => {
        // 1. Returns a new state that has been deeply cloned
        const newStateHolder: StateHolder<any, any> = JSON.parse(JSON.stringify(stateHolder));

        // 2. Handle business by action type
        stateHandler[action.type] && stateHandler[action.type](stateHolder, newStateHolder, action.value);

        console.log("menu====", JSON.stringify(stateHandler[action.type]));

        return newStateHolder
    }
}