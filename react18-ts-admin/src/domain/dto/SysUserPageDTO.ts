import { PageDTO } from "@/api";

export default interface SysUserPageDTO extends PageDTO {
	//业务主键
	userId: number,
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
	createUser: number,
	//创建时间
	createTime: Date,
	//更新人
	updateUser: number,
	//更新时间
	updateTime: Date,
}