import { AxiosResponse } from "axios"
import AdminAxios from "./axios/AdminAxios"
import { ApiPageResult, ApiResult } from "./Types"
import SysRoleAddDTO from "./dto/SysRoleAddDTO"
import SysRolePageDTO from "./dto/SysRolePageDTO"
import SysRoleUpdateDTO from "./dto/SysRoleUpdateDTO"
import SysRolePageVO from "./vo/SysRolePageVO"

// 角色管理
// 1.分页
export const sysRolePage = (param: Partial<SysRolePageDTO>): Promise<AxiosResponse<ApiPageResult<SysRolePageVO>>> => {
    return AdminAxios.postJSON<ApiPageResult<SysRolePageVO>>("/admin/b/sysRole/page", param);
}
// 2. 新增
export const addSysRole = (param: SysRoleAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysRole/add", param);
}
// 3. 修改
export const eidtSysRole = (param: Partial<SysRoleUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysRole/edit", param);
}
// 4. 删除
export const deleteSysRole = (param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysRole/delete", param);
}