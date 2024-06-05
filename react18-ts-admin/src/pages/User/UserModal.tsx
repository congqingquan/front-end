import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Radio, Select, Switch, Upload } from 'antd';
import UserTableRow from '@/domain/model/UserTableRow';
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import API from '@/api';
import { DefaultOptionType } from 'antd/es/select';

interface ModalFormProps {
  type: 'ADD' | 'UPDATE',
  initData?: UserTableRow,
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const UserModal: React.FC<ModalFormProps> = ({ type, initData, open, onConfirm, onCancel }) => {
  const [form] = Form.useForm();

  // 回显：根据新增、编辑初始化表单项的默认值
  // 注意！必须在 useEffect 中初始化表单项，不然会提示：Cannot update during an existing state transition (such as within `render`).
  // 可以推测 form.setFieldValue 内部会修改自己的 useState，那么就会出现在 render 期间触发了 state 改变，故提示以上的渲染时更新警告。
  useEffect(() => {
    if (initData) {
      form.setFieldsValue({ ...initData, status: status2Boolean(initData.status) });
    }
  }, [initData]);

  // 确认
  const onFinish = () => {
    setModalConfirmLading(true);
    if (type === 'ADD') {
      API.addSysUser({ ...form.getFieldsValue(), status: status2String(form.getFieldValue("status")) })
        .then(() => onConfirm())
        .finally(() => setModalConfirmLading(false));
    } else {
      API.eidtSysUser({ ...form.getFieldsValue(), status: status2String(form.getFieldValue("status")) })
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

  // 加载数据
  const [roleData, setRoleData] = useState<DefaultOptionType[]>([]);
  useEffect(() => {
    API.sysRolePage({ pageNo: 2, pageSize: -1}).then(response => {
      console.log(response.data.data.records.map(role => ({ value: role.roleId.toString(), title: role.name})));
      
      setRoleData(
        response.data.data.records.map(role => ({ value: role.roleId.toString(), label: role.name}))
      );
    });
  }, []);

  return (
    <Modal
      title={type === 'ADD' ? '新增用户' : '修改用户'}
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
          name='userForm'
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
      {/* 
            当提交表单触发 onOk 时，通过 form.getFieldsValue() 只能获取到所有存在的表单项数据。
            即使已经通过 form.setFieldValue 设置了字段值，也无法被 form.getFieldsValue 获取到，除非使用 form.getFieldValue 进行显示指定获取 
        */}
      <Form.Item name='userId' label='用户主键' hidden>
        <Input></Input>
      </Form.Item>
      <Form.Item name='username' label='用户名' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入用户名"
        // prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </Form.Item>
      <Form.Item name='password' label='密码' rules={[{ required: true, message: '' }]}>
        <Input.Password
          placeholder="请输入密码"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item name='name' label='姓名' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入姓名"
        />
      </Form.Item>
      <Form.Item name='email' label='邮箱'>
        <Input />
      </Form.Item>
      <Form.Item name='gender' label='性别'>
        <Radio.Group>
          <Radio value="MAN">男</Radio>
          <Radio value="WOMAN">女</Radio>
          <Radio value="UNKNOWN">其他</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name='roles' label='角色'>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          options={roleData}
          placeholder="Please select"
        />
      </Form.Item>

      <Form.Item name='avatar' label='头像' valuePropName='file-list'>
        <Upload action="/upload.do" listType="picture-card">
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item name='status' valuePropName='checked' label='状态'>
        <Switch />
      </Form.Item>
    </Modal >
  );
};

export default UserModal;