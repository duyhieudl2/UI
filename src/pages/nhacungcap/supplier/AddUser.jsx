import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Select, Option, Spin, TextArea, Radio } from 'antd';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';
import { Label } from 'recharts';
export default function AddUser(props) {
    const { Option } = Select;
    const { TextArea } = Input;

    const [form] = Form.useForm();
    const { getSupplierList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        authPostData({
            url: `${Endpoint.ADD_ACCOUNT_SUPPLIER_ROLE}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
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

    return (
        <Form
            form={form}
            name="filter-form"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            style={{ marginTop: 20 }}
        >
            <Row gutter={24} justify="space-between" align="middle">
                <Col span={24} sm={24} xl={24}>
                    <Form.Item name="userIds" label="" style={{ marginBottom: '25px', marginTop: '20px' }}>
                        <Selection
                            mode="multiple"
                            url={Endpoint.SELECT_ALL_ACCOUNT_SUPPLIER}
                            formKey="userIds"
                            form={form}
                            placeholder="Chọn"
                        />
                    </Form.Item>
                </Col>
                <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
                <Col span={24} sm={24} xl={24} style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
