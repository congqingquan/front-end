import React, { useState } from 'react';
import { Button, Form, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import UserTableRow from '@/domain/model/UserTableRow';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UserAddModal from './UserAddModal';

const User: React.FC = () => {
  const columns: TableProps['columns'] = [
    {
      title: '主键',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => <>
        {
          text === 'MAN'
            ? <Tag color={'green'} key={'MAN'}>男</Tag>
            : text === 'WOMAN'
              ? <Tag color={'volcano'} key={'WOMAN'}>女</Tag>
              : <Tag color={'blue'} key={'OTHER'}>其他</Tag>
        }
      </>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text) => <>
        {
          text === 'NORMAL' ? <Tag color={'green'} key={'NORMAL'}>正常</Tag> :
            text === 'DISABLED' ? <Tag color={'red'} key={'DISABLED'}>禁用</Tag> : <Tag color={'red'} key={'UNKNOWN'}>未知</Tag>
        }
      </>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(event) => handleEdit(record)}>
            {<EditOutlined />} 修改
          </a>
          <a onClick={(event) => handleDelete(record)}>
            {<DeleteOutlined />} 删除
          </a>
        </Space>
      ),
    },
  ];

  const data: UserTableRow[] = [
    {
      //主键
      key: "1",
      //业务主键
      userId: 1,
      //账户名
      username: "admin",
      //密码
      password: "admin",
      //名称
      name: "admin",
      //性别(MAN / WOMAN / UNKNOWN)
      gender: "MAN",
      //邮箱
      email: "12345678@163.com",
      //头像
      avatar: "https://www.baidu.com",
      //状态(NORMAL / DISABLED)
      status: "NORMAL",
      //创建人
      createUser: 1,
      //创建时间
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      //更新人
      updateUser: 1,
      //更新时间
      updateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  // 编辑
  const [open, setOpen] = useState(false);

  const showUserModal = () => {
    setOpen(true);
  };

  const hideUserModal = () => {
    setOpen(false);
  };

  const handleEdit = (record: UserTableRow) => {
    console.log(record);
  }

  // 删除
  const handleDelete = (record: UserTableRow) => {
    console.log(record);
  }


  return <>
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'userForm') {
          // const { basicForm } = forms;
          // const users = basicForm.getFieldValue('users') || [];
          console.log(values, forms);
          setOpen(false);
        }
      }}
    >
      <Button htmlType="button" style={{ margin: '0 8px' }} onClick={showUserModal}>
        Add User
      </Button>
      <UserAddModal open={open} onCancel={hideUserModal} />
    </Form.Provider>

    <Table columns={columns} dataSource={data} />
  </>
    ;
}

export default User;