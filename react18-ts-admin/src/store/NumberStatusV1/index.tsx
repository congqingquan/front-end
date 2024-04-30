import { ReducerHandler } from "./reducer";

const NumberStatus: ReducerHandler = {
    state: {
        num: 1
    },

    add: (state: ReducerState, newState: ReducerState, value: number): void => {
        newState.num += value;
        console.log(`add -> old num: ${state.num} val: ${value} new num: ${newState.num}`);
    },

    delete: (state: ReducerState, newState: ReducerState): void => {
        console.log(`delete num`);
    }
}

export default NumberStatus;