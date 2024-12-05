import { AxiosResponse } from "axios";
import ApiAxios from "./axios/ApiAxios";
import SysApiAddDTO from "./dto/SysApiAddDTO";
import SysApiPageDTO from "./dto/SysApiPageDTO";
import SysApiUpdateDTO from "./dto/SysApiUpdateDTO";
import SysApiUpdateStatusDTO from "./dto/SysApiUpdateStatusDTO";
import { ApiPageResult, ApiResult } from "./Types";
import SysApiGroupByTypeVO from "./vo/SysApiGroupByTypeVO";
import SysApiPageVO from "./vo/SysApiPageVO";

// 接口管理
// 1. 查询
// 1.1) 分页
export const sysApiPage = (param: Partial<SysApiPageDTO>): Promise<AxiosResponse<ApiPageResult<SysApiPageVO>>> => {
    return ApiAxios.postJSON<ApiPageResult<SysApiPageVO>>("/b/sys-api/page", param);
}
// 1.2) 类别分组查询
export const sysApiGroupByType = (): Promise<AxiosResponse<ApiResult<SysApiGroupByTypeVO[]>>> => {
    return ApiAxios.postJSON<ApiResult<SysApiGroupByTypeVO[]>>("/b/sys-api/group-by-type");
}
// 2. 新增
export const addSysApi = (param: Partial<SysApiAddDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-api/add", param);
}
// 3. 修改
export const eidtSysApi = (param: Partial<SysApiUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-api/edit", param);
}
export const updateSysApiStatus = (param: SysApiUpdateStatusDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-api/update-status", param);
}
// 4. 删除
export const deleteSysApi = (param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-api/delete", param);
}