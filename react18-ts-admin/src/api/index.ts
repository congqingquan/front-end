import SysUserLoginDTO from "@/domain/dto/SysUserLoginDTO";
import AdminAxios from "./AxiosExt/AdminAxios";
import SysMenuTreeVO from "@/domain/vo/SysMenuTreeVO";
import SysUserLoginVO from "@/domain/vo/SysUserLoginVO";
import { AxiosResponse } from "axios";
import SysUserAddDTO from "@/domain/dto/SysUserAddDTO";
import SysUserPageVO from "@/domain/vo/SysUserPageVO";
import SysUserUpdateDTO from "@/domain/dto/SysUserUpdateDTO";
import SysUserPageDTO from "@/domain/dto/SysUserPageDTO";

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

    // 主页左侧菜单
    public static sysMenyTree(): Promise<AxiosResponse<ApiResult<SysMenuTreeVO[]>>> {
        return AdminAxios.postJSON<ApiResult<SysMenuTreeVO[]>>("/admin/b/sysMenu/tree", {});
    }

    // 用户管理
    // 1. 新增
    public static addSysUser(param: SysUserAddDTO): Promise<AxiosResponse<ApiResult<boolean>>> {
        return AdminAxios.postJSON<ApiResult<boolean>>("/admin/b/sysUser/add", param);
    }
    // 2. 修改
    public static eidtSysUser(param: SysUserUpdateDTO): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysUser/edit", param);
    }
    // 3. 删除
    public static deleteSysUser(param: string[]): Promise<AxiosResponse<ApiResult<boolean[]>>> {
        return AdminAxios.postJSON<ApiResult<boolean[]>>("/admin/b/sysUser/delete", param);
    }
    // 4. 分页
    public static sysUserPage(param: Partial<SysUserPageDTO & PageDTO>): Promise<AxiosResponse<ApiPageResult<SysUserPageVO>>> {
        return AdminAxios.postJSON<ApiPageResult<SysUserPageVO>>("/admin/b/sysUser/page", param);
    }
}