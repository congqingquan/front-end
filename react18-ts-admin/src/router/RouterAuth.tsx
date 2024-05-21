import Router from ".";

// 不做路由守卫的路径
const DO_NOT_AUTH_PATHS = [
    "/login"
]

// 路由守卫
const RouterAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    if (!DO_NOT_AUTH_PATHS.includes(Router.state.location.pathname) && !window.localStorage.getItem("AdminToken")) {
        Router.navigate("/login?tip=y");
        return;
    }

    return <>{children}</>
}
export default RouterAuth;