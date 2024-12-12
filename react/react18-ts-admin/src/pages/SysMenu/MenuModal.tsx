import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Switch, TreeSelect } from 'antd';
import API from '@/api';
import { MenuOptions } from '@/domain/model/ResourceOption';
import ModalFormProps from '@/domain/model/ModalFormProps';
import MenuTableRow from '@/domain/model/MenuTableRow';
import IconSelect from '@/component/IconSelect';
import { MenuContextData, MenuItemType } from '@/common/Type';
import MenuContext from '@/context/MenuContext';
import TreeUtils from '@/util/TreeUtils';
import MenuItem from '@/domain/model/MenuItem';

const MenuModal: React.FC<ModalFormProps<Partial<MenuTableRow>>> = ({ type, initData, open, onConfirm, onCancel }) => {
  const [form] = Form.useForm();
  // 确认
  const onFinish = () => {    
    setModalConfirmLading(true);
    if (type === 'ADD') {
      API.addSysMenu(
        {
          ...form.getFieldsValue(),
          status: status2String(form.getFieldValue("status"))
        }
      )
        .then(() => menuContextData.reload())
        .then(() => onConfirm())
        .finally(() => setModalConfirmLading(false));
    } else {
      API.eidtSysMenu(
        {
          ...form.getFieldsValue(),
          status: status2String(form.getFieldValue("status"))
        }
      )
        .then(() => menuContextData.reload())
        .then(() => onConfirm())
        .finally(() => setModalConfirmLading(false));
    }
  };

  const status2Boolean = (status: string): boolean => {
    return status === 'NORMAL';
  }
  const status2String = (status: boolean): string => {
    return status ? 'NORMAL' : 'DISABLED';
  }

  // Modal 确认 loading
  const [modalConfirmLading, setModalConfirmLading] = useState<boolean>(false);

  // 父级选择
  const menuContextData = useContext<MenuContextData>(MenuContext);
  // interface TreeData { title: string, value: string, children?: TreeData[]};
  const [treeData, setTreeData] = useState<{ title: string, value: string, disabled: boolean, children?: []}[]>();
  useEffect(() => {
    const treeData = TreeUtils.convertNode<MenuItem, { title: string, value: string, disabled: boolean, children?: []}>(
      menuContextData.allMenuTree, 
      node => ({ title: node.label, value: node.menuid, disabled: node.menuid === initData?.menuId}), 
      node => node.children,
      node => {
        node.children = [];
        return node.children;
      }
    );
    setTreeData(treeData);
  }, [menuContextData.allMenuTree, type]);

  // 菜单类型
  const [menuType, setMenuType] = useState<MenuItemType | undefined>();
  useEffect(() => setMenuType(initData?.type as MenuItemType), [initData?.type]);

  return (
    <Modal
      title={type === 'ADD' ? '新增菜单' : '修改菜单'}
      open={open}
      onCancel={onCancel}
      okText={type === 'ADD' ? '新增' : '修改'}
      cancelText='取消'
      okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
      confirmLoading={modalConfirmLading}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          form={form}
          name='menuForm'
          layout='horizontal'
          style={{ margin: '15px 0' }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 15 }}
          size={'middle'}
          onFinish={() => onFinish()}
          clearOnDestroy
          // 回显
          initialValues={
            initData &&
            {
              ...initData,
              status: status2Boolean(initData.status ? initData.status : '')
            }
          }
        >
          {dom}
        </Form>
      )}>

      <Form.Item name='menuId' label='主键' hidden>
        <Input></Input>
      </Form.Item>
      <Form.Item name='parentId' label='父级节点'>
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="请选择父级节点"
          allowClear
          treeDefaultExpandAll
          treeData={treeData}
        />
      </Form.Item>
      <Form.Item name='name' label='名称' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入名称"
        />
      </Form.Item>
      <Form.Item name='component' label='页面组件' rules={[{ required: menuType !== 'MENU_BUTTON', message: '' }]} hidden={menuType === 'MENU_BUTTON'}>
          <Input
            placeholder="请输入页面组件"
          />
      </Form.Item>
      <Form.Item name='icon' label='icon'>
        <IconSelect></IconSelect>
      </Form.Item>
      <Form.Item name='url' label='路径' hidden={menuType === 'MENU_BUTTON'}>
        <Input
          placeholder="请输入路径"
        />
      </Form.Item>
      <Form.Item name='identifier' label='标识符' rules={[{ required: menuType === 'MENU_BUTTON', message: '' }]} hidden={menuType !== 'MENU_BUTTON'}>
        <Input
          placeholder="请输入标识符"
        />
      </Form.Item>
      <Form.Item name='sort' label='排序' >
        <Input
          placeholder="请输入排序"
        />
      </Form.Item>
      <Form.Item name='type' label='类型' rules={[{ required: true, message: '' }]}>
        <Select
            style={{ width: '100%' }}
            options={MenuOptions}
            placeholder="请选择类型"
            onChange={(val) => setMenuType(val)}
          />
      </Form.Item>

      <Form.Item name='status' valuePropName='checked' label='状态'>
        <Switch 
          checkedChildren="启用"
          unCheckedChildren="禁用"
        />
        </Form.Item>
    </Modal >
  );
};

export default MenuModal;