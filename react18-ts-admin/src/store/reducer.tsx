// reducer
enum ReducerActionTypeEnum {
    ADD,
    DELETE
}

interface ReducerAction {
    type: ReducerActionTypeEnum,
    value: any
}

// init state function
const init: () => ReducerState = () => ({value: 0})

const reducer = (state: ReducerState = init(), action: ReducerAction) => {

    // 1. Returns a new state that has been deeply cloned
    const newState: ReducerState = JSON.parse(JSON.stringify(state));

    // 2. Handle business by action type
    switch (action.type) {
        case ReducerActionTypeEnum.ADD: {
            newState.value = state.value + 1;
            console.log("reducer -> add");
            break;
        }
        case ReducerActionTypeEnum.DELETE: {
            console.log("reducer -> delete");
            break;
        }
        default: {
            console.log("reducer -> default");
        }
    }
    return newState;
};


export { reducer as default, ReducerActionTypeEnum, type ReducerAction };