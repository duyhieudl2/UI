import React, { useEffect, useState, useCallback } from 'react';
import { Button, Row, Col, Form, Input, Select, Option, Spin, TextArea, Radio, Checkbox } from 'antd';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';
import { Label } from 'recharts';
export default function CreateOrEditAccountSupplier(props) {
    const { Option } = Select;
    const { TextArea } = Input;
    const [useDefaultPassword, setUseDefaultPassword] = useState(false);
    const [form] = Form.useForm();
    const { getAccountSupplierList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        authPostData({
            url: `${Endpoint.CRUD_ACCOUNT_SUPPLIER}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getAccountSupplierList();
                } else {
                    getErrorForm(res, form);
                }
            },
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCheckUseDefaultPassword = useCallback(
        (event) => {
            const { checked } = event.target;
            setUseDefaultPassword(checked);
            form.setFieldsValue({
                password: undefined,
                confirmPassword: undefined,
            });
        },
        [form],
    );

    return (
        <Form
            form={form}
            name="filter-form"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            style={{ margin: 0 }}
        >
            <Form.Item name="id" style={{ display: 'none' }}></Form.Item>

            <Row gutter={24} justify="space-between" align="middle">
                <Col span={24} sm={12} xl={12}>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="userName"
                        style={{ marginBottom: '8px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Tên đăng nhập không được để trống!',
                            },
                        ]}
                    >
                        <Input readOnly={detailData.id ? true : false} />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={12}>
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        style={{ marginBottom: '8px' }}
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

                <Col span={24} sm={12} xl={12}>
                    <Form.Item
                        label="Địa chỉ Email"
                        name="email"
                        style={{ marginBottom: '8px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Email không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12} xl={12}>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        style={{ marginBottom: '8px' }}
                        rules={[
                            {
                                required: true,
                                message: 'Số điện thoại không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                {detailData.id === undefined && (
                    <>
                        <Col span={24} sm={12} xl={12}>
                            <Form.Item label="Mật khẩu" name="password" style={{ marginBottom: '8px' }}>
                                <Input.Password disabled={useDefaultPassword} />
                            </Form.Item>
                        </Col>

                        <Col span={24} sm={12} xl={12}>
                            <Form.Item
                                label="Xác nhận mật khẩu"
                                name="confirmPassword"
                                style={{ marginBottom: '8px' }}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Xác nhận mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password disabled={useDefaultPassword} />
                            </Form.Item>
                        </Col>

                        <Col span={24} sm={12} xl={12}>
                            <Form.Item name="default_password" label="Mật khẩu mặc định">
                                <Checkbox onChange={handleCheckUseDefaultPassword} checked={useDefaultPassword} />
                            </Form.Item>
                        </Col>
                    </>
                )}

                <Col span={24} sm={24} xl={24} style={{ textAlign: 'center', marginBottom: '10px', marginTop: '15px' }}>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
