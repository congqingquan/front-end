import { AxiosResponse } from "axios"
import ApiAxios from "./axios/ApiAxios"
import SysUserLoginDTO from "./dto/SysUserLoginDTO"
import SysUserLoginVO from "./vo/SysUserLoginVO"
import { ApiPageResult, ApiResult } from "./Types"
import SysUserAddDTO from "./dto/SysUserAddDTO"
import SysUserPageDTO from "./dto/SysUserPageDTO"
import SysUserUpdateDTO from "./dto/SysUserUpdateDTO"
import SysUserPageVO from "./vo/SysUserPageVO"

// 登录鉴权
export const sysUserLogin = (param: SysUserLoginDTO): Promise<AxiosResponse<ApiResult<SysUserLoginVO>>> => {
    return ApiAxios.postJSON<ApiResult<SysUserLoginVO>>("/b/sys-user/login", param);
}

// 用户管理
// 1. 分页
export const sysUserPage = (param: Partial<SysUserPageDTO>): Promise<AxiosResponse<ApiPageResult<SysUserPageVO>>> => {
    return ApiAxios.postJSON<ApiPageResult<SysUserPageVO>>("/b/sys-user/page", param);
}
// 2. 新增
export const addSysUser = (param: Partial<SysUserAddDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-user/add", param);
}
// 3. 修改
export const eidtSysUser = (param: Partial<SysUserUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-user/edit", param);
}
// 4. 删除
export const deleteSysUser = (param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-user/delete", param);
}