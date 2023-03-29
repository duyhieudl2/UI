import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';

export default function CreateOrEditUser(props) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { getUserList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const onFinish = (values) => {
        authPostData({
            url: `${Endpoint.CRU}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getUserList();
                } else {
                    getErrorForm(res, form);
                }
            },
        });
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
                    <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
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
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Họ và tên không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    {detailData.id ? (
                        <></>
                    ) : (
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
                    )}

                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Điện thoại" name="phone">
                        <Input />
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
