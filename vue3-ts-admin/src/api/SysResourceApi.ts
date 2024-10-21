import { AxiosResponse } from "axios"
import AdminAxios from "./axios/AdminAxios"
import { ApiPageResult, ApiResult } from "./Types"
import SysResourceAddDTO from "./dto/SysResourceAddDTO"
import SysResourcePageDTO from "./dto/SysResourcePageDTO"
import SysResourceUpdateDTO from "./dto/SysResourceUpdateDTO"
import SysResourcePageVO from "./vo/SysResourcePageVO"

// 资源管理
// 1.分页
export const sysResourcePage = (param: Partial<SysResourcePageDTO>): Promise<AxiosResponse<ApiPageResult<SysResourcePageVO>>> => {
    return AdminAxios.postJSON<ApiPageResult<SysResourcePageVO>>("/admin/b/sysResource/page", param);
}
// 2. 新增
export const addSysResource = (param: SysResourceAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysResource/add", param);
}
// 3. 修改
export const eidtSysResource = (param: Partial<SysResourceUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysResource/edit", param);
}
// 4. 删除
export const deleteSysResource = (param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysResource/delete", param);
}