import { MenuTreeQueryType, MenuItemType, Status } from "@/types/Types"


export default interface SysMenuTreeDTO {
	// 类型
	type: MenuTreeQueryType
	// 菜单类型
	menuTypes: MenuItemType[]
	// 关键字
	keyword: string
	// 状态
	status: Status
}