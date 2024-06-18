export default interface SysApiUpdateDTO {
	//业务主键
	apiId: string,
	//权限主键
	resourceId: string,
	//名称
	name: string,
	//路径
	url: string,
	//请求方式
	method: string,
	//接口类型(USER 用户管理、ROLE 角色管理、MENU 菜单管理、API 接口管理)
	type: string,
	//创建人
	createUser: string,
	//创建时间
	createTime: Date,
	//更新人
	updateUser: string,
	//更新时间
	updateTime: Date,

	// sys_resource
	status: string
}