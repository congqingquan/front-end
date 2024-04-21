import React, {useState} from 'react';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import {MenuInfo} from "rc-menu/lib/interface";

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('about', '/about', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3', ),
        getItem('Bill', '4', ),
        getItem('Alex', '5', )
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [
        getItem('Team 1', '6', ),
        getItem('Team 2', '8')
    ]),
    getItem('Files', '9', <FileOutlined/>),
];

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    let navigate = useNavigate();
    let [openKeysArr, setOpenKeysArr] = useState(['']);


    // 菜单点击(没有子菜单的被点击菜单会触发该函数)
    const handleClickMenu = (info: MenuInfo) => {
        navigate(info.key);
    };

    // 菜单展开(没有子菜单的被点击菜单不会触发该函数)
    const handleOnOpenChange = (openKeys: string[]) => {
        setOpenKeysArr([openKeys[openKeys.length - 1]]);
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            {/* 左侧边栏 */}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                {/* 左侧logo */}
                <div className="demo-logo-vertical" style={{height: 50}}/>
                {/* 左侧菜单 */}
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    openKeys={openKeysArr}
                    onClick={(event) => handleClickMenu(event)}
                    onOpenChange={(openKeys) => handleOnOpenChange(openKeys)}
                />
            </Sider>
            {/* 右边内容 */}
            <Layout>
                {/* 右边顶部 */}
                <Header style={{padding: 0, background: colorBgContainer}}/>
                {/* 右边内容 */}
                <Content style={{margin: '0 16px'}}>
                    {/* 面包屑 */}
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            width: '100%',
                            height: '100%',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}>
                        {/* Content */}
                        <Outlet />
                    </div>
                </Content>
                {/* 右边底部 */}
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Home;
