import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Space, Switch, Table, Tooltip } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import API from '@/api';
import ResourceModal from './ResourceModal';
import SysResourcePageDTO from '@/domain/dto/SysResourcePageDTO';
import ResourceTableRow from '@/domain/model/ResourceTableRow';
import Constants from '@/common/Constants';

const Resource: React.FC = () => {
    const columns: TableProps['columns'] = [
        {
            title: '主键',
            dataIndex: 'resourceId',
            key: 'resourceId',
            width: 70
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 70,
            render: (text) => type2text(text)
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
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: 70,
            render: (text, record: ResourceTableRow) => (
                <Switch
                    key={text}
                    checkedChildren="启用"
                    unCheckedChildren="禁用"
                    defaultChecked={text === 'NORMAL'}
                    onChange={(checked: boolean) => {
                        API.eidtSysResource({ resourceId: record.resourceId, status: checked ? 'NORMAL' : 'DISABLED' });
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

    const type2text = (type: string): string => {
        if (type === 'MENU_DIC') {
            return '菜单目录';
        }
        else if (type === 'MENU') {
            return '菜单';
        }
        else if (type === 'MENU_BUTTON') {
            return '菜单按钮';
        }
        else if (type === 'API') {
            return '接口';
        } else {
            return '未知';
        }
    }

    // 新增
    const popupAddModal = () => {
        editRow.current = undefined;
        modalType.current = 'ADD';
        showModal();
    }

    // 编辑
    const editRow = useRef<ResourceTableRow | undefined>();
    const modalType = useRef<'ADD' | 'UPDATE'>('ADD');

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const popupEditModal = (record: ResourceTableRow) => {
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

    const handleDelete = async (record: ResourceTableRow) => {
        return API.deleteSysResource([record.resourceId]).then(_ => {
            loadPageData();
            setPaginationConfig(prev => ({ ...prev, ...Constants.DEFAULT_PAGINATION_CONFIG }));
        });
    }
    const handleBatchDelete = async () => {
        return API.deleteSysResource([...selectedRowKeys.map(key => key.toString())]).then(_ => {
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
    const [searchForm] = Form.useForm<SysResourcePageDTO>();
    const handleSubmitSearchForm = () => {
        setSearchFormLading(true);
        API.sysResourcePage({ ...searchForm.getFieldsValue(), pageNo: Constants.DEFAULT_PAGINATION_CONFIG.current, pageSize: Constants.DEFAULT_PAGINATION_CONFIG.pageSize })
            .then(response => {
                const pageData = response.data.data;
                if (pageData) {
                    setData(
                        pageData.records.map(resource => ({ ...resource, key: resource.resourceId }))
                    );
                    setPaginationConfig(prev => ({ ...prev, current: pageData.current, pageSize: pageData.size, total: pageData.total }));
                }
                setSearchFormLading(false);
            });
    };

    // 加载数据
    const [data, setData] = useState<ResourceTableRow[]>([]);
    useEffect(() => {
        loadPageData();
    }, [paginationConfig.current, paginationConfig.pageSize]);

    const loadPageData = () => {
        API.sysResourcePage({ ...searchForm.getFieldsValue(), pageNo: paginationConfig.current, pageSize: paginationConfig.pageSize })
            .then(response => {
                const pageData = response.data.data;
                setData(
                    pageData?.records.map(resource => ({ ...resource, key: resource.resourceId }))
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

        <ResourceModal
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

export default Resource;