import React, { useEffect, useState, useCallback } from 'react';
import { Button, Row, Col, Form, Input, Select, Tabs, Tooltip, TextArea, Radio, Table, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { authPostData, authGetData, authDeleteData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';
import { STATUSCODE_200 } from '~/utils/constants';
import moment from 'moment';
import { FORMAT_DATE } from '~/utils/constants';
import AddContact from './AddContact';

export default function CreateSupplier(props) {
    const [open, setOpen] = useState(false);

    const [contact, setContact] = useState(null);
    const { Option } = Select;
    const { TextArea } = Input;
    const { TabPane } = Tabs;
    const [form] = Form.useForm();
    const { getSupplierList, close, detailData } = props;
    const [listContact, setListContact] = useState();
    const [listContactHistory, setListContactHistory] = useState();

    const getListContact = useCallback(() => {
        authGetData({
            url: `${Endpoint.GET_LIST_CONTACT}?id=${detailData.id}`,
            method: 'GET',
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === STATUSCODE_200) {
                    setListContact(res.data);
                }
            },
        });
    });

    const getListContactHistory = useCallback(() => {
        authGetData({
            url: `${Endpoint.GET_LIST_CONTACT_HISTORY}?id=${detailData.id}`,
            method: 'GET',
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === STATUSCODE_200) {
                    setListContactHistory(res.data);
                }
            },
        });
    });

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
        getListContact();
        getListContactHistory();
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

    const handleDelete = useCallback((id) => {
        authDeleteData({
            url: `${Endpoint.DELETE_CONTACT}/${id}`,
            setLoading,
            onSuccess: () => {
                getListContact();
            },
        });
    });
    const handleCancel = useCallback(() => {
        setOpen(false);
    }, []);

    const handleAddContact = useCallback(
        (row) => {
            setContact(row);
            setOpen(!open);
        },
        [open],
    );

    const columns = [
        {
            title: 'Tên người liên hệ',
            width: '20%',
            dataIndex: 'name',
            fixed: 'center',
        },
        {
            title: 'Email',
            width: '20%',
            dataIndex: 'email',
            fixed: 'center',
        },
        {
            title: 'Số điện thoại',
            width: '15%',
            dataIndex: 'phone',
            fixed: 'center',
        },
        {
            title: 'Ngày tạo',
            width: '10%',
            dataIndex: 'createdDate',
            fixed: 'center',
            render: (createdDate) => <span>{createdDate ? moment(createdDate).format(FORMAT_DATE) : null}</span>,
        },
    ];
    const columnsUpdate = [
        {
            title: 'Tên người liên hệ',
            width: '20%',
            dataIndex: 'name',
            fixed: 'center',
        },
        {
            title: 'Email',
            width: '17%',
            dataIndex: 'email',
            fixed: 'center',
        },
        {
            title: 'Phone',
            width: '15%',
            dataIndex: 'phone',
            fixed: 'center',
        },
        {
            title: 'Ghi chú',
            width: '25%',
            dataIndex: 'description',
            fixed: 'center',
        },
        {
            title: 'Tác vụ',
            width: '12%',
            fixed: 'center',
            render: (row) => (
                <>
                    <div>
                        <a className="edit-icons">
                            <Tooltip title="Sửa">
                                <EditOutlined onClick={() => handleAddContact(row)} />
                            </Tooltip>
                        </a>
                    </div>
                    <div>
                        <a className="delete-icons">
                            <Tooltip title="Xóa">
                                <DeleteOutlined onClick={() => handleDelete(row.id)} />
                            </Tooltip>
                        </a>
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            <Modal open={open} title={'Thêm người liên hệ'} onCancel={handleCancel} footer={[]} width="500px">
                <AddContact
                    getListContact={getListContact}
                    getListContactHistory={getListContactHistory}
                    close={handleCancel}
                    supplierId={detailData.id}
                    contact={contact}
                    getSupplierList={getSupplierList}
                />
            </Modal>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Cập nhật thông tin liên hệ" key="1">
                    <Form
                        form={form}
                        name="filter-form"
                        onFinish={onFinish}
                        layout="vertical"
                        autoComplete="off"
                        style={{ margin: 10, maxHeight: 520, overflowY: 'auto', overflowX: 'hidden' }}
                    >
                        <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
                        <Row gutter={24} justify="space-between" align="middle" style={{ marginBottom: 30 }}>
                            <Col span={24} sm={20} xl={20}>
                                <Table
                                    columns={columnsUpdate}
                                    dataSource={listContact}
                                    rowKey={(record) => record.id}
                                    bordered
                                    pagination={false}
                                />
                            </Col>

                            <Col span={24} sm={4} xl={4} style={{ textAlign: 'center', marginTop: '15px' }}>
                                <Button type="primary" onClick={handleAddContact}>
                                    Thêm liên hệ
                                </Button>
                            </Col>
                        </Row>
                        <Row gutter={24} justify="space-between" align="middle">
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item
                                    label="Mã nhà cung cấp"
                                    name="code"
                                    style={{ marginBottom: '8px', marginTop: '-8px' }}
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item
                                    label="Tên nhà cung cấp"
                                    name="name"
                                    style={{ marginBottom: '8px', marginTop: '-8px' }}
                                >
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
                                <Form.Item
                                    label="Thời hạn thanh toán trên HĐ"
                                    name="paymentTerm"
                                    style={{ marginBottom: '8px' }}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item
                                    label="Số ngày thanh toán"
                                    name="paymentDays"
                                    style={{ marginBottom: '8px' }}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item name="isReturn" label="Nhóm ĐK đổi trả" style={{ marginBottom: '8px' }}>
                                    <Select defaultValue={false} value="isReturn">
                                        <Option value={false}>Không đổi trả</Option>
                                        <Option value={true}>Có đổi trả</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item
                                    name="returnNode"
                                    label="Diễn giải điều kiện đổi trả"
                                    style={{ marginBottom: '8px' }}
                                >
                                    <TextArea rows={1} />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item label="Công nợ gối đầu" name="debtPillow" style={{ marginBottom: '8px' }}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item label="MOQ Mart" name="moqMart" style={{ marginBottom: '8px' }}>
                                    <TextArea rows={1} />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item label="MOQ Mart" name="moqMiniMB" style={{ marginBottom: '8px' }}>
                                    <TextArea rows={1} />
                                </Form.Item>
                            </Col>
                            <Col span={24} sm={12} xl={12}>
                                <Form.Item label="MOQ Mart" name="moqMiniMN" style={{ marginBottom: '8px' }}>
                                    <TextArea rows={1} />
                                </Form.Item>
                            </Col>
                            <Col
                                span={24}
                                sm={24}
                                xl={24}
                                // style={{ textAlign: 'center', marginBottom: '5px', paddingTop: '10px' }}
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    position: 'absolute',
                                    justifyItems: 'center',
                                    background: 'white',
                                    paddingTop: '15px',
                                    marginTop: '90px',
                                    marginBottom: '15px',
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Xác nhận
                                </Button>
                                <Button type="primary" style={{ marginLeft: 20 }} onClick={close}>
                                    Đóng lại
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane tab="Lịch sử người liên hệ" key="2">
                    <Table
                        style={{ margin: 10, maxHeight: 520, overflowY: 'auto', overflowX: 'hidden' }}
                        columns={columns}
                        dataSource={listContactHistory}
                        bordered
                    />
                </TabPane>
            </Tabs>
        </>
    );
}
