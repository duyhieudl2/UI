import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Space, Form, Input, Select, Option, Spin, EditOutlined } from 'antd';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';
import moment from 'moment';

export default function CreateOrEditShift(props) {
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();

    const [timeOne, setTimeOne] = useState(null);
    const [timeTwo, setTimeTwo] = useState(null);

    useEffect(() => {
        setTimeOne(null);
        setTimeTwo(null);
    }, []);
    const { getShiftList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log('dsadsa' + JSON.stringify(values));
        authPostData({
            url: `${Endpoint.CRUD_SHIFT}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
                timeOne: timeOne,
                timeTwo: timeTwo,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getShiftList();
                } else {
                    getErrorForm(res, form);
                }
            },
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeTime1 = (value, dateString) => {
        setTimeOne(dateString);
    };
    const onChangeTime2 = (value, dateString) => {
        setTimeTwo(dateString);
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
                label="Tên ca"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Tên ca không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mã ca"
                name="code"
                rules={[
                    {
                        required: true,
                        message: 'Mã không được để trống!',
                    },
                ]}
            >
                <Input readOnly={detailData.id ? true : false} />
            </Form.Item>

            <Form.Item
                label="Loại"
                name="type"
                rules={[
                    {
                        required: true,
                        message: 'Loại không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Thời gian 1"
                name="timeOne"
                rules={[
                    {
                        required: true,
                        message: 'Thời gian được để trống!',
                    },
                ]}
            >
                <RangePicker onChange={onChangeTime1} picker="time" />
            </Form.Item>

            <Form.Item label="Thời gian 2" name="timeTwo">
                <RangePicker picker="time" onChange={onChangeTime2} />
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
