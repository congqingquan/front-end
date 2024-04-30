import NumberStatus from ".";

// reducer
enum ReducerActionTypeEnum {
    ADD,
    DELETE
}

interface ReducerAction {
    type: ReducerActionTypeEnum,
    value: any
}

interface ReducerHandler {

    state: {}
        
    add: (state: ReducerState, newState: ReducerState, value: any) => void;

    delete: (state: ReducerState, newState: ReducerState, value: any) => void;
}

const reducer = (state: ReducerState = { ...NumberStatus.state }, action: ReducerAction) => {

    // 1. Returns a new state that has been deeply cloned
    const newState: ReducerState = JSON.parse(JSON.stringify(state));

    // 2. Handle business by action type
    switch (action.type) {
        case ReducerActionTypeEnum.ADD: {
            NumberStatus.add(state, newState, action.value);
            break;
        }
        case ReducerActionTypeEnum.DELETE: {
            NumberStatus.delete(state, newState, action.value);
            break;
        }
        default: {
            console.log("reducer -> default");
        }
    }
    return newState;
};


export { reducer as default, ReducerActionTypeEnum, type ReducerAction , type ReducerHandler};