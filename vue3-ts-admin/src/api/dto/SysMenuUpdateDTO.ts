export default interface SysMenuUpdateDTO {
	//业务主键
	menuId: string,
	//系统资源主键
	resourceId: string,
	//父节点主键
	parentId: string,
	//父级路径
	parentPath: string,
	//等级
	level: number,
	//名称
	name: string,
	//icon
	icon: string,
	//路径
	url: string,
	//排序
	sort: number,
	//状态: NORMAL/DISABLED
	status: string,
	//打开方式类型(页签TAB / 新窗口BLANK)
	targetType: string,
	//菜单类型(不能跳转的菜单MENU_DIC / MENU / MENU_BUTTON)
	type: string,
	//创建人
	createUser: number,
	//创建时间
	createTime: Date,
	//更新人
	updateUser: number,
	//更新时间
	updateTime: Date
}