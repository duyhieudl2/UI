import React from 'react';
import { Table } from 'antd';

import { useEffect, useState } from "react";
import * as userServices from '../../api/userServices';
import CreateOrEditUser from './CreateOrEditUser';
import { Button, Modal } from 'antd';

const columns = [
  {
    title: 'Full Name',
    width: 200,
    dataIndex: 'userName',
    key: 'userName',
    fixed: 'left',
  },
  {
    title: 'Email',
    width: 250,
    dataIndex: 'email',
    key: 'email',
    fixed: 'left',
  },
  {
    title: 'Uid',
    dataIndex: 'id',
    key: '1',
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];



export default function UserList() {


  const [filterTaskList, setFilterTaskList] = useState([]);
  const [data, setUserList] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.listUser();
      console.log(result);
      setUserList(result);
    }
    // fetchApi();
  }, [])

  const createUser = () => {
    console.log("OK");
  }

  return (

    <div>
      <button onClick={createUser} className='userListEdit'>Thêm mới</button>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1600,
        }}
      />
    </div>


  );
}