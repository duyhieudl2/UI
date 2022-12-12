import React from 'react';
import { Table } from 'antd';

import { useEffect, useState } from "react";
import * as userServices from '../../api/userServices';
import CreateUser from './CreateOrEditUser';
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

  // Create Or Edit 
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm mới
      </Button>
      <Modal
        open={open}
        title="Title"
        onCancel={handleCancel}
        footer={[
        ]}
        width="1200px"
      >
        <CreateUser/>
        
      </Modal>
    </>
  );
}