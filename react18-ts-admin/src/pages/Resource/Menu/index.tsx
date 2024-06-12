import API from "@/api";
import { ResourceOptions } from "@/domain/model/ResourceOption";
import ResourceTableRow from "@/domain/model/ResourceTableRow";
import { DeleteOutlined, EditOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { TableProps, Switch, Space, Button, Popconfirm, Form, Input, Select, Table, Tooltip } from "antd";
import { useRef, useState, useEffect } from "react";
import MenuTableRow from "@/domain/model/MenuTableRow";
import SysMenuTreeDTO from "@/domain/dto/SysMenuTreeDTO";
import TreeUtils from "@/util/TreeUtils";
import AsyncComponent from "@/component/AsyncComponent";
import IconSelect from "@/component/IconSelect";
import MenuModal from "./MenuModal";

const Menu: React.FC = () => {

    const columns: TableProps['columns'] = [
        {
            title: '主键',
            dataIndex: 'menuId',
            key: 'menuId',
            width: 70
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 70,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 70,
            render: (text) => {
                console.log(text);
                
                return ResourceOptions.find(op => op.key === text)?.label
            }
        },
        {
            title: '图标组件',
            dataIndex: 'icon',
            key: 'icon',
            width: 70,
            align: 'center',
            render: (text) => <AsyncComponent module="antdIcon" name={text}></AsyncComponent>
        },
        {
            title: '页面组件',
            dataIndex: 'component',
            key: 'component',
            width: 70,
        },
        {
            title: '等级',
            dataIndex: 'level',
            key: 'level',
            width: 70,
        },
        {
            title: '路径',
            dataIndex: 'url',
            key: 'url',
            width: 70,
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            width: 70,
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: 70,
            render: (text, record: MenuTableRow) => (
                <Switch
                    key={text}
                    checkedChildren="启用"
                    unCheckedChildren="禁用"
                    defaultChecked={text === 'NORMAL'}
                    onChange={(checked: boolean) => {
                        API.updateSysMenuStatus({ menuId: record.menuId, status: checked ? 'NORMAL' : 'DISABLED' });
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
    const editRow = useRef<MenuTableRow | undefined>();
    const modalType = useRef<'ADD' | 'UPDATE'>('ADD');

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const popupEditModal = (record: MenuTableRow) => {
        editRow.current = { ...record };
        modalType.current = 'UPDATE';
        showModal();
    }

    // 删除
    const handleDelete = async (record: MenuTableRow) => {
        // return API.deleteSysResource([record.resourceId]).then(_ => loadPageData());
    }


    // 搜索: 查询条件不依赖分页条件
    const [searchFormLading, setSearchFormLading] = useState<boolean>(false);
    const [searchForm] = Form.useForm<SysMenuTreeDTO>();
    const handleSubmitSearchForm = () => {
        setSearchFormLading(true);
        loadMenuTreeData({ ...searchForm.getFieldsValue(), type: 'ALL' }).then(_ => setSearchFormLading(false));
    };

    // 加载数据
    const [menuTree, setMenuTree] = useState<MenuTableRow[]>([]);
    useEffect(() => {
        loadMenuTreeData({ type: 'ALL' });
    }, []);

    const loadMenuTreeData = (param: Partial<SysMenuTreeDTO>) => {
        return API.sysMenuTree(param).then(response => {
            const data = response.data.data;
            TreeUtils.foreach(data, node => node.children, (_, node) => node.key = node.menuId);
            setMenuTree(data);
        });
    }

    return (<>
        <Form
            layout={'inline'}
            form={searchForm}
            style={{ marginBottom: "15px" }}
            onFinish={() => handleSubmitSearchForm()}
        >
            <Form.Item label="关键字" name="keyword">
                <Input placeholder='请输入搜索关键字' />
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
                    onConfirm={() => { }}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button danger>删除</Button>
                </Popconfirm>
            </Space>
        </div>

        {/* <IconSelect></IconSelect> */}
        <MenuModal
            type={modalType.current}
            initData={editRow.current}
            open={open}
            onConfirm={() => {
                hideModal();
                loadMenuTreeData({ type: 'ALL' });
            }}
            onCancel={hideModal}
        />
        <Table
            columns={columns}
            dataSource={menuTree}
            scroll={{ x: 1200, y: 500 }}
        />
    </>);
};

// TODO1: 后端：菜单删除接口
// TODO2: 前端：对接菜单新增、修改接口

// TODO3: 前端在页面组件中通过按钮权限展示不同的按钮
// TODO4: 后端在权限拦截器中添加权限拦截

export default Menu;