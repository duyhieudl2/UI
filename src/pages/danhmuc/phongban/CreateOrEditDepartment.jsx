import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Select, Option, Spin, EditOutlined } from 'antd';
import { width } from '@mui/system';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';

export default function CreateOrEditDepartment(props) {
    const [form] = Form.useForm();
    const { getDepartmentList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log('dsadsa' + JSON.stringify(values));
        authPostData({
            url: `${Endpoint.CRUD_DEPARTMENT}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getDepartmentList();
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
            <Form.Item name="id" style={{ display: 'none' }}></Form.Item>

            <Form.Item
                label="Bộ phận"
                name="divisionCode"
                rules={[
                    {
                        required: true,
                        message: 'Bộ phận không được để trống!',
                    },
                ]}
            >
                <Selection
                    url={Endpoint.LIST_BOPHAN}
                    form={form}
                    formKey="divisionCode"
                    // setValue={handleChangeUnit}
                    placeholder="--- Chọn bộ phận ---"
                />
            </Form.Item>

            <Form.Item
                label="Tên phòng ban"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Tên phòng ban không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mã phòng ban"
                name="code"
                rules={[
                    {
                        required: true,
                        message: 'Mã phòng ban không được để trống!',
                    },
                ]}
            >
                <Input readOnly={detailData.id ? true : false} />
            </Form.Item>

            <Form.Item label="Địa điểm" name="location">
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 10,
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
