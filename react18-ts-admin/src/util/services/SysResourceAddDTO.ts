export default interface SysResourceAddDTO {
	//主键
	id: number,
	//业务主键
	resourceId: number,
	//名称
	name: string,
	//描述
	description: string,
	//类型(MENU_DIC / MENU / MENU_BUTTON)
	type: string,
	//创建人
	createUser: number,
	//创建时间
	createTime: Date,
	//更新人
	updateUser: number,
	//更新时间
	updateTime: Date,
	//逻辑删除: 1Y 0N
	isDeleted: number
}