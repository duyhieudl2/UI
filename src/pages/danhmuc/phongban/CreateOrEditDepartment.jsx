import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Select, Option, Spin, EditOutlined } from 'antd';
import { width } from '@mui/system';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';

export default function CreateOrEditDepartment(props) {
    const [form] = Form.useForm();
    const { getDivisionList, close, detailDepartment } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailDepartment);
    }, [detailDepartment]);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log(values);
        authPostData({
            url: `${Endpoint.CREATE_DIVISION}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getDivisionList();
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
                ...detailDepartment,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
            <Form.Item
                label="Tên bộ phận"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Tên bộ phận không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mã bộ phận"
                name="code"
                rules={[
                    {
                        required: true,
                        message: 'Mã bộ phận không được để trống!',
                    },
                ]}
            >
                <Input readOnly={detailDepartment.id ? true : false} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Xác nhận
                </Button>
            </Form.Item>
        </Form>
    );
}
