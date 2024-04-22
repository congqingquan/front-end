import React, { useState } from 'react';
import { Breadcrumb, Layout, MenuTheme, theme } from 'antd';
import { Location, Outlet, useLocation } from 'react-router-dom';
import HomeMenu from '@/component/HomeMenu';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: 'User' }, { title: 'Bill' }])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 左侧边栏 */}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                {/* 左侧logo */}
                <div className="demo-logo-vertical" style={{ height: 50 }} />
                {/* 左侧菜单 */}
                <HomeMenu></HomeMenu>
            </Sider>
            {/* 右边内容 */}
            <Layout>
                {/* 右边顶部 */}
                <Header style={{ padding: 0, background: colorBgContainer }} />
                {/* 右边内容 */}
                <Content style={{ margin: '0 16px' }}>
                    {/* 面包屑 */}
                    <Breadcrumb style={{margin: '16px 0'}} items={breadCrumbItems}></Breadcrumb>
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
    );
};

export default Home;
