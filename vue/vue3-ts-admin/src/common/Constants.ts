import Icons from '@/components/Icons';

export default class Constants {
    
    // 不需要登陆鉴权的路径
    public static readonly DO_NOT_AUTH_PATHS = [
        "/login"
    ];

    // HTTP 请求方式
    public static readonly HTTP_METHOD = [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'OPTIONS',
        'HEAD',
        'TRACE'
    ]
    
    // 默认的分页配置
    public static readonly DEFAULT_PAGINATION_CONFIG = {
        current: 1,
        pageSize: 10,
    }

    // ICON
    public static readonly ALL_ICONS = Icons

    // Gender
    public static readonly GENDER_MAPPING: {[key: string]: string} = {
        MAN: '男',
        WOMAN: '女',
        UNKNOWN: '未知',
    }

    // Status
    public static readonly STATUS_MAPPING: {[key: string]: string} = {
        NORMAL: '正常',
        ABNORMAL: '异常',
        ENABLED: '启用',
        DISABLED: '禁用',
        FROZEN: '冻结',
        DELETED: '已删除',
        
        BOUND: '已绑定',
        UNBOUND: '未绑定',
        
        SUCCESS: '成功',
        FAILED: '失败',
        PROCESSING: '处理中',
        COMPLETED: '已完成'
    }

    // 菜单类型
    public static readonly MENU_TYPE_MAPPING: {[key: string]: string} = {
        MENU_DIC: '菜单目录',
        MENU: '菜单',
        MENU_BUTTON: '菜单按钮'
    }

    // Api type
    public static readonly API_TYPE_MAPPING: {[key: string]: string} = {
        USER: '用户管理',
        ROLE: '角色管理',
        MENU: '菜单管理',
        API: '接口管理',
    }
}