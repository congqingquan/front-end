export default class Constants {
    
    // 不需要登陆鉴权的路径
    public static readonly DO_NOT_AUTH_PATHS = [
        "/login"
    ];

    // 用户信息在 localStore 中的 key
    public static readonly LOGINED_USER_INFO_KEY = "USER_INFO";

    // 缓存数据的 key
    public static readonly CACHE_KEY_MENUS = "MENUS";

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
};