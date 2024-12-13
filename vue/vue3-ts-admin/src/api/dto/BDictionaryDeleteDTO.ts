export default interface BDictionaryDeleteDTO {
    //节点类型: DIRECTORY / DICTIONARY
    nodeType: string,
	//业务主键
	dictIds: string[]
}