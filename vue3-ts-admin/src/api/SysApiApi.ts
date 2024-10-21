import { AxiosResponse } from "axios";
import AdminAxios from "./axios/AdminAxios";
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
    return AdminAxios.postJSON<ApiPageResult<SysApiPageVO>>("/admin/b/sysApi/page", param);
}
// 1.2) 类别分组查询
export const sysApiGroupByType = (): Promise<AxiosResponse<ApiResult<SysApiGroupByTypeVO[]>>> => {
    return AdminAxios.postJSON<ApiResult<SysApiGroupByTypeVO[]>>("/admin/b/sysApi/groupByType");
}
// 2. 新增
export const addSysApi = (param: SysApiAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysApi/add", param);
}
// 3. 修改
export const eidtSysApi = (param: Partial<SysApiUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysApi/edit", param);
}
export const updateSysApiStatus = (param: SysApiUpdateStatusDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysApi/updateStatus", param);
}
// 4. 删除
export const deleteSysApi = (param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysApi/delete", param);
}