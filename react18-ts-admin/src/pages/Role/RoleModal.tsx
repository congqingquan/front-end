import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Switch } from 'antd';
import API from '@/api';
import RoleTableRow from '@/domain/model/RoleTableRow';

interface ModalFormProps {
  type: 'ADD' | 'UPDATE',
  initData?: RoleTableRow,
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const RoleModal: React.FC<ModalFormProps> = ({ type, initData, open, onConfirm, onCancel }) => {
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
        >
          {dom}
        </Form>
      )}>
      <Form.Item name='roleId' label='用户主键' hidden>
        <Input></Input>
      </Form.Item>
      <Form.Item name='name' label='角色名' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入角色名"
        />
      </Form.Item>
      <Form.Item name='description' label='描述' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入描述"
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