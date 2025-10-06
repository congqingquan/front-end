// ==================================================== 接口入、出参通用结构类型 ====================================================

export type SortField = {
	field: string,
	order: "ASC" | "DESC"
}

export interface PageDTO {
	pageNo: number,
	pageSize: number
}

export interface SortDTO {
	sortFields: SortField[]
}

export type PageVO<D> = {
	current: number,
	size: number,
	records: D[],
	pages: number,
	total: number
}

export type ApiResult<D> = {
	code: number,
	data: D,
	message: string
}

export type ApiPageResult<D> = ApiResult<PageVO<D>>
