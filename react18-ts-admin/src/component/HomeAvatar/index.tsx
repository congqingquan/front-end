import { AntDesignOutlined } from "@ant-design/icons";
import { Row, Col, Space, Avatar } from "antd";
import React from "react";
import Constants from "@/constants";
import UserUtils, { User } from "@/util/UserUtils";

const HomeAvatar: React.FC = () => {
    
    let user: User | null = UserUtils.getUser();

    return (
        <Row >
            <Col span={24} offset={22}>
                <Space>
                    <Avatar icon={<AntDesignOutlined />} />
                    {user?.name}
                </Space>
            </Col>
        </Row>
    );
}

export default HomeAvatar;