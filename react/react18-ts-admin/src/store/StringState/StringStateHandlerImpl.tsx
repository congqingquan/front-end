import { StringStateHandler, StringStateHolder } from "./StringStateReducer";

const StringStateHandlerImpl: StringStateHandler = {

    state: {
        str: ""
    },

    PRINT: (_, newStateHolder: StringStateHolder, value: string): void => {
        newStateHolder.state.str = value;
        console.log(`print > ${newStateHolder.state.str}`);
    },

    LOG: (_, newStateHolder: StringStateHolder, value: string): void => {
        newStateHolder.state.str = value;
        console.log(`log > ${newStateHolder.state.str}`);
    }
}

export {
    StringStateHandlerImpl as default
};