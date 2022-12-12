import React from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import * as userServices from '../../api/userServices'


export default function CreateUser() {

    const onFinish = (values) => {
      console.log('Success:', values);
      const fetchApi = async () => {
        const result = await userServices.createUser(values);
        console.log(result);
        // setUserList(result);
      }
      fetchApi();

    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  return (
    <Form
    name="basic"
    labelCol={{
      span:  6,
    }}
    wrapperCol={{
      span: 18,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

    <Row>
      <Col span={12}>
      <Form.Item
      label="Username"
      name="userName"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item
      label="Username"
      name="userName"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
      </Col>
    </Row>

   

    
    <Form.Item
      wrapperCol={{
        offset: 12,
        span: 12,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}



