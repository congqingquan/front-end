import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Space, Table, Tag, Tooltip } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import UserTableRow from '@/domain/model/UserTableRow';
import { DeleteOutlined, EditOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import UserAddModal from './UserModal';
import API from '@/api';
import SysUserPageDTO from '@/domain/dto/SysUserPageDTO';

const User: React.FC = () => {
    const columns: TableProps['columns'] = [
        {
            title: '主键',
            dataIndex: 'userId',
            key: 'userId',
            width: 90
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 50,
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            width: 50,
            render: (text) => <>
                {
                    text === 'MAN'
                        ? <Tag color={'green'} key={'MAN'}>男</Tag>
                        : text === 'WOMAN'
                            ? <Tag color={'volcano'} key={'WOMAN'}>女</Tag>
                            : <Tag color={'blue'} key={'OTHER'}>其他</Tag>
                }
            </>,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 50
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: 50,
            render: (text) => <>
                {
                    text === 'NORMAL' ? <Tag color={'green'} key={'NORMAL'}>正常</Tag> :
                        text === 'DISABLED' ? <Tag color={'red'} key={'DISABLED'}>禁用</Tag> : <Tag color={'red'} key={'UNKNOWN'}>未知</Tag>
                }
            </>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 80,
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Space size="small">
                    <Button type="link" icon={<EditOutlined />} onClick={() => popupEditUserModal(record)}>修改</Button>
                    <Popconfirm
                        title    
                        description="确定是否要删除?"
                        onConfirm={() => handleDelete(record)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button type='link' icon={<DeleteOutlined />} danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // 新增
    const popupAddUserModal = () => {
        editRow.current = undefined;
        modalType.current = 'ADD';
        showUserModal();
    }

    // 编辑
    const editRow = useRef<UserTableRow | undefined>();
    const modalType = useRef<'ADD' | 'UPDATE'>('ADD');

    const [open, setOpen] = useState(false);
    const showUserModal = () => {
        setOpen(true);
    };
    const hideUserModal = () => {
        setOpen(false);
    };

    const popupEditUserModal = (record: UserTableRow) => {
        editRow.current = {...record};
        modalType.current = 'UPDATE';
        showUserModal();
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
        return API.deleteSysUser([record.userId.toString()]).then(_ => loadPageData());
    }
    const handleBatchDelete = async () => {
        return API.deleteSysUser([...selectedRowKeys.map(key => key.toString())]).then(_ => loadPageData());
    }

    // 分页配置
    const [paginationConfig, setPaginationConfig] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        position: ['bottomRight'],
        // 分页改变携带查询条件
        onChange(pageNo, pageSize) {
            setPaginationConfig(prev => ({ ...prev, current: pageNo, pageSize: pageSize }));
        }
    });

    // 搜索: 查询条件不依赖分页条件
    const [searchFormLading, setSearchFormLading] = useState<boolean>(false);
    const [searchForm] = Form.useForm<SysUserPageDTO>();
    const handleSubmitSearchForm = () => {
        setSearchFormLading(true);
        API.sysUserPage({ ...searchForm.getFieldsValue(), pageNo: paginationConfig.current, pageSize: paginationConfig.pageSize })
            .then(response => {
                const pageData = response.data.data;
                setData(
                    pageData?.records.map(user => ({ ...user, key: user.userId.toString() }))
                );
                setPaginationConfig(prev => ({ ...prev, current: pageData.current, pageSize: pageData.size, total: pageData.total }));
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
                    pageData?.records.map(user => ({ ...user, key: user.userId.toString() }))
                );
                setPaginationConfig({ ...paginationConfig, current: pageData.current, pageSize: pageData.size, total: pageData.total });
            });
    }

    return (<>
        <Form
            layout={'inline'}
            form={searchForm}
            style={{ marginBottom: "15px" }}
            onFinish={() => handleSubmitSearchForm()}
        >
            <Form.Item label="姓名" name="name">
                <Input />
            </Form.Item>

            <Form.Item label="邮箱" name="email">
                <Input />
            </Form.Item>

            <Form.Item label="状态" name="status">
                <Select
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
                        <Button type="primary" loading={searchFormLading} htmlType="submit" icon={<SearchOutlined />}/>
                    </Tooltip>
                    <Tooltip title="重置">
                        <Button icon={<RedoOutlined />} onClick={() => searchForm.resetFields()} />
                    </Tooltip>
                </Space>
            </Form.Item>
        </Form>

        <div style={{ marginBottom: "15px" }}>
            <Space>
                <Button type="primary" onClick={() => popupAddUserModal()}>新增</Button>
                <Popconfirm
                    title    
                    description="确定是否要删除?"
                    onConfirm={() => handleBatchDelete()}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button danger>删除</Button>
                </Popconfirm>
            </Space>
        </div>

        {/* 
            使用 Form.Provider 来监听 Modal 中的表单提交，进而触发父组件重新加载分页数据
        */}
        <Form.Provider
            // onFormFinish={(name, { values, forms }) => {
            //     if (name === 'userForm') {
            //         const { basicForm } = forms;
            //         console.log(forms, basicForm, values);
            //         hideUserModal();
            //     }
            // }}
            onFormFinish={(name) => {
                if (name === 'userForm') {
                    loadPageData();
                }
            }}
        >
            <UserAddModal type={modalType.current} initData={editRow.current} open={open} onCancel={hideUserModal} />
        </Form.Provider>
        <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={paginationConfig}
                scroll={{ x: 1000, y: 300 }}
        />
    </>);
}

// TODO1: 后台校验用户名、姓名唯一
// TODO2: 状态开关支持在表格中直接修改
// TODO3: 新增角色字段
export default User;