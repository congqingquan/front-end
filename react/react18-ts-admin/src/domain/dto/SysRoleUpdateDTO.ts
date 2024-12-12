export default interface SysRoleUpdateDTO {
	//业务主键
	roleId: string,
	//名称
	name: string,
	//描述
	description: string,
	//状态(NORMAL / DISABLED)
	status: string,
	// 菜单资源列表
	menuResources: number[],
	// 接口资源列表
	apiResources: number[]
}