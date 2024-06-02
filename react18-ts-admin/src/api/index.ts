import SysUserLoginDTO from "@/domain/dto/SysUserLoginDTO";
import AdminAxios, { ApiResult } from "./AxiosExt/AdminAxios";
import SysMenuTreeVO from "@/domain/vo/SysMenuTreeVO";
import SysUserLoginVO from "@/domain/vo/SysUserLoginVO";
import { AxiosResponse } from "axios";

export default class API {

    // 登录鉴权
    public static sysUserLogin(param: SysUserLoginDTO): Promise<AxiosResponse<ApiResult<SysUserLoginVO>>> {
        return AdminAxios.postJSON<ApiResult<SysUserLoginVO>>("/admin/b/sysUser/login", param);
    }

    // 左侧菜单
    public static sysMenyTree(): Promise<AxiosResponse<ApiResult<SysMenuTreeVO[]>>> {
        return AdminAxios.postJSON<ApiResult<SysMenuTreeVO[]>>("/admin/b/sysMenu/tree", {});
    }
}