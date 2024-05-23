import React, { useRef, useState } from 'react';
import { Breadcrumb, Layout, MenuTheme, Switch, theme as andTheme } from 'antd';
import { Outlet } from 'react-router-dom';
import HomeMenu from '@/component/HomeMenu';
import IndexStyle from './home.module.scss';
import ReactLogo from '@/assets/picture/react192.png';
import classNames from 'classnames';

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
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsed = (collapsed: boolean) => {
        setCollapsed(collapsed);
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
    }

    // 面包屑
    const [breadCrumbItems,] = useState([{ title: 'User' }, { title: 'Bill' }])
    // 主题
    const [theme, setTheme] = useState<MenuTheme>('dark');
    const changeTheme = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
    };

    return (
        <>
            {/* <Switch onChange={(checked) => changeTheme(checked)}/> */}

            <Layout style={{ minHeight: '100vh' }}>
                {/* 左侧边栏 */}
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => handleCollapsed(value)} theme={theme}>
                    {/* 左侧logo */}
                    <div ref={logoIconBox} className={classNames(logIconBoxClassNames)}>
                        <img src={ReactLogo} />
                    </div>
                    <div ref={logoBox} className={classNames(logBoxClassNames)}>
                        Cortana Admin
                    </div>
                    {/* 左侧菜单 */}
                    <HomeMenu theme={theme}></HomeMenu>
                </Sider>
                {/* 右边内容 */}
                <Layout>
                    {/* 右边顶部 */}
                    <Header style={{ padding: 0, background: colorBgContainer }} />
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

