import NumberStatus from '.';


enum ReducerActionTypeEnum {
    ADD,
    DELETE,
}

interface ReducerAction {
    type: ReducerActionTypeEnum;
    value: any;
}

interface ReducerHandler<T> {
    state: {};

    // [props in keyof T]: {};
}

const reducer = (state: ReducerState = { ...NumberStatus.state }, action: ReducerAction) => {
    // 1. Returns a new state that has been deeply cloned
    const newState: ReducerState = JSON.parse(JSON.stringify(state));

    // 2. Handle business by action type
    const enumName: string = ReducerActionTypeEnum[action.type];
    enumName && NumberStatus[enumName] && NumberStatus[enumName](state, newState, action.value);
    return newState;
};

export { reducer as default, ReducerActionTypeEnum, type ReducerAction, type ReducerHandler };
