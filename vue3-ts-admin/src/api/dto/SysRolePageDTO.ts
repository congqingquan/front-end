import { PageDTO } from "@/api";
import SysRoleAddDTO from "./SysRoleAddDTO";

export default interface SysRolePageDTO extends PageDTO {
	//页码
	pageNo: number,
	//每页数量
	pageSize: number,
	//业务主键
	roleId: string,
	//名称
	name: string,
	//描述
	description: string,
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
	// 角色列表
	roles: SysRoleAddDTO[]
}