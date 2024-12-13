export default interface DictionaryPageByDictTypeVO {
    // 业务组件
    dictId: string,
    // 父节点主键
    parentId: string,
	//名称
	name: string,
    // 值
    value: string,
    // 节点类型: DIRECTORY / DICTIONARY
    nodeType: string,
	//字典类型(目录节点为空)
	dictType: string,
	//状态: NORMAL / DISABLED
	status: string,
	//创建时间
	createTime: Date,
    // 子节点
    children: DictionaryPageByDictTypeVO[]
}