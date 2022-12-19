import { buildQueryString, parseParams } from '../../utils/function';
import React, { useCallback, useEffect, useState, map, useForm, useRef } from 'react';
import { Col, Form, Row, Button, DatePicker, Space, Input, Select, notification } from 'antd';
import * as commonServices from '../../api/commonServices';
import * as reportServices from '../../api/reportServices';
import { Container } from '@mui/system';
import moment from 'moment';
import './BaoCaoChamCong.css';

export default function BaoCaoChamCong({ link, params, spName }) {
    console.log(params);
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
        const sD = moment(new Date(values.fromDate)).format('YYYY-MM-DD');
        const eD = moment(new Date(values.toDate)).format('YYYY-MM-DD');
        if (moment(sD).isAfter(eD)) {
            notification.error({ message: 'Đến ngày không được nhỏ hơn từ ngày' });
            return false;
        }
        values.fromDate = sD;
        values.toDate = eD;
        values.spName = spName;
        const resultValues = buildQueryString(parseParams(values));
        console.log(resultValues);
        // setFilterTaskList(resultValues);
        // const fetchApi = async () => {
        //     const result = await reportServices.chiTietInOut(resultValues);
        //     console.log('chitiet' + result);
        // };
        // fetchApi();

        const res = await reportServices.downLoadFile(resultValues);

        console.log('res1111' + res);

        const fileName = 'Ten.xlsx';
        if (res && res.data && res.status === 200) {
            console.log('res 200' + res);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName ? fileName : 'template.xlsx');
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
                    {params.includes('fromDate') && (
                        <Col span={24} xl={8}>
                            <Form.Item
                                name="fromDate"
                                label="Từ ngày"
                                rules={[
                                    {
                                        message: 'Từ ngày không được để trống!',
                                        required: true,
                                    },
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }}></DatePicker>
                            </Form.Item>
                        </Col>
                    )}

                    {params.includes('toDate') && (
                        <Col span={24} xl={8}>
                            <Form.Item
                                name="toDate"
                                label="Đến ngày"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Đến ngày không được để trống! ',
                                    },
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }}></DatePicker>
                            </Form.Item>
                        </Col>
                    )}

                    {params.includes('userId') && (
                        <Col span={24} xl={8}>
                            <Form.Item
                                label="Mã nhân viên"
                                name="userId"
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

                    {params.includes('position') && (
                        <Col span={24} xl={8}>
                            <Form.Item label="Vị trí" name="position">
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

                    {params.includes('department') && (
                        <Col span={24} xl={8}>
                            <Form.Item label="Phòng ban" name="department">
                                <Select
                                    defaultValue=""
                                    showSearch
                                    placeholder="--- Chọn vị trí ---"
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
