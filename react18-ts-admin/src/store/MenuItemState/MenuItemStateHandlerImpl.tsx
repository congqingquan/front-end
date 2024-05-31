import AdminAxiosExt, { ApiResult } from "@/api/Admin/Axios";
import { convertNode } from "@/util/TreeUtils";
import * as API from "@/api/Admin/API";
import { MenuItemStateHandler, MenuItemStateHolder } from "./MenuItemStateReducer";
import { MenuItem } from "@/component/HomeMenu";
import AntdIcon from "@/component/Icon/AntdIcon";
import store from '@/store';

enum MenuItemStateActionTypeEnum {
    INIT = "INIT"
}

const MenuItemStateHandlerImpl: MenuItemStateHandler = {
    state: {
        items: []
    },
    INIT(_, newStateHolder: MenuItemStateHolder, value: MenuItem[]): void {
         newStateHolder.state.items = value;
    }
}

async function initState(): Promise<void> {
    await AdminAxiosExt.postJSON<ApiResult<API.SysMenuTreeVO[]>>(API.SYS_MENU_TREE, {})
        .then(response => {
            const sysMenuTreeVos: API.SysMenuTreeVO[] = response.data.data;
            const sysMenuTree: MenuItem[] = convertNode(
                sysMenuTreeVos,
                sourceNode => (
                    {
                        label: sourceNode.name,
                        key: sourceNode.url,
                        icon: sourceNode.icon ? <AntdIcon name={sourceNode.icon} /> : null
                    } as MenuItem
                ),
                sourceNode => sourceNode.children,
                targetNode => {
                    targetNode.children = [];
                    return targetNode.children;
                }
            );
            store.dispatch({
                type: MenuItemStateActionTypeEnum.INIT,
                value: sysMenuTree
            })
        });
}
initState();

export {
    MenuItemStateHandlerImpl as default, MenuItemStateActionTypeEnum
};