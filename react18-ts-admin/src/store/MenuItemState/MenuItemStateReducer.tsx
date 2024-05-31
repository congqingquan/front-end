import { StateHandler, StateHolder, createStateReducerFn } from '../base/ReducerDefinition'
import MenuItemStateHandlerImpl, {MenuItemStateActionTypeEnum} from './MenuItemStateHandlerImpl';
import { MenuItem } from '@/component/HomeMenu';

type MenuItemStateHolder = StateHolder<keyof Record<'items', MenuItem[]>, MenuItem[]>
type MenuItemStateHandler = StateHandler<MenuItemStateHolder, keyof typeof MenuItemStateActionTypeEnum>

const reducer = createStateReducerFn<'items', MenuItem[], keyof typeof MenuItemStateActionTypeEnum>(MenuItemStateHandlerImpl);

// initialState = MenuItemStateHandlerImpl
// const reducer = (stateHolder: MenuItemStateHolder = MenuItemStateHandlerImpl, action: AnyAction) => {
//     // 1. Returns a new state that has been deeply cloned
//     const newStateHolder: MenuItemStateHolder = JSON.parse(JSON.stringify(stateHolder));

//     // 2. Handle business by action type
//     const actionType: string = MenuItemStateActionTypeEnum[action.type];
//     actionType && MenuItemStateHandlerImpl[actionType](stateHolder, newStateHolder, action.value);
//     return newStateHolder;
// };

export { reducer as default, MenuItemStateActionTypeEnum, type MenuItemStateHolder, type MenuItemStateHandler };
