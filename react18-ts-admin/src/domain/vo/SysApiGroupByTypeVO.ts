import SysApiViewVO from "./SysApiViewVO";

export default interface SysApiGroupByTypeVO {
	//类型
	type: string,
	//接口列表
	items: SysApiViewVO[]
}