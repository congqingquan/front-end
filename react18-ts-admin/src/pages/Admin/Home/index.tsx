import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Breadcrumb, Button, Drawer, Dropdown, FloatButton, Layout, MenuProps, MenuTheme, Space, Spin, Switch, theme as andTheme } from 'antd';
import { Outlet } from 'react-router-dom';
import HomeMenu, { HomeMenuRef } from '@/component/HomeMenu';
import IndexStyle from './home.module.scss';
import ReactLogo from '@/assets/picture/react192.png';
import classNames from 'classnames';
import HomeStyle from "./home.module.scss";
import { AntDesignOutlined, ExpandOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import UserUtils, { User } from '@/util/UserUtils';
import Router from '@/router';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = andTheme.useToken();

    // 左侧边栏塌陷
    const logoBox = useRef<HTMLDivElement | null>(null);
    const [logBoxClassNames, setLogBoxClassNames] = useState({
        [IndexStyle.logoBox]: true,
        [IndexStyle.logoBoxShow]: false,
        [IndexStyle.logoBoxHidden]: false,
    });

    const logoIconBox = useRef<HTMLDivElement | null>(null);
    const [logIconBoxClassNames, setLogIconBoxClassNames] = useState({
        [IndexStyle.logoIconBox]: true,
        [IndexStyle.logoIconBoxShow]: false,
        [IndexStyle.logoIconBoxHidden]: false,
    });
    let homeMenuRef = useRef<HomeMenuRef>(null);
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = (collapsed: boolean) => {
        setLogBoxClassNames(prev => ({
            ...prev,
            [IndexStyle.logoBoxShow]: !collapsed,
            [IndexStyle.logoBoxHidden]: collapsed
        }));
        setLogIconBoxClassNames(prev => ({
            ...prev,
            [IndexStyle.logoIconBoxShow]: collapsed,
            [IndexStyle.logoIconBoxHidden]: !collapsed
        }));

        setCollapsed(collapsed);

        // 测试父组件调用子组件
        if (!collapsed) {
            homeMenuRef.current?.toggleCollapsedCallback();
        }
    }

    // 面包屑
    const [breadCrumbItems,] = useState([{ title: 'User' }, { title: 'Bill' }])

    // 主题
    const [theme, setTheme] = useState<MenuTheme>('dark');
    const changeTheme = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
        if (checked) {
            logoBox.current!.style.color = 'white'
        } else {
            logoBox.current!.style.color = 'rgba(0, 0, 0, 0.75)'
        }
    };

    // 抽屉
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    // 头像
    let user: User | null = UserUtils.getUser();
    const dropdownItems: MenuProps['items'] = [
        {
            key: 'logout',
            label: "退出登录",
            onClick: _ => {
                UserUtils.logout();
                Router.navigate("/login");
            }
        }, {
            key: 'changeTheme',
            label: "切换主题",
            onClick: _ => showDrawer()
        },
    ];

    // 全屏
    const [fullscreen, setFullscreen] = useState(false);
    function handleFullscreen(state: boolean): void {
        // TODO: 设置全屏
        setFullscreen(state);
    }

    // 加载页面
    // let [loading, setLoading] = useState(false);
    // <Spin spinning={loading} fullscreen></Spin>

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                {/* 左侧边栏 */}
                <Sider collapsible collapsed={collapsed} theme={theme} onCollapse={() => toggleCollapsed(!collapsed)}>
                    {/* 左侧logo */}
                    <div ref={logoIconBox} className={classNames(logIconBoxClassNames)}>
                        <img src={ReactLogo} />
                    </div>
                    <div ref={logoBox} className={classNames(logBoxClassNames)}>
                        Cortana Admin
                    </div>
                    {/* 左侧菜单 */}
                    <HomeMenu theme={theme} ref={homeMenuRef} collasped={collapsed}></HomeMenu>
                </Sider>
                {/* 右边内容 */}
                <Layout>
                    {/* 右边顶部 */}
                    <Header className={HomeStyle.headerBox} style={{ padding: 0, background: colorBgContainer }}>
                        <div className={HomeStyle.headerFullscreanBtnBox}>
                            {
                                fullscreen ?
                                    <FullscreenOutlined style={{ fontSize: '28px' }} onClick={() => handleFullscreen(!fullscreen)} />
                                    :
                                    <FullscreenExitOutlined style={{ fontSize: '28px' }} onClick={() => handleFullscreen(!fullscreen)} />
                            }
                        </div>
                        <Drawer onClose={onClose} open={open}>
                            <Space>
                                <p>主题风格</p>
                                <Switch onChange={(checked) => changeTheme(!checked)} />
                            </Space>
                        </Drawer>
                        <Dropdown
                            menu={{ items: dropdownItems }}
                            placement="bottom"
                            arrow={{ pointAtCenter: true }}
                            overlayStyle={{ textAlign: 'center' }}
                        >
                            <div className={HomeStyle.avatarBox}>
                                <Avatar icon={<AntDesignOutlined />} shape="square" />
                                <div>{user?.name}</div>
                            </div>
                        </Dropdown>
                    </Header>
                    {/* 右边内容 */}
                    <Content style={{ margin: '0 16px' }}>
                        {/* 面包屑 */}
                        <Breadcrumb style={{ margin: '16px 0' }} items={breadCrumbItems}></Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                width: '100%',
                                height: '100%',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}>
                            <Outlet />
                        </div>
                    </Content>
                    {/* 右边底部 */}
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default Home;