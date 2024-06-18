import { MenuContextData } from "@/common/Type";
import { createContext } from "react";

const MenuContext = createContext<MenuContextData>(
    {
        userMenuTree: [], 
        userMenuItemMap: new Map(),
        userMenuBtnMap: new Map(),

        allMenuTree: [], 
        allMenuItemMap: new Map(),
        
        reload() {
            // Do nothing
        },

        clear() {
            // Do nothing
        },
    }
);
export default MenuContext