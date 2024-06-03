// import React from 'react';
// import { Space, Table, Tag } from 'antd';
// import type { TableProps } from 'antd';
// import SysUserPageVO from '@/util/services/SysUserPageVO';
// import { SomePropPartial } from '@/util/TypeHelper';

// const columns: TableProps<SysUserPageVO>['columns'] = [
//   {
//     title: '姓名',
//     dataIndex: 'name',
//     key: 'name'
//   },
//   {
//     title: '性别',
//     dataIndex: 'gender',
//     key: 'gender',
//     render: (text) => <>
//       {
//         text === 'MAN'
//           ? <Tag color={'green'} key={'MAN'}>男</Tag>
//           : text === 'WOMAN'
//             ? <Tag color={'volcano'} key={'WOMAN'}>女</Tag>
//             : <Tag color={'blue'} key={'OTHER'}>其他</Tag>
//       }
//     </>,
//   },
//   {
//     title: '邮箱',
//     dataIndex: 'email',
//     key: 'email'
//   },
//   {
//     title: '状态',
//     key: 'status',
//     dataIndex: 'status',
//     render: (text) => <>
//       {
//         text === 'NORMAL' ? <Tag color={'green'} key={'NORMAL'}>正常</Tag> :
//          text === 'DISABLED' ? <Tag color={'red'} key={'DISABLED'}>禁用</Tag> : <Tag color={'red'} key={'UNKNOWN'}>未知</Tag>
//       }
//     </>
//   },
//   {
//     title: '操作',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

// const data: SomePropPartial<SysUserPageVO, 'createUser' | 'createTime' | 'updateUser' | 'updateTime' | 'isDeleted'>[] = [
//   {
//       //主键
//     id: 1,
//     //业务主键
//     userId: 1,
//     //账户名
//     username: "admin",
//     //密码
//     password: "admin",
//     //名称
//     name: "admin",
//     //性别(MAN / WOMAN / UNKNOWN)
//     gender: "MAN",
//     //邮箱
//     email: "12345678@163.com",
//     //头像
//     avatar: "https://www.baidu.com",
//     //状态(NORMAL / DISABLED)
//     status: "NORMAL"
//   },
// ];

// // 数据源转为表格支持的结构
// const App: React.FC = () => <Table columns={columns} dataSource={data} />;

// export default App;