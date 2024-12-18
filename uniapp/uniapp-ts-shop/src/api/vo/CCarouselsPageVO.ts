export default interface CCarouselsPageVO {
	//主键
	id: string,
	//业务主键
	carouselId: string,
	//标题
	title: string,
	//图片地址
	imageUrl: string,
	//跳转地址
	linkUrl: string,
	//打开的跳转页面方式, 如: _blank, _self
	target: string,
	//排序
	sort: number,
	//类型
	type: string,
	//状态(NORMAL / DISABLED)
	status: string,
	//描述
	description: string,
	//创建人
	createUser: string,
	//创建时间
	createTime: string,
	//更新人
	updateUser: string,
	//更新时间
	updateTime: string,
	//逻辑删除: 1Y 0N
	isDeleted: number,
	//租户主键
	tenantId: string
}