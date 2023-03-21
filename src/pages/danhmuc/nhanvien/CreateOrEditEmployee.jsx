import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Button, Row, Col, Form, Input, Select, Radio, Spin, DatePicker } from 'antd';
import { width } from '@mui/system';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';

export default function CreateOrEditEmployee(props) {
    const [form] = Form.useForm();
    const { getEmployeeList, close, detailData } = props;
    console.log(detailData.id);
    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const [loading, setLoading] = useState(false);

    const handleChangeDivision = useCallback(() => {
        form.setFieldsValue({
            departmentCode: undefined,
        });
    }, [form]);

    const onFinish = (values) => {
        console.log('dsadsa' + JSON.stringify(values));
        authPostData({
            url: `${Endpoint.CRUD_EMPLOYEE}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getEmployeeList();
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
            style={{ maxHeight: '400px', overflowY: 'scroll', margin: 'auto' }}
        >
            <Form.Item name="id" style={{ display: 'none' }}></Form.Item>

            <Form.Item
                name="name"
                label="Họ và tên"
                rules={[
                    {
                        required: true,
                        message: 'Họ và tên không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="code"
                label="Mã nhân viên"
                rules={[
                    {
                        required: true,
                        message: 'Mã nhân viên không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="divisionCode"
                label="Bộ phận"
                rules={[
                    {
                        required: true,
                        message: 'Bộ phận không được để trống!',
                    },
                ]}
            >
                <Selection
                    url={Endpoint.LIST_BOPHAN}
                    formKey="divisionCode"
                    form={form}
                    setValue={handleChangeDivision}
                    placeholder="Chọn bộ phận"
                />
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.divisionCode !== currentValues.divisionCode}
            >
                {({ getFieldValue }) => {
                    if (getFieldValue('divisionCode')) {
                        return (
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Phòng ban không được để trống!',
                                    },
                                ]}
                                name="departmentCode"
                                label="Phòng/Ban"
                            >
                                <Selection
                                    url={`${Endpoint.LIST_PHONGBAN}?divisionCode=${getFieldValue('divisionCode')}`}
                                    formKey="departmentCode"
                                    form={form}
                                    disabled={!getFieldValue('divisionCode')}
                                    placeholder="Chọn Phòng/Ban"
                                />
                            </Form.Item>
                        );
                    }
                    return (
                        <Form.Item
                            name="departmentCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Phòng ban không được để trống!',
                                },
                            ]}
                            label="Phòng/Ban"
                        >
                            <Select disabled />
                        </Form.Item>
                    );
                }}
            </Form.Item>

            <Form.Item
                name="positionCode"
                label="Chức vụ"
                rules={[
                    {
                        required: true,
                        message: 'Chức vụ không được để trống!',
                    },
                ]}
            >
                <Selection
                    url={Endpoint.LIST_CHUCVU}
                    formKey="positionCode"
                    form={form}
                    // setValue={handleChangeDivision}
                    placeholder="Chọn chức vụ"
                />
            </Form.Item>

            <Form.Item name="managerCode" label="Quản lý trực tiếp">
                <Selection url={Endpoint.LIST_MANAGER} formKey="managerCode" form={form} placeholder="Chọn quản lý" />
            </Form.Item>

            <Form.Item
                name="abilityCode"
                label="Chức danh"
                rules={[
                    {
                        required: true,
                        message: 'Chức danh không được để trống!',
                    },
                ]}
            >
                <Selection
                    url={Endpoint.LIST_CHUCDANH}
                    formKey="abilityCode"
                    form={form}
                    // setValue={handleChangeDivision}
                    placeholder="Chọn chức vụ"
                />
            </Form.Item>

            {detailData.id === undefined ? (
                <>
                    <Form.Item name="startDate" label="Thời gian bắt đầu">
                        <DatePicker
                            placeholder="--- Chọn ngày ---"
                            format="DD/MM/YYYY"
                            style={{ width: '50%' }}
                        ></DatePicker>
                    </Form.Item>

                    <Form.Item name="endDate" label="Kết thúc hợp đồng">
                        <DatePicker
                            placeholder="--- Chọn ngày ---"
                            format="DD/MM/YYYY"
                            style={{ width: '50%' }}
                        ></DatePicker>
                    </Form.Item>
                </>
            ) : (
                <></>
            )}

            {/* {detailData.id > 0 ==
                true(
                    <>
                        <Form.Item name="dateHire" label="Thời gian bắt đầu">
                            <DatePicker
                                placeholder="--- Chọn ngày ---"
                                format="DD/MM/YYYY"
                                style={{ width: '50%' }}
                            ></DatePicker>
                        </Form.Item>
                        <Form.Item name="dateExpire" label="Kết thúc hợp đồng">
                            <DatePicker
                                placeholder="--- Chọn ngày ---"
                                format="DD/MM/YYYY"
                                style={{ width: '50%' }}
                            ></DatePicker>
                        </Form.Item>
                    </>,
                )} */}
            {/* <Form.Item name="dateHire" label="Thời gian bắt đầu">
                <DatePicker placeholder="--- Chọn ngày ---" format="DD/MM/YYYY" style={{ width: '50%' }}></DatePicker>
            </Form.Item> */}

            {/* <Form.Item name="dateExpire" label="Kết thúc hợp đồng">
                <DatePicker placeholder="--- Chọn ngày ---" format="DD/MM/YYYY" style={{ width: '50%' }}></DatePicker>
            </Form.Item> */}

            {/* <Form.Item name="sex" label="Giới tính">
                <Radio.Group>
                    <Radio value="Nam">Nam</Radio>
                    <Radio value="Nữ">Nữ</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="age" label="Ngày sinh">
                <DatePicker placeholder="--- Chọn ngày ---" format="DD/MM/YYYY" style={{ width: '50%' }}></DatePicker>
            </Form.Item> */}

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
