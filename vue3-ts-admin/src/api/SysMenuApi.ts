import { AxiosResponse } from "axios";
import ApiAxios from "./axios/ApiAxios";
import SysMenuAddDTO from "./dto/SysMenuAddDTO";
import SysMenuUpdateDTO from "./dto/SysMenuUpdateDTO";
import SysMenuUpdateStatusDTO from "./dto/SysMenuUpdateStatusDTO";
import { ApiResult } from "./Types";
import SysMenuTreeDTO from "./dto/SysMenuTreeDTO";
import SysMenuTreeVO from "./vo/SysMenuTreeVO";

// 菜单管理
// 1. 菜单管理树查询 & 主页左侧菜单
export const sysMenuTree = (param: Partial<SysMenuTreeDTO>): Promise<AxiosResponse<ApiResult<SysMenuTreeVO[]>>> => {
    return ApiAxios.postJSON<ApiResult<SysMenuTreeVO[]>>("/b/sys-menu/tree", param)
}
// 2. 新增
export const addSysMenu = (param: Partial<SysMenuAddDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-menu/add", param)
}
// 3. 修改
export const eidtSysMenu = (param: Partial<SysMenuUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-menu/edit", param)
}
export const updateSysMenuStatus = (param: Partial<SysMenuUpdateStatusDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return ApiAxios.postJSON<ApiResult<boolean>>("/b/sys-menu/update-status", param)
}
// 4. 删除
export const deleteSysMenu = (param: string): Promise<AxiosResponse<ApiResult<boolean>>> => {
    const formData = new FormData()
    formData.append("menuId", param)
    return ApiAxios.post<ApiResult<boolean>>("/b/sys-menu/delete", formData);
}