import { AxiosResponse } from "axios"
import ApiAxios from "./axios/ApiAxios"
import { ApiPageResult, ApiResult } from "./Types"
import SysRoleAddDTO from "./dto/SysRoleAddDTO"
import SysRolePageDTO from "./dto/SysRolePageDTO"
import SysRoleUpdateDTO from "./dto/SysRoleUpdateDTO"
import SysRolePageVO from "./vo/SysRolePageVO"

// 角色管理
// 1.分页
export const sysRolePage = (param: Partial<SysRolePageDTO>): Promise<AxiosResponse<ApiPageResult<SysRolePageVO>>> => {
    return ApiAxios.postJSON<ApiPageResult<SysRolePageVO>>("/b/sys-role/page", param);
}
// 2. 新增
export const addSysRole = (param: Partial<SysRoleAddDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-role/add", param);
}
// 3. 修改
export const eidtSysRole = (param: Partial<SysRoleUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-role/edit", param);
}
// 4. 删除
export const deleteSysRole = (param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-role/delete", param);
}