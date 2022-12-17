import React, { useCallback, useEffect, useState, map } from "react";
import { Col, Form, Row, Button, DatePicker, Space, Input, Select } from "antd";
import FormComponent from "./Form";
import * as commonServices from "../api/commonServices";
import { buildQueryString, parseParams } from "../utils/function";
import { width } from "@mui/system";
import { Container } from "@mui/material";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export function FormBaoCao(props) {
  const [fromDate, setFromDate] = useState(false);
  function onSelectFromDate(date, dateString) {
    setFromDate(dateString);
  }
  const [toDate, setToDate] = useState(false);
  function onSelectToDate(date, dateString) {
    console.log(toDate)
    setToDate(dateString);
  }

  const { handleSearch } = props;
  console.log(props)
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, []);

  const [dataCH, setListViTriCuaHang] = useState([]);
  const [dataPB, setListPhongBan] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await commonServices.listViTriCuaHang();
      console.log("list position: " + result);
      setListViTriCuaHang(result);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await commonServices.listPhongBan();
      console.log("list position: " + result);
      setListPhongBan(result);
    };
    fetchApi();
  }, []);

  return (
    <FormComponent
      width="1200px"
      form={form}
      name="filter-form"
      onFinish={handleSearch}
      layout="vertical"
      autoComplete="off"
    >
      <Row gutter={24}>
        <Col span={24} xl={8}>
          <Form.Item label="Từ ngày" name="fromDate">
            <DatePicker
              onChange={onSelectFromDate}
              format="DD/MM/YYYY"
              picker="Từ ngày"
              formKey="fromDate"
              form={form}
              style={{ width: "100%" }}
              value={fromDate}
            />
          </Form.Item>
        </Col>
        <Col span={24} xl={8}>
          <Form.Item label="Đến ngày" >
            <DatePicker
              onChange={onSelectToDate}
              format="DD/MM/YYYY"
              picker="Đến ngày"
              formKey="toDate"
              form={form}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={24} xl={8}>
          <Form.Item label="Mã nhân viên" name="userId">
            <Input />
          </Form.Item>
        </Col>

        <Col span={24} xl={8}>
          <Form.Item label="Vị trí" name="position">
            <Select
              defaultValue=""
              showSearch
              placeholder="--- Chọn vị trí ---"
              style={{ width: "100%" }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option.props.value.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
              }
            >
              {Object.entries(dataCH).map(([key, value]) => (
                <Select.Option value={value.value}>{value.text}</Select.Option>
              ))}
              ;
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item label="Phòng ban" name="department">
            <Select
              defaultValue=""
              showSearch
              placeholder="--- Chọn vị trí ---"
              style={{ width: "100%" }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option.props.value.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
              }
            >
              {Object.entries(dataPB).map(([key, value]) => (
                <Select.Option value={value.value}>{value.text}</Select.Option>
              ))}
              ;
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" form="filter-form">
        Xuất Excel
      </Button>
    </FormComponent>
  );
}
