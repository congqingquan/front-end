import { NumberStateHandler, NumberStateHolder } from "./NumberStateReducer";

const NumberStateHandlerImpl: NumberStateHandler = {

    state: {
        num: 0
    },

    ADD: (stateHolder: NumberStateHolder, newStateHolder: NumberStateHolder, value: number): void => {
        newStateHolder.state.num += value;
        console.log(`add -> old num: ${stateHolder.state.num} val: ${value} new num: ${newStateHolder.state.num}`);
    },

    DELETE: (state: NumberStateHolder, newState: NumberStateHolder): void => {
        console.log(`delete num`);
    }
}

export {
    NumberStateHandlerImpl as default
};