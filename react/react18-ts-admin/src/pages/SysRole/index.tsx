import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Space, Switch, Table, Tag, Tooltip } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import API from '@/api';
import RoleTableRow from '@/domain/model/RoleTableRow';
import RoleModal from './RoleModal';
import SysRolePageDTO from '@/domain/dto/SysRolePageDTO';
import Constants from '@/common/Constants';

const Role: React.FC = () => {
    const columns: TableProps['columns'] = [
        {
            title: '主键',
            dataIndex: 'roleId',
            key: 'roleId',
            width: 70
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 70,
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width: 70,
        },
        {
            title: '菜单资源',
            dataIndex: 'menuResources',
            key: 'menuResources',
            width: 70,
            ellipsis: {
                showTitle: false
            },
            render: (_, record: RoleTableRow) => (
                <Tooltip placement="topLeft" title={(record.menuResources || []).map(resource => resource.name).join(" / ")}>
                    {(record.menuResources || []).map(resource => resource.name).join(" / ")}
                </Tooltip>
            )
        },
        {
            title: '接口资源',
            dataIndex: 'apiResources',
            key: 'apiResources',
            width: 70,
            ellipsis: {
                showTitle: false
            },
            render: (_, record: RoleTableRow) => (
                <Tooltip placement="topLeft" title={(record.apiResources || []).map(resource => resource.name).join(" / ")}>
                    {(record.apiResources || []).map(resource => resource.name).join(" / ")}
                </Tooltip>
            )
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: 70,
            render: (text, record: RoleTableRow) => (
                <Switch
                    key={text}
                    checkedChildren="启用"
                    unCheckedChildren="禁用"
                    defaultChecked={text === 'NORMAL'}
                    onChange={(checked: boolean) => {
                        API.eidtSysRole({ roleId: record.roleId, status: checked ? 'NORMAL' : 'DISABLED' });
                        record.status = checked ? 'NORMAL' : 'DISABLED';
                    }}
                />
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
                    <Button type="link" icon={<EditOutlined />} onClick={() => popupEditModal(record)}>修改</Button>
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
    const popupAddModal = () => {
        editRow.current = undefined;
        modalType.current = 'ADD';
        showModal();
    }

    // 编辑
    const editRow = useRef<RoleTableRow | undefined>();
    const modalType = useRef<'ADD' | 'UPDATE'>('ADD');

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const popupEditModal = (record: RoleTableRow) => {
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

    const handleDelete = async (record: RoleTableRow) => {
        return API.deleteSysRole([record.roleId]).then(_ => {
            loadPageData();
            setPaginationConfig(prev => ({ ...prev, ...Constants.DEFAULT_PAGINATION_CONFIG }));
        });
    }
    const handleBatchDelete = async () => {
        return API.deleteSysRole([...selectedRowKeys.map(key => key.toString())]).then(_ => {
            loadPageData();
            setPaginationConfig(prev => ({ ...prev, ...Constants.DEFAULT_PAGINATION_CONFIG }));
        });
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
    const [searchForm] = Form.useForm<SysRolePageDTO>();
    const handleSubmitSearchForm = () => {
        setSearchFormLading(true);
        API.sysRolePage({ ...searchForm.getFieldsValue(), pageNo: Constants.DEFAULT_PAGINATION_CONFIG.current, pageSize: Constants.DEFAULT_PAGINATION_CONFIG.pageSize })
            .then(response => {
                const pageData = response.data.data;
                if (pageData) {
                    setData(
                        pageData.records.map(role => ({ ...role, key: role.roleId }))
                    );
                    setPaginationConfig(prev => ({ ...prev, current: pageData.current, pageSize: pageData.size, total: pageData.total }));
                }
                setSearchFormLading(false);
            });
    };

    // 加载数据
    const [data, setData] = useState<RoleTableRow[]>([]);
    useEffect(() => {
        loadPageData();
    }, [paginationConfig.current, paginationConfig.pageSize]);

    const loadPageData = () => {
        API.sysRolePage({ ...searchForm.getFieldsValue(), pageNo: paginationConfig.current, pageSize: paginationConfig.pageSize })
            .then(response => {
                const pageData = response.data.data;
                setData(
                    pageData?.records.map(role => ({ ...role, key: role.roleId }))
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
            <Form.Item label="名称" name="name">
                <Input placeholder='请输入搜索名称' />
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

        <div style={{ marginBottom: "15px" }}>
            <Space>
                <Button type="primary" onClick={() => popupAddModal()}>新增</Button>
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

        <RoleModal
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

export default Role;