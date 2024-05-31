import { AnyAction } from 'redux';
import { StateHandler, StateHolder } from '../base/ReducerDefinition'
import StringStateHandlerImpl from './StringStateHandlerImpl';

enum StringStateActionTypeEnum {
    PRINT = "PRINT",
    LOG = "LOG",
}
type StringStateHolder = StateHolder<'str', string>
type StringStateHandler = StateHandler<StringStateHolder, keyof typeof StringStateActionTypeEnum>

const reducer = (stateHolder: StringStateHolder = StringStateHandlerImpl, action: AnyAction) => {

    // 1. Returns a new state that has been deeply cloned
    const newStateHolder: StringStateHolder = JSON.parse(JSON.stringify(stateHolder));

    // 2. Handle business by action type
    const actionType: string = StringStateActionTypeEnum[action.type];
    actionType && StringStateHandlerImpl[actionType](stateHolder, newStateHolder, action.value);

    return newStateHolder;
};

export { reducer as default, StringStateActionTypeEnum, type StringStateHolder, type StringStateHandler };
