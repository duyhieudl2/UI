import { Button, Col, Form, Input, Row, Tooltip, Select } from 'antd';
import Selection from '~/components/Select';
import { Endpoint } from '~/utils/endpoint';
import React, { useCallback, useEffect } from 'react';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { EMPLOYEE_STATUS } from '~/utils/constants';
export default function FormBoLoc(props) {
    const { handleSearch, form, handleOpenModal } = props;

    const handleChangeDivision = useCallback(() => {
        form.setFieldsValue({
            departmentCode: undefined,
        });
    }, [form]);

    return (
        <Form
            width="1200px"
            form={form}
            name="filter-form"
            onFinish={handleSearch}
            layout="vertical"
            autoComplete="off"
        >
            <Row gutter={24} justify="space-between" align="middle">
                <Col span={24} sm={12} xl={8}>
                    <Form.Item label="Bộ phận" name="divisionCode">
                        <Selection
                            url={Endpoint.LIST_BOPHAN}
                            form={form}
                            formKey="divisionCode"
                            setValue={handleChangeDivision}
                        />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues.divisionCode !== currentValues.divisionCode
                        }
                    >
                        {({ getFieldValue }) => {
                            if (getFieldValue('divisionCode')) {
                                return (
                                    <Form.Item name="departmentCode" label="Phòng/Ban">
                                        <Selection
                                            url={`${Endpoint.LIST_PHONGBAN}?divisionCode=${getFieldValue(
                                                'divisionCode',
                                            )}`}
                                            formKey="departmentCode"
                                            form={form}
                                            disabled={!getFieldValue('divisionCode')}
                                        />
                                    </Form.Item>
                                );
                            }
                            return (
                                <Form.Item name="departmentCode" label="Phòng/Ban">
                                    <Select disabled />
                                </Form.Item>
                            );
                        }}
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item name="positionCode" label="Chức vụ">
                        <Selection url={Endpoint.LIST_CHUCVU} formKey="positionCode" form={form} />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item name="searchTerm" label="Tìm kiếm dữ liệu">
                        <Input
                            prefix={<SearchOutlined />}
                            suffix={
                                <Tooltip
                                    title={'Hỗ trợ tìm kiếm theo Tên đăng nhập, Tên đầy đủ, Mã nhân viên, Mã quản lý'}
                                >
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8}>
                    <Form.Item name="status" label="Trạng thái">
                        <Selection defaultValue="1" url={EMPLOYEE_STATUS} form={form} formKey="status" />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '15px' }} form="filter-form">
                        Tìm kiếm
                    </Button>

                    <Button type="primary" onClick={() => handleOpenModal()}>
                        Thêm mới
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
