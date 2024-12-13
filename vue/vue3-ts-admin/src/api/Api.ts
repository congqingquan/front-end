import * as SysUserApi from './SysUserApi'
import * as SysRoleApi from './SysRoleApi'
import * as SysResourceApi from './SysResourceApi'
import * as SysMenuApi from './SysMenuApi'
import * as SysApiApi from './SysApiApi'
import * as BDictionaryApi from './BDictionaryApi'

export default {
    ...SysUserApi,
    ...SysRoleApi,
    ...SysResourceApi,
    ...SysMenuApi,
    ...SysApiApi,
    ...BDictionaryApi
}