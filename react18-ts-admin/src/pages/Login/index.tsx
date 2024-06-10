import React, { useEffect, useRef, useState } from "react";
import LoginStyle from "./login.module.scss";
import API from "@/api";
import { RouterTable } from "@/router";
import { useLocation } from "react-router-dom";
import { Form, Input, Spin, message } from "antd";
import Constants from "@/common/Constants";
import SysUserLoginDTO from "@/domain/dto/SysUserLoginDTO";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const Login: React.FC = () => {

    // ==================================== 绑定数据 ====================================

    let [isToLogin, setIsToLogin] = useState(true);
    let topCardBtn = useRef<HTMLButtonElement | null>(null);
    let topCardBox = useRef<HTMLDivElement | null>(null);

    let leftCardBox = useRef<HTMLDivElement | null>(null);
    let rightCardBox = useRef<HTMLDivElement | null>(null);

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

    // 登录表单点击提交
    const handleSubmitLoginForm = async (formValues: SysUserLoginDTO) => {
        const response = await API.sysUserLogin(formValues);
        if (response.data.code === 200) {
            localStorage.setItem(Constants.LOGINED_USER_INFO_KEY, JSON.stringify(response.data.data));
            RouterTable.navigate("/");
        }
    }

    // 加载页面
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    });

    // ==================================== 登录提示 ====================================

    let tip = new URLSearchParams(useLocation().search).get("tip");
    useEffect(() => {
        if (tip) {
            message.error(tip);
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
                        {/* <form onSubmit={(event) => handleSubmitLoginForm(event)}>
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
                        </form> */}
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={handleSubmitLoginForm}
                        >
                            <div className={LoginStyle.title}>登陆</div>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Username" 
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <button>登陆</button>
                        </Form>
                    </div>

                    <div ref={rightCardBox} className={LoginStyle.rightCard}>
                        {/* <form>
                            <div className={LoginStyle.title}>注册账户</div>
                            <div className="tip">请输入注册信息</div>

                            <input type="text" placeholder="Username" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />

                            <button>注册</button>
                        </form> */}

                        <Form
                            name="normal_register"
                            className="register-form"
                            initialValues={{ remember: true }}
                            onFinish={handleSubmitLoginForm}
                        >
                            <div className={LoginStyle.title}>注册账户</div>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Username" 
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    type="email"
                                    placeholder="email"
                                />
                            </Form.Item>
                            <button>注册</button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;