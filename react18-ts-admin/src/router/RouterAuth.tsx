import Router from ".";
import Constants from "@/constants"

// 路由守卫
const RouterAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    if (!Constants.DO_NOT_AUTH_PATHS.includes(Router.state.location.pathname) && !window.localStorage.getItem(Constants.LOGINED_USER_INFO_KEY)) {
        Router.navigate("/login?tip=y");
    }
    return <>{children}</>
}
export default RouterAuth;