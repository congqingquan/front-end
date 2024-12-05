import SysRoleAddDTO from "./SysRoleAddDTO";

export default interface SysUserAddDTO {
	//业务主键
	userId: string,
	//账户名
	username: string,
	//密码
	password: string,
	//名称
	name: string,
	//性别(MAN / WOMAN / UNKNOWN)
	gender: string,
	//邮箱
	email: string,
	//头像
	avatar: string,
	//状态(NORMAL / DISABLED)
	status: string,
	// 角色列表
	roles: SysRoleAddDTO[]
}