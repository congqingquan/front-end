import { AxiosResponse } from "axios"
import AdminAxios from "./axios/AdminAxios"
import SysUserLoginDTO from "./dto/SysUserLoginDTO"
import SysUserLoginVO from "./vo/SysUserLoginVO"
import { ApiPageResult, ApiResult } from "./Types"
import SysUserAddDTO from "./dto/SysUserAddDTO"
import SysUserPageDTO from "./dto/SysUserPageDTO"
import SysUserUpdateDTO from "./dto/SysUserUpdateDTO"
import SysUserPageVO from "./vo/SysUserPageVO"

// 登录鉴权
export const sysUserLogin = (param: SysUserLoginDTO): Promise<AxiosResponse<ApiResult<SysUserLoginVO>>> => {
    return AdminAxios.postJSON<ApiResult<SysUserLoginVO>>("/admin/b/sysUser/login", param);
}

// 用户管理
// 1. 分页
export const sysUserPage = (param: Partial<SysUserPageDTO>): Promise<AxiosResponse<ApiPageResult<SysUserPageVO>>> => {
    return AdminAxios.postJSON<ApiPageResult<SysUserPageVO>>("/admin/b/sysUser/page", param);
}
// 2. 新增
export const addSysUser = (param: SysUserAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysUser/add", param);
}
// 3. 修改
export const eidtSysUser = (param: Partial<SysUserUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysUser/edit", param);
}
// 4. 删除
export const deleteSysUser = (param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysUser/delete", param);
}