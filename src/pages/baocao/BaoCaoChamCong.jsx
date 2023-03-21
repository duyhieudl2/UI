import { buildQueryString, parseParams } from '../../utils/function';
import React, { useCallback, useEffect, useState, map, useForm, useRef } from 'react';
import { Col, Form, Row, Button, DatePicker, Option, Input, Select, notification, Spin } from 'antd';
import * as reportServices from '../../api/reportServices';
import { authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import Selection from '~/components/Select';
import moment from 'moment';
import './BaoCaoChamCong.css';

export default function BaoCaoChamCong({ link, params, spName, reportName }) {
    const ref = useRef(null);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields();
    }, [link]);

    const handleSearch = useCallback(async (values) => {
        console.log('values : ' + values.month);
        if (values.month === undefined) {
            const sD = moment(new Date(values.FrDate)).format('YYYY-MM-DD');
            const eD = moment(new Date(values.ToDate)).format('YYYY-MM-DD');
            if (moment(sD).isAfter(eD)) {
                notification.error({ message: 'Đến ngày không được nhỏ hơn từ ngày' });
                return false;
            }
            values.FrDate = sD;
            values.ToDate = eD;
            values.spName = spName;
            const resultValues = buildQueryString(parseParams(values));
            console.log(resultValues);
            const res = await reportServices.downLoadFile(resultValues, setLoading);

            // console.log(res.headers.get('content-disposition').split('filename=')[1].split(';')[0]);
            const fileName = res.headers.get('content-disposition').split('filename=')[1].split(';')[0];
            if (res && res.data && res.status === 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                console.log('url' + res);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `BC${sD}-${eD}.xlsx`);
                document.body.appendChild(link);
                link.click();
            }
        } else {
            values.spName = spName;
            const resultValues = buildQueryString(parseParams(values));
            console.log(resultValues);
            const res = await reportServices.downLoadFile(resultValues, setLoading);

            console.log(res.headers.get('content-disposition'));
            const fileName = res.headers.get('content-disposition').split('filename=')[1].split(';')[0];
            if (res && res.data && res.status === 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                console.log('url' + res);
                const link = document.createElement('a');
                link.href = url;
                const nameFile = fileName.replaceAll('/', '_');
                console.log('NAME2: ' + nameFile);
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            }
        }
    });

    //

    const [dataCH, setListViTriCuaHang] = useState([]);
    const [dataPB, setListPhongBan] = useState([]);

    useEffect(() => {
        authGetData({
            url: `${Endpoint.LIST_LOCATION_STORE}`,
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === 200) {
                    setListViTriCuaHang(res.data);
                }
            },
        });

        // const fetchApi = async () => {
        //     const result = await commonServices.listViTriCuaHang();
        //     setListViTriCuaHang(result);
        // };
        // fetchApi();
    }, []);

    // useEffect(() => {
    //     authGetData({
    //         url: `${Endpoint.LIST_POSITION}`,
    //         onSuccess: (res) => {
    //             if (res.statusCode === 200) {
    //                 setListPhongBan(res.data);
    //             }
    //         },
    //     });
    // }, []);
    return (
        <Spin spinning={loading}>
            <Form
                width="1200px"
                form={form}
                name="filter-form"
                onFinish={handleSearch}
                layout="vertical"
                autoComplete="off"
            >
                <Row gutter={24}>
                    {params.includes('Month') && (
                        <Col span={24} sm={12} xl={8}>
                            <Form.Item
                                name="month"
                                label="Tháng"
                                rules={[
                                    {
                                        message: 'Tháng được để trống!',
                                        required: true,
                                    },
                                ]}
                            >
                                <Selection
                                    url={Endpoint.GET_MONTH}
                                    formKey="month"
                                    form={form}
                                    placeholder="Chọn tháng"
                                />
                            </Form.Item>
                        </Col>
                    )}

                    {params.includes('FrDate') && (
                        <Col span={24} sm={12} xl={8}>
                            <Form.Item
                                name="FrDate"
                                label="Từ ngày"
                                rules={[
                                    {
                                        message: 'Từ ngày không được để trống!',
                                        required: true,
                                    },
                                ]}
                            >
                                <DatePicker
                                    placeholder="--- Chọn ngày ---"
                                    format="DD/MM/YYYY"
                                    style={{ width: '100%' }}
                                ></DatePicker>
                            </Form.Item>
                        </Col>
                    )}

                    {params.includes('ToDate') && (
                        <Col span={24} sm={12} xl={8}>
                            <Form.Item
                                name="ToDate"
                                label="Đến ngày"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Đến ngày không được để trống! ',
                                    },
                                ]}
                            >
                                <DatePicker
                                    placeholder="--- Chọn ngày ---"
                                    format="DD/MM/YYYY"
                                    style={{ width: '100%' }}
                                ></DatePicker>
                            </Form.Item>
                        </Col>
                    )}

                    {params.includes('EmployId') && (
                        <Col span={24} sm={12} xl={8}>
                            <Form.Item
                                label="Mã nhân viên"
                                name="EmployId"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    )}

                    {params.includes('StoreId') && (
                        <Col span={24} sm={12} xl={8}>
                            <Form.Item label="Vị trí" name="StoreId">
                                <Select
                                    showSearch
                                    placeholder="--- Chọn vị trí ---"
                                    style={{
                                        minWidth: 300,
                                    }}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                        option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {Object.entries(dataCH).map(([key, value]) => (
                                        <Select.Option key={key} value={value.value}>
                                            {value.text}
                                        </Select.Option>
                                    ))}
                                    ;
                                </Select>
                            </Form.Item>
                        </Col>
                    )}

                    {params.includes('DepartmentId') && (
                        <Col span={24} sm={12} xl={8}>
                            <Form.Item label="Phòng ban" name="DepartmentId">
                                <Select
                                    defaultValue=""
                                    showSearch
                                    placeholder="--- Chọn phòng ban ---"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                        option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    style={{
                                        minWidth: 300,
                                    }}
                                >
                                    {Object.entries(dataPB).map(([key, value]) => (
                                        <Select.Option key={key} value={value.value}>
                                            {value.text}
                                        </Select.Option>
                                    ))}
                                    ;
                                </Select>
                            </Form.Item>
                        </Col>
                    )}
                </Row>

                <Button type="primary" htmlType="submit" form="filter-form">
                    Xuất Excel
                </Button>
            </Form>
        </Spin>
    );
}
