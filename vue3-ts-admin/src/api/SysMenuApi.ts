import { AxiosResponse } from "axios";
import AdminAxios from "./axios/AdminAxios";
import SysMenuAddDTO from "./dto/SysMenuAddDTO";
import SysMenuUpdateDTO from "./dto/SysMenuUpdateDTO";
import SysMenuUpdateStatusDTO from "./dto/SysMenuUpdateStatusDTO";
import { ApiResult } from "./Types";
import SysMenuTreeDTO from "./dto/SysMenuTreeDTO";
import SysMenuTreeVO from "./vo/SysMenuTreeVO";

// 菜单管理
// 1. 菜单管理树查询 & 主页左侧菜单
export const sysMenuTree = (param: Partial<SysMenuTreeDTO>): Promise<AxiosResponse<ApiResult<SysMenuTreeVO[]>>> => {
    return AdminAxios.postJSON<ApiResult<SysMenuTreeVO[]>>("/admin/b/sysMenu/tree", param);
}
// 2. 新增
export const addSysMenu = (param: SysMenuAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysMenu/add", param);
}
// 3. 修改
export const eidtSysMenu = (param: Partial<SysMenuUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysMenu/edit", param);
}
export const updateSysMenuStatus = (param: SysMenuUpdateStatusDTO): Promise<AxiosResponse<ApiResult<boolean>>> => {
    return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysMenu/updateStatus", param);
}
// 4. 删除
export const deleteSysMenu = (param: string): Promise<AxiosResponse<ApiResult<boolean>>> => {
    const formData = new FormData();
    formData.append("menuId", param)
    return AdminAxios.post<ApiResult<boolean>>("/admin/b/sysMenu/delete", formData);
}