export default interface MenuItem {
    menuid: string,
    parentid: string,
    parentpath: string,
    label: string,
    key: string,
    menuType: "MENU" | "MENU_DIC",
    icon?: React.ReactNode,
    children?: MenuItem[]
}