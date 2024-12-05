export default interface SysRoleAddDTO {
	//名称
	name: string,
	//描述
	description: string,
	//状态(NORMAL / DISABLED)
	status: string,
	// 菜单资源列表
	menuResources: string[],
	// 接口资源列表
	apiResources: string[]
}