export default interface SysResourceAddDTO {
	//业务主键
	resourceId: string,
	//标识符
	identifier: string,
	//名称
	name: string,
	//值
	value: string,
	//描述
	description: string,
	//类型(MENU_DIC / MENU / MENU_BUTTON / API)
	type: string,
	//状态: NORMAL/DISABLED
	status: string,
	//创建人
	createUser: number,
	//创建时间
	createTime: Date,
	//更新人
	updateUser: number,
	//更新时间
	updateTime: Date
}