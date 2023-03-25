import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input, Select, Option } from 'antd';
import * as userServices from '../../api/userServices';
import * as commonServices from '../../api/commonServices';
import { Padding } from '@mui/icons-material';

export default function CreateOrEditUser(props) {
    const [form] = Form.useForm();
    const { getUserList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const onFinish = (values) => {
        // console.log("Success:", values);
        // const fetchApi = async () => {
        //   const result = await userServices.createUser(values);
        //   console.log(result);
        //   // setUserList(result);
        // };
        // fetchApi();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                ...detailData,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Tên đăng nhập không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Họ và tên không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Điện thoại không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được để trống!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Email không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Chức vụ"
                        name="position"
                        rules={[
                            {
                                required: true,
                                message: 'Chức vụ không được để trống!',
                            },
                        ]}
                    >
                        <Select placeholder="--- Chọn chức vụ ---">
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo1">Demo1</Select.Option>
                            <Select.Option value="demo2">Demo2</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                wrapperCol={{
                    offset: 11,
                    span: 11,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Xác nhận
                </Button>
            </Form.Item>
        </Form>
    );
}
