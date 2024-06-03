import KeyModel from "./KeyModel";

export default interface MenuItem extends KeyModel<string> {
    menuid: string,
    parentid: string,
    parentpath: string,
    label: string,
    menutype: "MENU" | "MENU_DIC",
    icon?: React.ReactNode,
    children?: MenuItem[]
}