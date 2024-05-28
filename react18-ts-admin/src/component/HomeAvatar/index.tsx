import { AntDesignOutlined, ExpandOutlined } from '@ant-design/icons';
import { Space, Avatar, Dropdown, MenuProps, Button } from 'antd';
import React from 'react';
import UserUtils, { User } from '@/util/UserUtils';
import HomeAvatarStyle from './home-avatar.module.scss';
import Router from "@/router";

const HomeAvatar: React.FC = () => {
    let user: User | null = UserUtils.getUser();


    const dropdownItems: MenuProps['items'] = [
        {
            key: 'logout',
            label: "登出",
            onClick: _ => {
                UserUtils.logout();
                Router.navigate("/login");
            }
        },
    ];

    return (
        <Dropdown
                menu={{ items: dropdownItems }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
                overlayStyle={{ textAlign: 'center' }}
            >
                <div className={HomeAvatarStyle.avatarBox}>
                    <Avatar icon={<AntDesignOutlined />} shape="square" />
                    <div>{user?.name}</div>
                </div>
            </Dropdown>
    );
};

export default HomeAvatar;
