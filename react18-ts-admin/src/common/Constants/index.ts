export default class Constants {
    
    // 不需要登陆鉴权的路径
    public static readonly DO_NOT_AUTH_PATHS = [
        "/login"
    ];

    // 用户信息在 localStore 中的 key
    public static readonly LOGINED_USER_INFO_KEY = "USER_INFO";

    // 缓存数据的 key
    public static readonly CACHE_KEY_MENUS = "MENUS";
};