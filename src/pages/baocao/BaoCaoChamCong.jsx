import { buildQueryString, parseParams } from '../../utils/function';
import React, { useCallback, useEffect, useState, map, useForm, useRef } from 'react';
import { Col, Form, Row, Button, DatePicker, Space, Input, Select, notification } from 'antd';
import * as commonServices from '../../api/commonServices';
import * as reportServices from '../../api/reportServices';
import { Container } from '@mui/system';
import moment from 'moment';
import './BaoCaoChamCong.css';

export default function BaoCaoChamCong({ link, params, spName, reportName }) {
    console.log('params: ' + params);
    const ref = useRef(null);

    const [form] = Form.useForm();
    useEffect(() => {
        console.log('reset');
        form.resetFields();
    }, [link]);

    // const [filterTaskList, setFilterTaskList] = useState(false);

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await reportServices.chiTietInOut(filterTaskList);
    //         console.log('chitiet' + result);
    //     };
    //     fetchApi();
    // }, [filterTaskList]);

    const handleSearch = useCallback(async (values) => {
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
        const res = await reportServices.downLoadFile(resultValues);

        // console.log(res.headers.get('content-disposition').split('filename=')[1].split(';')[0]);
        const fileName = res.headers.get('content-disposition').split('filename=')[1].split(';')[0];
        if (res && res.data && res.status === 200) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            console.log('url' + res);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        }
    });

    //

    const [dataCH, setListViTriCuaHang] = useState([]);
    const [dataPB, setListPhongBan] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await commonServices.listViTriCuaHang();
            setListViTriCuaHang(result);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await commonServices.listPhongBan();
            setListPhongBan(result);
        };
        fetchApi();
    }, []);
    return (
        <Container>
            <Form
                width="1200px"
                form={form}
                name="filter-form"
                onFinish={handleSearch}
                layout="vertical"
                autoComplete="off"
            >
                <Row gutter={24}>
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
                                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }}></DatePicker>
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
                                    placeholder="End"
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
                                    defaultValue=""
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
        </Container>
    );
}

function getFileName(response) {
    let filename = '';
    const disposition = response.headers['content-disposition'];
    if (disposition && disposition.indexOf('filename') !== -1) {
        const filenameRegex = /UTF-8(.*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
        }
    }
    return filename;
}
