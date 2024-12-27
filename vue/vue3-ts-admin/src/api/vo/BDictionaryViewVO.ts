export default interface BDictionaryViewVO {
	//主键
	id: string,
	//业务主键
	dictId: string,
	//父节点主键
	parentId: string,
	//父节点路径, `,`号分隔
	parentPath: string,
	//节点类型: DIRECTORY / DICTIONARY
	nodeType: string,
    //等级
    level: number,
	//名称
	name: string,
	//英文名称
	nameEn: string,
	//值
	value: string,
	//字典类型(目录节点为空)
	dictType: string,
	//icon
	icon: string,
	//排序
	sort: number,
	//是否默认
	isDefault: number,
	//备注
	remark: string,
	//状态: NORMAL / DISABLED
	status: string,
	//创建人
	createUser: string,
	//创建时间
	createTime: Date,
	//更新人
	updateUser: string,
	//更新时间
	updateTime: Date,
	//是否删除
	isDeleted: number,
	//租户主键
	tenantId: string
}