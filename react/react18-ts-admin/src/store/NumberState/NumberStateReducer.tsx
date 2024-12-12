import { AnyAction } from 'redux';
import { StateHandler, StateHolder } from '../base/ReducerDefinition'
import NumberStateHandlerImpl from './NumberStateHandlerImpl';

enum NumberStateActionTypeEnum {
    ADD = "ADD",
    DELETE = "DELETE",
}
type NumberStateHolder = StateHolder<'num', number>
type NumberStateHandler = StateHandler<NumberStateHolder, keyof typeof NumberStateActionTypeEnum>

const reducer = (stateHolder: NumberStateHolder = NumberStateHandlerImpl, action: AnyAction) => {

    // 1. Returns a new state that has been deeply cloned
    const newStateHolder: NumberStateHolder = JSON.parse(JSON.stringify(stateHolder));

    // 2. Handle business by action type
    const actionType: string = NumberStateActionTypeEnum[action.type];
    actionType && NumberStateHandlerImpl[actionType](stateHolder, newStateHolder, action.value);
    
    return newStateHolder;
};

export { reducer as default, NumberStateActionTypeEnum, type NumberStateHolder, type NumberStateHandler };
