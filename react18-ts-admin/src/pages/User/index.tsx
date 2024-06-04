import React, { useEffect, useRef, useState } from 'react';
import { Button, Flex, Form, Input, Select, Space, Table, Tag, Tooltip } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import UserTableRow from '@/domain/model/UserTableRow';
import moment from 'moment';
import { DeleteOutlined, EditOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import UserAddModal from './UserModal';
import API from '@/api';
import SysUserPageDTO from '@/domain/dto/SysUserPageDTO';

const User: React.FC = () => {
    const columns: TableProps['columns'] = [
        {
            title: '主键',
            dataIndex: 'userId',
            key: 'userId'
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
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
            key: 'email'
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
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
            key: 'createTime'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => popupEditUserModal(record)}>
                        {<EditOutlined />} 修改
                    </a>
                    <a onClick={() => handleDelete(record)}>
                        {<DeleteOutlined />} 删除
                    </a>
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
        editRow.current = record;
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

    const handleDelete = (record: UserTableRow) => {
        console.log(record);
    }
    const handleBatchDelete = () => {
        console.log(selectedRowKeys);
    }

    // TODO 搜索
    // TODO 处理表格大小固定，翻页不抖动
    const [searchForm] = Form.useForm<SysUserPageDTO>();
    const handleSubmitSearchForm = () => {
        // API.sysUserPage(searchForm.getFieldsValue()).then(response => {
        //     setData(
        //         response.data.data?.map(user => ({...user, key: user.userId.toString()}))
        //     );
        // });
    };

    // 加载数据

    // 1) 分页配置
    const [paginationConfig, setPaginationConfig] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 1,
        position: ['bottomRight'],
        onChange(pageNo, pageSize) {
            setPaginationConfig({...paginationConfig, current: pageNo, pageSize: pageSize});
        }
    });

    // 2) 加载
    const [data, setData] = useState<UserTableRow[]>([]);
    useEffect(() => {
        API.sysUserPage({ pageNo: paginationConfig.current, pageSize: paginationConfig.pageSize }).then(response => {
            const pageData = response.data.data;
            setData(
                pageData?.records.map(user => ({ ...user, key: user.userId.toString() }))
            );
            setPaginationConfig({...paginationConfig, current: pageData.current, pageSize: pageData.size, total: pageData.total });
        });
    }, [paginationConfig.current, paginationConfig.pageSize]);

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
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
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
                <Button danger onClick={() => handleBatchDelete()}>删除</Button>
            </Space>
        </div>
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
                    hideUserModal();
                }
            }}
        >
            <UserAddModal type={modalType.current} initData={editRow.current} open={open} onCancel={hideUserModal} />
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={ paginationConfig } />
        </Form.Provider>

    </>);
}

export default User;