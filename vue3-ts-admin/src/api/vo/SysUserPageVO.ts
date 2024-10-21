import SysRoleViewVO from "./SysRoleViewVO";

export default interface SysUserPageVO {
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
	//创建人
	createUser: number,
	//创建时间
	createTime: string,
	//更新人
	updateUser: number,
	//更新时间
	updateTime: string,
	// 角色列表
	roles: SysRoleViewVO[]
}