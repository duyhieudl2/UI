import React, { useCallback, useEffect } from 'react';
import { Col, Form, Input, Row, Tooltip, Button, Select } from 'antd';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';

export function ListFilter(props) {
    const { handleSearch } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, []);

    return (
        <Form form={form} name="filter-form" onFinish={handleSearch} layout="vertical" autoComplete="off">
            <Row gutter={24}>
                <Col span={24} md={6}>
                    <Form.Item name="searchTerm" label="Tìm kiếm dữ liệu">
                        <Input
                            prefix={<SearchOutlined />}
                            suffix={
                                <Tooltip title={'Hỗ trợ tìm kiếm theo Tên đăng nhập, Tên đầy đủ, Mã nhân viên'}>
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="end">
                <Button type="primary" htmlType="submit" form="filter-form">
                    Tìm kiếm
                </Button>
            </Row>
        </Form>
    );
}
