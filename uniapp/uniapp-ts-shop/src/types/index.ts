import StoreKeys from "@/stores/StoreKeys"

// ==================================================== 工具类型 ====================================================


// 获取对象值的类型
export type GetObjectValueType<T> = T extends { [key: string | number | symbol]: infer U } ? U : never

// ==================================================== Pina ====================================================

export interface Store {
    name: StoreName
    init: () => Promise<void>,
    clear: () => Promise<void>
}

export type StoreName = GetObjectValueType<typeof StoreKeys>

// ==================================================== 接口入、出参通用结构类型 ====================================================

export type RequestOptionsExt<D> = Omit<UniNamespace.RequestOptions, 'data'> & { data: D }

export type PageVO<D> = {
    current: number,
    size: number,
    records: D[],
    pages: number,
    total: number
}

export interface PageDTO {
    pageNo: number,
    pageSize: number
}

export type ApiResult<D> = {
    code: number,
    data: D,
    message: string
}

export type ApiPageResult<D> = ApiResult<PageVO<D>>