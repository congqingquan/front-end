import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Space, Switch, Table, Tooltip } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import UserTableRow from '@/domain/model/UserTableRow';
import { DeleteOutlined, EditOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import UserModal from './UserModal';
import API from '@/api';
import SysUserPageDTO from '@/domain/dto/SysUserPageDTO';
import SysRoleViewVO from '@/domain/vo/SysRoleViewVO';
import Constants from '@/common/Constants';
import MenuButtonIdentifiers from '@/common/Constants/ResourceIdentifiers';
import MenuContext from '@/context/MenuContext';
import { MenuContextData } from '@/common/Type';
import ResourceController from '@/component/ResourceController';
import ResourceIdentifiers from '@/common/Constants/ResourceIdentifiers';

const User: React.FC = () => {

    const menuContextData = useContext<MenuContextData>(MenuContext);

    const columns: TableProps['columns'] = [
        {
            title: '主键',
            dataIndex: 'userId',
            key: 'userId',
            width: 70
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width: 70,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 70,
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            width: 70,
            render: (text) => text === 'MAN' ? '男' : text === 'WOMAN' ? '女' : '未知',
        },
        {
            title: '角色',
            dataIndex: 'roles',
            key: 'roles',
            width: 70,
            render: (roles: SysRoleViewVO[]) => roles.map(role => role.name).join(" / ")
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 70
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: 70,
            render: (text, record: UserTableRow) => (
                <ResourceController identifier={MenuButtonIdentifiers.USER_EDIT}>
                    <Switch
                        // 通过 key 解决 defaultChecked 二次赋值不生效问题, 默认值会被视为 useState 的默认值，只有第一次修改才会生效
                        key={text}
                        checkedChildren="启用"
                        unCheckedChildren="禁用"
                        defaultChecked={text === 'NORMAL'}
                        onChange={(checked: boolean) => {
                            API.eidtSysUser({ userId: record.userId, status: checked ? 'NORMAL' : 'DISABLED' });
                            record.status = checked ? 'NORMAL' : 'DISABLED';
                        }}
                    />
                </ResourceController>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 70,
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Space size="small">
                    <ResourceController identifier={MenuButtonIdentifiers.USER_EDIT}>
                        <Button type="link" icon={<EditOutlined />} onClick={() => popupEditModal(record)}>修改</Button>
                    </ResourceController>
                    <ResourceController identifier={MenuButtonIdentifiers.USER_DELETE}>
                        <Popconfirm
                            title
                            description="确定是否要删除?"
                            onConfirm={() => handleDelete(record)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type='link' icon={<DeleteOutlined />} danger>删除</Button>
                        </Popconfirm>
                    </ResourceController>
                </Space>
            ),
        },
    ];

    // 新增
    const popupAddModal = () => {
        editRow.current = undefined;
        modalType.current = 'ADD';
        showModal();
    }

    // 编辑
    const editRow = useRef<UserTableRow | undefined>();
    const modalType = useRef<'ADD' | 'UPDATE'>('ADD');

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const popupEditModal = (record: UserTableRow) => {
        editRow.current = { ...record };
        modalType.current = 'UPDATE';
        showModal();
    }

    // 删除
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleDelete = async (record: UserTableRow) => {
        return API.deleteSysUser([record.userId]).then(_ => {
            loadPageData();
            setPaginationConfig(prev => ({ ...prev, ...Constants.DEFAULT_PAGINATION_CONFIG }));
        });
    }
    const handleBatchDelete = async () => {
        return API.deleteSysUser([...selectedRowKeys.map(key => key.toString())]).then(_ => {
            loadPageData();
            setPaginationConfig(prev => ({ ...prev, ...Constants.DEFAULT_PAGINATION_CONFIG }));
        });
    }

    // 分页配置
    const [paginationConfig, setPaginationConfig] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        position: ['bottomRight'],
        onChange(pageNo, pageSize) {
            setPaginationConfig(prev => ({ ...prev, current: pageNo, pageSize: pageSize }));
        }
    });

    // 搜索: 查询条件不依赖分页条件
    const [searchFormLading, setSearchFormLading] = useState<boolean>(false);
    const [searchForm] = Form.useForm<SysUserPageDTO>();
    const handleSubmitSearchForm = () => {
        setSearchFormLading(true);
        API.sysUserPage({ ...searchForm.getFieldsValue(), pageNo: Constants.DEFAULT_PAGINATION_CONFIG.current, pageSize: Constants.DEFAULT_PAGINATION_CONFIG.pageSize })
            .then(response => {
                const pageData = response.data.data;
                if (pageData) {
                    setData(
                        pageData.records.map(user => ({ ...user, key: user.userId }))
                    );
                    setPaginationConfig(prev => ({ ...prev, current: pageData.current, pageSize: pageData.size, total: pageData.total }));
                }
                setSearchFormLading(false);
            });
    };

    // 加载数据
    const [data, setData] = useState<UserTableRow[]>([]);
    useEffect(() => {
        loadPageData();
    }, [paginationConfig.current, paginationConfig.pageSize]);

    const loadPageData = () => {
        API.sysUserPage({ ...searchForm.getFieldsValue(), pageNo: paginationConfig.current, pageSize: paginationConfig.pageSize })
            .then(response => {
                const pageData = response.data.data;
                setData(
                    pageData?.records.map(user => ({ ...user, key: user.userId }))
                );
                setPaginationConfig({ ...paginationConfig, current: pageData.current, pageSize: pageData.size, total: pageData.total });
            });
    }

    return (<>
        <ResourceController identifier={ResourceIdentifiers.USER_PAGE}>
            <Form
                layout={'inline'}
                form={searchForm}
                style={{ marginBottom: "15px" }}
                onFinish={() => handleSubmitSearchForm()}
            >
                <Form.Item label="姓名" name="name">
                    <Input placeholder='请输入搜索姓名' />
                </Form.Item>

                <Form.Item label="邮箱" name="email">
                    <Input placeholder='请输入搜索邮箱' />
                </Form.Item>

                <Form.Item label="状态" name="status">
                    <Select
                        placeholder="请输入搜索状态"
                        style={{ minWidth: 90 }}
                        allowClear
                        options={[
                            { value: 'NORMAL', label: '正常' },
                            { value: 'DISABLED', label: '禁用' }
                        ]}
                    />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Tooltip title="搜索">
                            <Button type="primary" loading={searchFormLading} htmlType="submit" icon={<SearchOutlined />} />
                        </Tooltip>
                        <Tooltip title="重置">
                            <Button icon={<RedoOutlined />} onClick={() => searchForm.resetFields()} />
                        </Tooltip>
                    </Space>
                </Form.Item>
            </Form>
        </ResourceController>

        <div style={{ marginBottom: "15px" }}>
            <Space>
                <ResourceController identifier={MenuButtonIdentifiers.USER_ADD}>
                    <Button type="primary" onClick={() => popupAddModal()}>新增</Button>
                </ResourceController>
                <ResourceController identifier={MenuButtonIdentifiers.USER_DELETE}>
                    <Popconfirm
                        title
                        description="确定是否要删除?"
                        onConfirm={() => handleBatchDelete()}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button danger>删除</Button>
                    </Popconfirm>
                </ResourceController>
            </Space>
        </div>

        {/* 
            错误示范：使用 Form.Provider 来监听 Modal 中的表单提交，进而触发父组件重新加载分页数据
            因为 modal 中的修改请求是异步的，导致与 loadPageData 最终执行顺序不是严格先后的。
        */}
        {/*         
        <Form.Provider
            // onFormFinish={(name, { values, forms }) => {
            //     if (name === 'userForm') {
            //         const { basicForm } = forms;
            //         console.log(forms, basicForm, values);
            //         hideModal();
            //     }
            // }}
            onFormFinish={(name) => {
                console.log(name);
                
                if (name === 'userForm') {
                    loadPageData();
                }
            }}
        >
            <UserModal type={modalType.current} initData={editRow.current} open={open} onCancel={hideModal} />
        </Form.Provider> 
        */}
        <UserModal
            type={modalType.current}
            initData={editRow.current}
            open={open}
            onConfirm={() => {
                hideModal();
                loadPageData();
            }}
            onCancel={hideModal}
        />
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={paginationConfig}
            scroll={{ x: 1200, y: 500 }}
        />
    </>);
}

export default User;