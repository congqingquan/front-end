export default interface SysUserPageDTO {
	//页码
	pageNo: number,
	//每页数量
	pageSize: number,
	//业务主键
	userId: string,
	//账户名
	username: string,
	//密码
	password: string,
	//名称
	name: string,
	//头像
	avatar: string,
	//性别(MAN / WOMAN / UNKNOWN)
	gender: string,
	//邮箱
	email: string,
	//状态(NORMAL / DISABLED)
	status: string,
	//创建人
	createUser: string,
	//创建时间
	createTime: Date,
	//更新人
	updateUser: string,
	//更新时间
	updateTime: Date,
}