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
import SysMenuTreeDTO from "@/util/services/SysMenuTreeDTO";
import SysResourcePageDTO from "@/domain/dto/SysResourcePageDTO";
import SysResourcePageVO from "@/domain/vo/SysResourcePageVO";
import SysResourceAddDTO from "@/domain/dto/SysResourceAddDTO";
import SysResourceUpdateDTO from "@/domain/dto/SysResourceUpdateDTO";

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
        return AdminAxios.postJSON<ApiResult<SysUserLoginVO>>("/admin/b/sysUser/login", param);
    }


    // 用户管理
    // 1. 分页
    public static sysUserPage(param: Partial<SysUserPageDTO>): Promise<AxiosResponse<ApiPageResult<SysUserPageVO>>> {
        return AdminAxios.postJSON<ApiPageResult<SysUserPageVO>>("/admin/b/sysUser/page", param);
    }
    // 2. 新增
    public static addSysUser(param: SysUserAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysUser/add", param);
    }
    // 3. 修改
    public static eidtSysUser(param: Partial<SysUserUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysUser/edit", param);
    }
    // 4. 删除
    public static deleteSysUser(param: string[]): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysUser/delete", param);
    }

    // 角色管理
    // 1.分页
    public static sysRolePage(param: Partial<SysRolePageDTO>): Promise<AxiosResponse<ApiPageResult<SysRolePageVO>>> {
        return AdminAxios.postJSON<ApiPageResult<SysRolePageVO>>("/admin/b/sysRole/page", param);
    }
     // 2. 新增
     public static addSysRole(param: SysRoleAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysRole/add", param);
    }
    // 3. 修改
    public static eidtSysRole(param: Partial<SysRoleUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysRole/edit", param);
    }
    // 4. 删除
    public static deleteSysRole(param: string[]): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysRole/delete", param);
    }

    // 资源管理
    // 1.分页
    public static sysResourcePage(param: Partial<SysResourcePageDTO>): Promise<AxiosResponse<ApiPageResult<SysResourcePageVO>>> {
        return AdminAxios.postJSON<ApiPageResult<SysResourcePageVO>>("/admin/b/sysResource/page", param);
    }
     // 2. 新增
     public static addSysResource(param: SysResourceAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysResource/add", param);
    }
    // 3. 修改
    public static eidtSysResource(param: Partial<SysResourceUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysResource/edit", param);
    }
    // 4. 删除
    public static deleteSysResource(param: string[]): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysResource/delete", param);
    }

    // 菜单管理
    // 1. 菜单管理树查询 & 主页左侧菜单
    public static sysMenuTree(param: Partial<SysMenuTreeDTO>): Promise<AxiosResponse<ApiResult<SysMenuTreeVO[]>>> {
        return AdminAxios.postJSON<ApiResult<SysMenuTreeVO[]>>("/admin/b/sysMenu/tree", param);
    }
     // 2. 新增
     public static addSysMenu(param: SysMenuAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysRole/add", param);
    }
    // 3. 修改
    public static eidtSysMenu(param: Partial<SysMenuUpdateDTO>): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysRole/edit", param);
    }
    // 4. 删除
    public static deleteSysMenu(param: string[]): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysRole/delete", param);
    }
}