export default interface SysApiUpdateStatusDTO {
	//业务主键
	apiId: string,
	//状态: NORMAL/DISABLED
	status: string,
}