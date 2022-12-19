import React from "react";
import { Table } from "antd";
// import { buildQueryString, parseParams } from "../../utils/function";
import { buildQueryString, parseParams } from "~/utils/function";
import { useEffect, useState, useCallback } from "react";
// import * as userServices from "../../api/userServices";
import * as userServices from "~/api/userServices";
import CreateUser from "./CreateOrEditUser";
import { Button, Modal } from "antd";
import { ListFilter } from "./list-bo-loc";
import { Container } from "@mui/material";

const columns = [
  {
    title: "Họ và tên",
    width: 300,
    dataIndex: "name",
    fixed: "left",
  },
  {
    title: "Tên đăng nhập",
    width: 200,
    dataIndex: "userName",
    key: "id",
    fixed: "left",
  },
  {
    title: "Email",
    width: 300,
    dataIndex: "email",
    fixed: "left",
  },
  {
    title: "Ngày sinh",
    width: 200,
    dataIndex: "age",
    fixed: "left",
  },
  {
    width: 300,
    title: "Chức vụ",
    dataIndex: "positionName",
  },
  {
    title: "Trạng thái",
    fixed: "right",
    width: 150,
    render: () => <a>Hoạt động</a>,
  },
];

export default function UserList() {
  const [filterTaskList, setFilterTaskList] = useState([]);
  const [data, setUserList] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.listUser(filterTaskList);
      console.log(result);
      setUserList(result);
    };
    fetchApi();
  }, [filterTaskList]);

  // Create Or Edit
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Handler Search
  const handleSearch = useCallback((values) => {
    console.log("search value = " + buildQueryString(parseParams(values)));
    setFilterTaskList(buildQueryString(parseParams(values)));
  }, []);

  return (
    <div>
      <Container>
        {/* <div>
        <Button type="primary" onClick={showModal}>
          Thêm mới
        </Button>
        <Modal
          open={open}
          title="Title"
          onCancel={handleCancel}
          footer={[]}
          width="1200px"
        >
          <CreateUser />
        </Modal>
      </div> */}
        <ListFilter handleSearch={handleSearch} />
        <div>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </div>
      </Container>
    </div>
  );
}
