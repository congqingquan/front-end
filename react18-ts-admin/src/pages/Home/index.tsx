import React, { useRef, useState } from 'react';
import { Avatar, Breadcrumb, Drawer, Dropdown, Layout, MenuProps, MenuTheme, Space, Switch, theme as andTheme } from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import HomeMenu, { HomeMenuRef } from '@/component/HomeMenu';
import IndexStyle from './home.module.scss';
import ReactLogo from '@/assets/picture/react192.png';
import classNames from 'classnames';
import HomeStyle from "./home.module.scss";
import { AntDesignOutlined, FullscreenExitOutlined, FullscreenOutlined, LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import UserUtils, { User } from '@/util/UserUtils';
import Router from '@/router';
import Cache from '@/util/Cache';
import Constants from '@/constants';
import TreeUtils from '@/util/TreeUtils';
import BreadcrumbItem from '@/domain/model/BreadcrumbItem';
import MenuItem from '@/domain/model/MenuItem';

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
            key: 'styleConfig',
            label: "样式配置",
            onClick: _ => showDrawer(),
            icon: <SwapOutlined />
        },
        {
            key: 'logout',
            label: "退出登录",
            onClick: _ => {
                UserUtils.logout();
                Router.navigate("/login");
            },
            icon: <LogoutOutlined />
        }
    ];

    // 全屏
    const [fullscreen, setFullscreen] = useState(false);

    const openFullScreen = () => {
        setFullscreen(true);
        const full = document.documentElement;
        if (full?.requestFullscreen) {
            full.requestFullscreen();
        } else if (full['mozRequestFullScreen']) {
            full['mozRequestFullScreen']();
        } else if (full['webkitRequestFullScreen']) {
            full['webkitRequestFullScreen']();
        } else if (full['msRequestFullscreen']) {
            full['msRequestFullscreen']();
        }
    }

    const exitFullScreen = () => {
        setFullscreen(false);
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document['mozCancelFullScreen']) {
            document['mozCancelFullScreen']();
        } else if (document['webkitExitFullscreen']) {
            document['webkitExitFullscreen']();
        }
        window.close();
    }

    // 面包屑
    const location = useLocation();
    const pathname: string = location.pathname;
    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
    const selectMenuItemCallback: (item: MenuItem) => void = (item) => {
        setBreadcrumbItems(searchBreadcrumnParentNodes(item.key));
    }
    
    const setBreadcrumbByLocation = () => {
        setBreadcrumbItems(searchBreadcrumnParentNodes(pathname));
    }

    const searchBreadcrumnParentNodes = (key: string): BreadcrumbItem[] => {
        const treeNodes = Cache.get<MenuItem[]>(Constants.CACHE_KEY_MENU_ITEMS_TREE);
        if (!treeNodes) {
            return [];
        }
        const parentNodes: MenuItem[] = []
        TreeUtils.breakableForeach(treeNodes, node => node.children ? node.children : [], (paths, menuItem) => {
            if (menuItem.key === key) {
                parentNodes.push(...paths, menuItem);
                return true;
            }
            return false;
        });
        return parentNodes.map(parentNode => {
            return { title: parentNode.menuType === 'MENU' ? <NavLink to={parentNode.key}>{parentNode.label}</NavLink> : parentNode.label };
        });
    }

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
                    <HomeMenu theme={theme}
                        ref={homeMenuRef}
                        collasped={collapsed}
                        selectMenuItemCallback={selectMenuItemCallback}
                        fetchMenuItemsCompleteCallback={setBreadcrumbByLocation}>
                    </HomeMenu>
                </Sider>
                {/* 右边内容 */}
                <Layout>
                    {/* 右边顶部 */}
                    <Header className={HomeStyle.headerBox} style={{ padding: 0, background: colorBgContainer }}>
                        <div className={HomeStyle.headerFullscreanBtnBox}>
                            {
                                fullscreen ?
                                    <FullscreenExitOutlined style={{ fontSize: '23px' }} onClick={() => exitFullScreen()} />
                                    :
                                    <FullscreenOutlined style={{ fontSize: '23px' }} onClick={() => openFullScreen()} />

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
                        <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems}></Breadcrumb>
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
                        Cortana Admin ©{new Date().getFullYear()} Created by QQ.Cong
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default Home;