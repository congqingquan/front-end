import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Switch } from 'antd';
import API from '@/api';
import { ApiOptions } from '@/domain/model/ResourceOption';
import ModalFormProps from '@/domain/model/ModalFormProps';
import ApiTableRow from '@/domain/model/ApiTableRow copy';
import Constants from '@/common/Constants';

const ApiModal: React.FC<ModalFormProps<ApiTableRow>> = ({ type, initData, open, onConfirm, onCancel }) => {
  const [form] = Form.useForm();
  // 确认
  const onFinish = () => {

    setModalConfirmLading(true);
    if (type === 'ADD') {
      API.addSysApi(
        {
          ...form.getFieldsValue(),
          status: status2String(form.getFieldValue("status"))
        }
      )
        .then(() => onConfirm())
        .finally(() => setModalConfirmLading(false));
    } else {
      API.eidtSysApi(
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
      title={type === 'ADD' ? '新增接口' : '修改接口'}
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
              status: status2Boolean(initData.status ? initData.status : '')
            }
          }
        >
          {dom}
        </Form>
      )}>
      <Form.Item name='apiId' label='主键' hidden>
        <Input></Input>
      </Form.Item>
      <Form.Item name='name' label='名称' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入名称"
        />
      </Form.Item>
      <Form.Item name='url' label='路径' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入路径"
        />
      </Form.Item>
      <Form.Item name='method' label='请求方式' rules={[{ required: true, message: '' }]}>
        <Select
            style={{ width: '100%' }}
            defaultValue={initData?.type}
            options={Constants.HTTP_METHOD.map(method => ({ key: method, value: method, lable: method }))}
            placeholder="请选择类型"
        />
      </Form.Item>
      <Form.Item name='type' label='类型' >
        <Select
          style={{ width: '100%' }}
          defaultValue={initData?.type}
          options={ApiOptions}
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

export default ApiModal;