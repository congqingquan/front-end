import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import {Menu, type MenuProps, MenuTheme} from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type HomeMenuProps = {
    theme: MenuTheme
}

const HomeMenu: React.FC<HomeMenuProps> = (props: HomeMenuProps) => {

    // 表示：MenuItem 为 MenuProps 类型的 items 数组属性中的元素的类型
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            label: "About",
            key: "/about",
            icon: <PieChartOutlined />,
        },
        {
            label: "Dashboard",
            key: "/dashboard",
            icon: <PieChartOutlined />,
        },
        {
            label: "Page1",
            key: "/page1",
            icon: <DesktopOutlined />,
            children: [
                {
                    label: "Page1-1",
                    key: "/page1/page11",
                    icon: <DesktopOutlined />,
                },
                {
                    label: "Page1-2",
                    key: "/page1/page12",
                    icon: <DesktopOutlined />,
                }
            ]
        },
        {
            label: "Page2",
            key: "/page2",
            icon: <DesktopOutlined />,
            children: [
                {
                    label: "Page2-1",
                    key: "/page2/page21",
                    icon: <DesktopOutlined />,
                },
                {
                    label: "Page2-2",
                    key: "/page2/page22",
                    icon: <DesktopOutlined />,
                }
            ]
        },
    ];

    // 根据路由选中菜单
    const location = useLocation();
    // 根据路由展开菜单
    let pathname: string = location.pathname;
    let defaultOpenKey: string = '';
    itemsLoop: for (let i = 0; i < items.length; i++) {
        const root: ItemType = items[i];
        if (!root) {
            continue;
        }

        let stack: Array<ItemType> = [root];
        
        while (stack.length > 0) {
            let item: ItemType = stack.pop() as ItemType;
            if (!item || !item.hasOwnProperty("children") || item['children'].length <= 0) {
                continue itemsLoop;
            }
            let children: MenuItem[] = item['children'] as MenuItem[];
            if (children.find(mi => mi?.key === pathname)) {
                defaultOpenKey = item.key as string
                break itemsLoop;
            }
            children.forEach(c => stack.push(c));
        }
    }
    console.log("defaultOpenKey: " + defaultOpenKey);

    // 菜单点击 (点击没有子菜单的菜单会触发)
    const navigate = useNavigate();
    const handleClickMenu: (event: { key: string }) => void = (event: { key: string }) => {
        navigate(event.key);
    };

    // 菜单展开 (点击有子菜单的菜单会触发)
    const [openKeysArr, setOpenKeysArr] = useState([defaultOpenKey]);
    const handleOnOpenChange = (openKeys: string[]) => {
        setOpenKeysArr([openKeys[openKeys.length - 1]]);
    };
    return (
        <Menu
            theme={props.theme}
            mode="inline"
            items={items}
            defaultSelectedKeys={[pathname]}
            openKeys={openKeysArr}
            onClick={(event) => handleClickMenu(event)}
            onOpenChange={(openKeys) => handleOnOpenChange(openKeys)}
        />
    );
}

export default HomeMenu;