import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Switch } from 'antd';
import API from '@/api';
import ResourceTableRow from '@/domain/model/ResourceTableRow';
import { DefaultOptionType } from 'antd/es/select';

interface ModalFormProps {
  type: 'ADD' | 'UPDATE',
  initData?: ResourceTableRow,
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const resourceTypes: DefaultOptionType[] = [
  { 
    key: 'MENU_DIC', 
    value: 'MENU_DIC', 
    label: '菜单目录'
  },{ 
    key: 'MENU', 
    value: 'MENU', 
    label: '菜单'
  },{ 
    key: 'MENU_BUTTON', 
    value: 'MENU_BUTTON', 
    label: '菜单按钮'
  },{ 
    key: 'API', 
    value: 'API', 
    label: '接口'
  }
];

const ResourceModal: React.FC<ModalFormProps> = ({ type, initData, open, onConfirm, onCancel }) => {
  const [form] = Form.useForm();

  // 回显：根据新增、编辑初始化表单项的默认值
  useEffect(() => {
    if (initData) {
      form.setFieldsValue(
        {
          ...initData,
          status: status2Boolean(initData.status)
        }
      );
    }
  }, [initData]);

  // 确认
  const onFinish = () => {

    setModalConfirmLading(true);
    if (type === 'ADD') {
      API.addSysResource(
        {
          ...form.getFieldsValue(),
          status: status2String(form.getFieldValue("status"))
        }
      )
        .then(() => onConfirm())
        .finally(() => setModalConfirmLading(false));
    } else {
      API.eidtSysResource(
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

  return (
    <Modal
      title={type === 'ADD' ? '新增资源' : '修改资源'}
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
        >
          {dom}
        </Form>
      )}>
      <Form.Item name='resourceId' label='资源主键' hidden>
        <Input></Input>
      </Form.Item>
      <Form.Item name='identifier' label='标识符' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入标识符"
        />
      </Form.Item>
      <Form.Item name='name' label='资源名称' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入资源名称"
        />
      </Form.Item>
      <Form.Item name='value' label='值'>
        <Input
          placeholder="请输入值"
        />
      </Form.Item>
      <Form.Item name='description' label='描述'>
        <Input
          placeholder="请输入描述"
        />
      </Form.Item>
      <Form.Item name='roles' label='类型' >
        <Select
          style={{ width: '100%' }}
          defaultValue={initData?.type}
          options={resourceTypes}
          placeholder="请选择类型"
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

export default ResourceModal;