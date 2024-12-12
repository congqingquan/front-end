import { MenuItemType } from "@/common/Type";
import KeyModel from "./KeyModel";

export default interface MenuItem extends KeyModel<string> {
    label: string,
    menuid: string,
    resourceid: string,
    parentid: string,
    parentpath: string,
    menutype: MenuItemType,
    identifier: string,
    url: string,
    component: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
}