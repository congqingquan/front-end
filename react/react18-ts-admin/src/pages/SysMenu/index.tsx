import API from "@/api";
import { ResourceOptions } from "@/domain/model/ResourceOption";
import { DeleteOutlined, EditOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { TableProps, Switch, Space, Button, Popconfirm, Form, Input, Select, Table, Tooltip } from "antd";
import { useRef, useState, useEffect, useContext } from "react";
import MenuTableRow from "@/domain/model/MenuTableRow";
import SysMenuTreeDTO from "@/domain/dto/SysMenuTreeDTO";
import TreeUtils from "@/util/TreeUtils";
import AsyncComponent from "@/component/AsyncComponent";
import MenuModal from "./MenuModal";
import { MenuContextData, ModalType } from "@/common/Type";
import MenuContext from "@/context/MenuContext";

const Menu: React.FC = () => {    
    const columns: TableProps['columns'] = [
        {
            title: '主键',
            dataIndex: 'menuId',
            key: 'menuId',
            width: 70
        },
        {
            title: '父主键',
            dataIndex: 'parentId',
            key: 'parentId',
            width: 70,
            hidden: true
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
                        API.updateSysMenuStatus({ menuId: record.menuId, status: checked ? 'NORMAL' : 'DISABLED' })
                            .then(() => menuContextData.reload())
                            .then(() => loadMenuTreeData({ type: "ALL" }));
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
                    <Button type="link" icon={<EditOutlined />} onClick={() => popupModal('ADD', { parentId: record.menuId })}>新增</Button>
                    <Button type="link" icon={<EditOutlined />} onClick={() => popupModal('UPDATE', record)}>修改</Button>
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

    // 唤起 modal 页
    const popupModal = (type: ModalType, record: Partial<MenuTableRow>) => {
        editRow.current = { ...record };
        modalType.current = type;
        showModal();
    }


    // 编辑
    const editRow = useRef<Partial<MenuTableRow> | undefined>();
    const modalType = useRef<'ADD' | 'UPDATE'>('ADD');

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    // 删除
    const menuContextData = useContext<MenuContextData>(MenuContext);
    const handleDelete = async (record: MenuTableRow) => {
        API.deleteSysMenu(record.menuId)
            .then(() => menuContextData.reload())
            .then(_ => loadMenuTreeData({ type: "ALL" }));
    }

    // 搜索: 查询条件不依赖分页条件
    const [searchFormLading, setSearchFormLading] = useState<boolean>(false);
    const [searchForm] = Form.useForm<SysMenuTreeDTO>();
    const handleSubmitSearchForm = () => {
        setSearchFormLading(true);
        loadMenuTreeData({ ...searchForm.getFieldsValue(), type: 'ALL' }).then(_ => setSearchFormLading(false));
    };

    // 加载数据
    const [tableLading, setTableLading] = useState<boolean>(false);
    const [menuTree, setMenuTree] = useState<MenuTableRow[]>([]);
    useEffect(() => {
        loadMenuTreeData({ type: "ALL" });
    }, []);

    const loadMenuTreeData = (param: Partial<SysMenuTreeDTO>) => {
        setTableLading(true);
        return API.sysMenuTree(param).then(response => {
            const data = response.data.data;
            TreeUtils.foreach(data, node => node.children, (_, node) => node.key = node.menuId);
            setMenuTree(data);
            setTableLading(false);
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
                <Button type="primary" onClick={() => popupModal('ADD', {})}>新增</Button>
            </Space>
        </div>
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
            loading={tableLading}
            columns={columns}
            dataSource={menuTree}
            scroll={{ x: 1200, y: 500 }}
            pagination={false}
        />
    </>);
};

export default Menu;