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
};