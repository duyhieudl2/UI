import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Select, Option, Spin, TextArea, Radio } from 'antd';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';
export default function CreateSupplier(props) {
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
            url: `${Endpoint.CRUD_SUPPLIER}`,
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
            style={{ margin: 0 }}
        >
            <Row gutter={24} justify="space-between" align="middle">
                <Col span={24} sm={12} xl={12}>
                    <Form.Item label="Mã nhà cung cấp" name="code" style={{ marginBottom: '8px', marginTop: '-8px' }}>
                        <Input disabled />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={12}>
                    <Form.Item label="Tên nhà cung cấp" name="name" style={{ marginBottom: '8px' }}>
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12} xl={12}>
                    <Form.Item label="Địa chỉ nhà cung cấp" name="address" style={{ marginBottom: '8px' }}>
                        <Input disabled />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={12}>
                    <Form.Item label="Mã số thuế" name="taxCode" style={{ marginBottom: '8px' }}>
                        <Input disabled />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={12}>
                    <Form.Item name="branchId" label="Ngành hàng" style={{ marginBottom: '8px' }}>
                        <Selection url={Endpoint.LIST_NGANHHANG} formKey="branchId" form={form} />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12} xl={12}>
                    <Form.Item name="contractType" label="Loại hợp đồng" style={{ marginBottom: '8px' }}>
                        <Select defaultValue={0} value="contractType">
                            <Option value={0}> </Option>
                            <Option value={1}>Thanh Lý</Option>
                            <Option value={2}>Mua bán</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={12}>
                    <Form.Item label="Thời hạn thanh toán trên HĐ" name="paymentTerm" style={{ marginBottom: '8px' }}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12} xl={12}>
                    <Form.Item label="Số ngày thanh toán" name="paymentDays" style={{ marginBottom: '8px' }}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={12}>
                    <Form.Item label="Công nợ gối đầu" name="debtPillow" style={{ marginBottom: '8px' }}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} sm={12} xl={12}>
                    <Form.Item name="isReturn" label="Nhóm ĐK đổi trả" style={{ marginBottom: '8px' }}>
                        <Select defaultValue={0} value="isReturn">
                            <Option value={0}>Không đổi trả</Option>
                            <Option value={1}>Có đổi trả</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} sm={12} xl={8}>
                    <Form.Item label="MOQ Mart" name="moqMart" style={{ marginBottom: '8px' }}>
                        <TextArea rows={2} />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item label="MOQ Mart" name="moqMiniMB" style={{ marginBottom: '8px' }}>
                        <TextArea rows={2} />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item label="MOQ Mart" name="moqMiniMN" style={{ marginBottom: '8px' }}>
                        <TextArea rows={2} />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item label="Tên người liên hệ" name="contactName" style={{ marginBottom: '8px' }}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item label="Số điện thoại" name="contactPhone" style={{ marginBottom: '8px' }}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item label="Email" name="contactEmail" style={{ marginBottom: '8px' }}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} sm={24} xl={24} style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
