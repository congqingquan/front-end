import SysUserLoginDTO from "@/domain/dto/SysUserLoginDTO";
import AdminAxios from "./AxiosExt/AdminAxios";
import SysMenuTreeVO from "@/domain/vo/SysMenuTreeVO";
import SysUserLoginVO from "@/domain/vo/SysUserLoginVO";
import { AxiosResponse } from "axios";
import SysUserAddDTO from "@/domain/dto/SysUserAddDTO";
import SysUserPageVO from "@/domain/vo/SysUserPageVO";
import SysUserUpdateDTO from "@/domain/dto/SysUserUpdateDTO";
import SysUserPageDTO from "@/domain/dto/SysUserPageDTO";
import SysRolePageDTO from "@/domain/dto/SysRolePageDTO";
import SysRolePageVO from "@/domain/vo/SysRolePageVO";
import SysRoleAddDTO from "@/domain/dto/SysRoleAddDTO";
import SysRoleUpdateDTO from "@/domain/dto/SysRoleUpdateDTO";
import SysMenuAddDTO from "@/domain/dto/SysMenuAddDTO";
import SysMenuUpdateDTO from "@/domain/dto/SysMenuUpdateDTO";
import SysMenuTreeDTO from "@/domain/dto/SysMenuTreeDTO";
import SysResourcePageDTO from "@/domain/dto/SysResourcePageDTO";
import SysResourcePageVO from "@/domain/vo/SysResourcePageVO";
import SysResourceAddDTO from "@/domain/dto/SysResourceAddDTO";
import SysResourceUpdateDTO from "@/domain/dto/SysResourceUpdateDTO";
import SysMenuUpdateStatusDTO from "@/domain/dto/SysMenuUpdateStatusDTO";
import SysApiPageDTO from "@/domain/dto/SysApiPageDTO";
import SysApiPageVO from "@/domain/vo/SysApiPageVO";
import SysApiAddDTO from "@/domain/dto/SysApiAddDTO";
import SysApiUpdateDTO from "@/domain/dto/SysApiUpdateDTO";
import SysApiUpdateStatusDTO from "@/domain/dto/SysApiUpdateStatusDTO";
import SysApiGroupByTypeVO from "@/domain/vo/SysApiGroupByTypeVO";

// 接口入、出参通用结构类型
export type PageVO<D> = {
    current: number,
    size: number,
    records: D[],
    pages: number,
    total: number
}

export interface PageDTO {
    pageNo: number,
    pageSize: number
}

export type ApiResult<D> = {
    code: number,
    data: D,
    message: string
}

export type ApiPageResult<D> = ApiResult<PageVO<D>>

export default class API {

    // 登录鉴权
    public static sysUserLogin(param: SysUserLoginDTO): Promise<AxiosResponse<ApiResult<SysUserLoginVO>>> {
        return AdminAxios.postJSON<ApiResult<SysUserLoginVO>>("/b/sys-user/login", param);
    }


    // 用户管理
    // 1. 分页
    public static sysUserPage(param: Partial<SysUserPageDTO>): Promise<AxiosResponse<ApiPageResult<SysUserPageVO>>> {
        return AdminAxios.postJSON<ApiPageResult<SysUserPageVO>>("/b/sys-user/page", param);
    }
    // 2. 新增
    public static addSysUser(param: SysUserAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-user/add", param);
    }
    // 3. 修改
    public static eidtSysUser(param: Partial<SysUserUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-user/edit", param);
    }
    // 4. 删除
    public static deleteSysUser(param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-user/delete", param);
    }

    // 角色管理
    // 1.分页
    public static sysRolePage(param: Partial<SysRolePageDTO>): Promise<AxiosResponse<ApiPageResult<SysRolePageVO>>> {
        return AdminAxios.postJSON<ApiPageResult<SysRolePageVO>>("/b/sys-role/page", param);
    }
     // 2. 新增
     public static addSysRole(param: SysRoleAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-role/add", param);
    }
    // 3. 修改
    public static eidtSysRole(param: Partial<SysRoleUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-role/edit", param);
    }
    // 4. 删除
    public static deleteSysRole(param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-role/delete", param);
    }

    // 资源管理
    // 1.分页
    public static sysResourcePage(param: Partial<SysResourcePageDTO>): Promise<AxiosResponse<ApiPageResult<SysResourcePageVO>>> {
        return AdminAxios.postJSON<ApiPageResult<SysResourcePageVO>>("/b/sys-resource/page", param);
    }
     // 2. 新增
     public static addSysResource(param: SysResourceAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-resource/add", param);
    }
    // 3. 修改
    public static eidtSysResource(param: Partial<SysResourceUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-resource/edit", param);
    }
    // 4. 删除
    public static deleteSysResource(param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-resource/delete", param);
    }

    // 菜单管理
    // 1. 菜单管理树查询 & 主页左侧菜单
    public static sysMenuTree(param: Partial<SysMenuTreeDTO>): Promise<AxiosResponse<ApiResult<SysMenuTreeVO[]>>> {
        return AdminAxios.postJSON<ApiResult<SysMenuTreeVO[]>>("/b/sys-menu/tree", param);
    }
     // 2. 新增
     public static addSysMenu(param: SysMenuAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-menu/add", param);
    }
    // 3. 修改
    public static eidtSysMenu(param: Partial<SysMenuUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-menu/edit", param);
    }
    public static updateSysMenuStatus(param: SysMenuUpdateStatusDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-menu/update-status", param);
    }
    // 4. 删除
    public static deleteSysMenu(param: string): Promise<AxiosResponse<ApiResult<boolean>>> {
        const formData = new FormData();
        formData.append("menuId", param)
        return AdminAxios.post<ApiResult<boolean>>("/b/sys-menu/delete", formData);
    }

    // 接口管理
    // 1. 查询
    // 1.1) 分页
    public static sysApiPage(param: Partial<SysApiPageDTO>): Promise<AxiosResponse<ApiPageResult<SysApiPageVO>>> {
        return AdminAxios.postJSON<ApiPageResult<SysApiPageVO>>("/b/sys-api/page", param);
    }
    // 1.2) 类别分组查询
    public static sysApiGroupByType(): Promise<AxiosResponse<ApiResult<SysApiGroupByTypeVO[]>>> {
        return AdminAxios.postJSON<ApiResult<SysApiGroupByTypeVO[]>>("/b/sys-api/group-by-type");
    }
     // 2. 新增
     public static addSysApi(param: SysApiAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-api/add", param);
    }
    // 3. 修改
    public static eidtSysApi(param: Partial<SysApiUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-api/edit", param);
    }
    public static updateSysApiStatus(param: SysApiUpdateStatusDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-api/update-status", param);
    }
    // 4. 删除
    public static deleteSysApi(param: string[]): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/b/sys-api/delete", param);
    }
}