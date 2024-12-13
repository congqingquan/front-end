export default interface DictionaryPageByDictTypeDTO {
	//页码
	pageNo: number,
	//每页数量
	pageSize: number,
	//名称
	name: string,
	//字典类型(目录节点为空)
	dictType: string,
	//状态: NORMAL / DISABLED
	status: string
}