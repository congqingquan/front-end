import SysResourceViewVO from "./SysResourceViewVO";

export default interface SysRolePageVO {
	//业务主键
	roleId: string,
	//名称
	name: string,
	//描述
	description: string,
	//状态(NORMAL / DISABLED)
	status: string,
	//创建人
	createUser: number,
	//创建时间
	createTime: Date,
	//更新人
	updateUser: number,
	//更新时间
	updateTime: Date,
	// 菜单资源列表
	menuResources: SysResourceViewVO[],
	// 接口资源列表
	apiResources: SysResourceViewVO[]
}