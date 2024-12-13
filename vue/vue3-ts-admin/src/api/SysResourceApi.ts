import { AxiosResponse } from "axios"
import ApiAxios from "./axios/ApiAxios"
import { ApiPageResult, ApiResult } from "./Types"
import SysResourceAddDTO from "./dto/SysResourceAddDTO"
import SysResourcePageDTO from "./dto/SysResourcePageDTO"
import SysResourceUpdateDTO from "./dto/SysResourceUpdateDTO"
import SysResourcePageVO from "./vo/SysResourcePageVO"

// 资源管理
// 1.分页
export const sysResourcePage = (param: Partial<SysResourcePageDTO>): Promise<AxiosResponse<ApiPageResult<SysResourcePageVO>>> => {
    return ApiAxios.postJSON<ApiPageResult<SysResourcePageVO>>("/b/sys-resource/page", param);
}
// 2. 新增
export const addSysResource = (param: Partial<SysResourceAddDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-resource/add", param);
}
// 3. 修改
export const eidtSysResource = (param: Partial<SysResourceUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-resource/edit", param);
}
// 4. 删除
export const deleteSysResource = (param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-resource/delete", param);
}