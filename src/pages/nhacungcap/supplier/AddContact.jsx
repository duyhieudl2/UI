import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Select, Option, Spin, TextArea, Radio } from 'antd';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';
import { Label } from 'recharts';
export default function AddContact(props) {
    const [form] = Form.useForm();
    const { getListContact, getListContactHistory, close, supplierId, contact, getSupplierList } = props;
    useEffect(() => {
        form.resetFields();
        form.setFieldValue(contact);
    }, [supplierId, contact]);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        authPostData({
            url: `${Endpoint.ADD_CONTACT_SUPPLIER}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
                id: contact.id ? contact.id : supplierId,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getListContact();
                    getListContactHistory();
                    getSupplierList();
                } else {
                    getErrorForm(res, form);
                }
            },
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log(contact);
    return (
        <Form
            form={form}
            name="filter-form"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            style={{ marginTop: 20 }}
            initialValues={{
                ...contact,
            }}
        >
            <Row gutter={24} justify="space-between" align="middle">
                <Col span={24} sm={24} xl={24}>
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên',
                            },
                        ]}
                        style={{ marginBottom: '5px', marginTop: '5px' }}
                    >
                        <Input placeholder="Tên" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={24} xl={24}>
                    <Form.Item
                        name="phone"
                        label="Điện thoại"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại',
                            },
                        ]}
                        style={{ marginBottom: '5px', marginTop: '5px' }}
                    >
                        <Input type="number" placeholder="Số điện thoại" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={24} xl={24}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Địa chỉ email không hợp lệ',
                            },
                        ]}
                        style={{ marginBottom: '5px', marginTop: '5px' }}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>
                <Col span={24} sm={24} xl={24}>
                    <Form.Item name="description" label="Ghi chú" style={{ marginBottom: '25px', marginTop: '5px' }}>
                        <Input placeholder="Ghi chú" />
                    </Form.Item>
                </Col>
                <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
                <Col span={24} sm={24} xl={24} style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
