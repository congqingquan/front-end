import Router from ".";

// 路由守卫
const RouterAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    // const pathname: string = Router.state.location.pathname;
    // 1. 登陆拦截: 依靠接口响应码实现
    // if (!Constants.DO_NOT_AUTH_PATHS.includes(pathname) && !window.localStorage.getItem(Constants.LOGINED_USER_INFO_KEY)) {
    //     Router.navigate("/login?tip=前端拦截：登录过期，请重新登录");
    // }
    // 2. 权限拦截: 依靠接口响应码实现 
    // const menuItemsMap = Cache.get<Map<string, MenuItem>>(Constants.CACHE_KEY_MENU_ITEMS_MAP);
    // if (menuItemsMap && !menuItemsMap.get(pathname)) {
    //     Router.navigate("/403");
    // }
    return <>{children}</>
}

export default RouterAuth;