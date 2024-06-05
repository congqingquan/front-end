export default interface SysRoleAddDTO {
	//业务主键
	roleId: number,
	//名称
	name: string,
	//描述
	description: string,
	//状态(NORMAL / DISABLED)
	status: string
}