import KeyModel from "./KeyModel";

export default interface MenuItem extends KeyModel<string> {
    label: string,
    menuid: string,
    parentid: string,
    parentpath: string,
    menutype: 'MENU_DIC' | 'MENU' | 'MENU_BUTTON',
    url: string,
    component: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
}