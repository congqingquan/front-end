import { MenuContextData } from "@/common/Type";
import { createContext } from "react";

const MenuContext = createContext<MenuContextData>({ tree: [], itemMap: new Map()});
export default MenuContext