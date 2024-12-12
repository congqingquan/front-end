import TreeUtils from "@/util/TreeUtils";
import API from "@/api";
import { MenuItemStateHandler, MenuItemStateHolder } from "./MenuItemStateReducer";
import AntdIcon from "@/component/AsyncComponent";
import store from '@/store';
import MenuItem from "@/domain/model/MenuItem";
import SysMenuTreeVO from "@/domain/vo/SysMenuTreeVO";

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
    
    await API.sysMenyTree()
        .then(response => {
            const sysMenuTreeVos: SysMenuTreeVO[] = response.data.data;
            const sysMenuTree: MenuItem[] = TreeUtils.convertNode(
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