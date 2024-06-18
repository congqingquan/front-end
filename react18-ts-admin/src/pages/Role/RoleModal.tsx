import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Switch, TreeSelect } from 'antd';
import API from '@/api';
import RoleTableRow from '@/domain/model/RoleTableRow';
import ModalFormProps from '@/domain/model/ModalFormProps';
import { MenuContextData } from '@/common/Type';
import TreeUtils from '@/util/TreeUtils';
import MenuContext from '@/context/MenuContext';
import MenuItem from '@/domain/model/MenuItem';

const RoleModal: React.FC<ModalFormProps<RoleTableRow>> = ({ type, initData, open, onConfirm, onCancel }) => {
  
  const menuContextData = useContext<MenuContextData>(MenuContext);
  const [form] = Form.useForm();
  // 确认
  const onFinish = () => {

    setModalConfirmLading(true);
    if (type === 'ADD') {
      API.addSysRole(
        {
          ...form.getFieldsValue(),
          status: status2String(form.getFieldValue("status"))
        }
      )
        .then(() => onConfirm())
        .finally(() => setModalConfirmLading(false));
    } else {
      API.eidtSysRole(
        {
          ...form.getFieldsValue(),
          status: status2String(form.getFieldValue("status"))
        }
      )
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

  // 菜单资源下拉框
  const [treeData, setTreeData] = useState<{ title: string, value: string, children?: []}[]>();
  useEffect(() => {
    const treeData = TreeUtils.convertNode<MenuItem, { title: string, value: string, children?: []}>(
      menuContextData.allMenuTree, 
      node => ({ title: node.label, value: node.resourceid }), 
      node => node.children,
      node => {
        node.children = [];
        return node.children;
      }
    );
    setTreeData(treeData);
  }, [menuContextData.allMenuTree]);

  // 接口资源下拉框
  interface ApiOptionItem { key: string, label: React.ReactNode, value: string}
  interface ApiOption { key: string, label: React.ReactNode, title: string, options?: ApiOptionItem[]}
  const [apiOptions, setApiOpntions] = useState<ApiOption[]>();
  useEffect(() => {
    API.sysApiGroupByType().then(response => {
      const data = response.data.data;
      if (data) {
        const apiOptions: ApiOption[] = data.map(data => ({
          key: data.type,
          label: <span>{data.type}</span>,
          title: data.type,
          options: data.items.map(item => ({
            key: item.resourceId,
            label: <span>{item.name}</span>,
            value: item.resourceId
          }))
        }));        
        setApiOpntions(apiOptions);
      }
    });
  }, []);

  return (
    <Modal
      title={type === 'ADD' ? '新增角色' : '修改角色'}
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
          name='roleForm'
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
              status: status2Boolean(initData.status),
              menuResources: (initData.menuResources || []).map(r => r.resourceId),
              apiResources: (initData.apiResources || []).map(r => r.resourceId)
            }
          }
        >
          {dom}
        </Form>
      )}>
      <Form.Item name='roleId' label='主键' hidden>
        <Input></Input>
      </Form.Item>
      <Form.Item name='name' label='名称' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入名称"
        />
      </Form.Item>
      <Form.Item name='description' label='描述'>
        <Input
          placeholder="请输入描述"
        />
      </Form.Item>

      <Form.Item name='menuResources' label='菜单资源'>
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择父级节点"
            allowClear
            multiple
            treeDefaultExpandAll
            treeData={treeData}
        />
      </Form.Item>

      <Form.Item name='apiResources' label='接口资源'>
          <Select
            mode="multiple"
            style={{ width: 200 }}
            options={apiOptions}
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

export default RoleModal;