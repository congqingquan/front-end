import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Switch } from 'antd';
import API from '@/api';
import { ResourceOptions } from '@/domain/model/ResourceOption';
import ModalFormProps from '@/domain/model/ModalFormProps';
import MenuTableRow from '@/domain/model/MenuTableRow';

const MenuModal: React.FC<ModalFormProps<MenuTableRow>> = ({ type, initData, open, onConfirm, onCancel }) => {
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


      {/*
      `parent_id` bigint(20) unsigned DEFAULT NULL COMMENT '父节点主键',
      `parent_path` varchar(500) DEFAULT NULL COMMENT '父级路径',
      `level` int(11) unsigned DEFAULT NULL COMMENT '等级',
      
      `name` varchar(100) DEFAULT NULL COMMENT '名称',
      `component` varchar(100) DEFAULT NULL COMMENT '组件',
      `icon` varchar(100) DEFAULT NULL COMMENT 'icon',
      `url` varchar(100) DEFAULT NULL COMMENT '路径',
      `sort` int(11) DEFAULT '0' COMMENT '排序',
      `target_type` varchar(20) DEFAULT NULL COMMENT '打开方式类型(页签TAB / 新窗口BLANK)',
      `type` varchar(20) DEFAULT NULL COMMENT '菜单类型(不能跳转的菜单MENU_DIC / MENU / MENU_BUTTON)',
      */}

      <Form.Item name='resourceId' label='主键' hidden>
        <Input></Input>
      </Form.Item>
      <Form.Item name='identifier' label='标识符' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入标识符"
        />
      </Form.Item>
      <Form.Item name='name' label='名称' rules={[{ required: true, message: '' }]}>
        <Input
          placeholder="请输入名称"
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
          options={ResourceOptions}
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

export default MenuModal;