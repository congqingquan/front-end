import SysUserViewVO from "./SysUserViewVO"

export default interface SysUserLoginVO {
    tenantId: string,
    token: string  
    info: SysUserViewVO
}