import React, { useEffect, useRef, useState } from "react";
import LoginStyle from "./login.module.scss";
import API from "@/api";
import Router from "@/router";
import { useLocation } from "react-router-dom";
import { Spin, message } from "antd";
import Constants from "@/constants";
import SysUserLoginDTO from "@/domain/dto/SysUserLoginDTO";

const Login: React.FC = () => {

    // ==================================== 绑定数据 ====================================

    let [isToLogin, setIsToLogin] = useState(true);
    let topCardBtn = useRef<HTMLButtonElement | null>(null);
    let topCardBox = useRef<HTMLDivElement | null>(null);

    let leftCardBox = useRef<HTMLDivElement | null>(null);
    let rightCardBox = useRef<HTMLDivElement | null>(null);

    let [loginFormData, setLoginFormData] = useState<SysUserLoginDTO>({
        username: '',
        password: ''
    })

    // ==================================== 函数 ====================================

    // 处理点击切换登录、注册页
    const handleTopCardClick: (isToLogin: boolean) => void = (isToLoginFlag) => {
        topCardBox.current!.classList.remove(LoginStyle.topCard2Login, LoginStyle.topCard2Register);
        leftCardBox.current!.classList.remove(LoginStyle.leftCardShow, LoginStyle.leftCardHidden);
        rightCardBox.current!.classList.remove(LoginStyle.rightCardShow, LoginStyle.rightCardHidden);

        if (isToLoginFlag) {
            topCardBtn.current!.innerHTML = "注册"
            topCardBox.current!.classList.add(LoginStyle.topCard2Login)
            leftCardBox.current!.classList.add(LoginStyle.leftCardShow)
            rightCardBox.current!.classList.add(LoginStyle.rightCardHidden)
        } else {
            topCardBtn.current!.innerHTML = "登录"
            topCardBox.current!.classList.add(LoginStyle.topCard2Register)
            leftCardBox.current!.classList.add(LoginStyle.leftCardHidden)
            rightCardBox.current!.classList.add(LoginStyle.rightCardShow)
        }

        setIsToLogin(isToLoginFlag);
    }

    // 监听登录表单字段值改变
    const handleLoginFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        setLoginFormData(prevState => ({ ...prevState, [name]: value }))
    }

    // 登录表单点击提交
    const handleSubmitLoginForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        API.sysUserLogin(loginFormData).then(response => {
            if (response.data.code === 200) {
                localStorage.setItem(Constants.LOGINED_USER_INFO_KEY, JSON.stringify(response.data.data))
                Router.navigate("/")
            }
        })
    }

    // 加载页面
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    });

    // ==================================== 登录提示 ====================================

    let tip = new URLSearchParams(useLocation().search).get("tip");
    useEffect(() => {
        if (tip === 'y') {
            message.error('前端拦截：登录过期，请先登录');
        }
    }, [tip]);

    return (
        <>
            <Spin spinning={loading} fullscreen />
            <div className={LoginStyle.loginPage}>
                <div className={LoginStyle.container}>
                    <div ref={topCardBox} className={LoginStyle.topCard}>
                        <div className={LoginStyle.topCardTitle}>你好~</div>
                        <div className="top-card-content">请登录或注册新账号，以使用网站的所有功能</div>
                        <button ref={topCardBtn} className={LoginStyle.topCardButton} onClick={() => handleTopCardClick(!isToLogin)}>注册</button>
                    </div>

                    <div ref={leftCardBox} className={LoginStyle.leftCard}>
                        <form onSubmit={(event) => handleSubmitLoginForm(event)}>
                            <div className={LoginStyle.title}>登陆</div>
                            <div className="tip">请输入登陆信息</div>

                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={loginFormData.username}
                                onChange={(event) => handleLoginFormChange(event)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={loginFormData.password}
                                onChange={(event) => handleLoginFormChange(event)}
                            />

                            <button>登陆</button>
                        </form>
                    </div>

                    <div ref={rightCardBox} className={LoginStyle.rightCard}>
                        <form>
                            <div className={LoginStyle.title}>注册账户</div>
                            <div className="tip">请输入注册信息</div>

                            <input type="text" placeholder="Username" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />

                            <button>注册</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;