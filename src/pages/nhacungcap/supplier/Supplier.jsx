import React, { Fragment } from 'react';
import { EditOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Table, Form, Spin, Modal, Tooltip } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CreateSupplier from './CreateOrEditSupplier';
import AddUser from './AddUser';
import { DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, STATUSCODE_200 } from '~/utils/constants';
import { authGetData, authDeleteData, downLoadFile } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import FormBoLoc from './list-bo-loc';

export default function Supplier() {
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);
    const [detailData, setdetailData] = useState({});

    const [loading, setLoading] = useState(false);
    const [, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState();
    const [isDoubleClick] = useState(true);
    const [form] = Form.useForm();

    const [filterConditions, setFilterConditions] = useState({
        pageSize: parseParams(location.search).pageSize || DEFAULT_PAGESIZE,
        pageIndex: parseParams(location.search).pageIndex || DEFAULT_PAGEINDEX,
        ...parseParams(location.search),
    });

    // Get List Supplier
    const getSupplierList = useCallback(() => {
        const query = buildQueryString(filterConditions);
        authGetData({
            url: `${Endpoint.CRUD_SUPPLIER}?${query}`,
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === STATUSCODE_200) {
                    // setData(res.data);
                    setData(
                        res.data.map((item, index) => {
                            return {
                                ...item,
                                STT: (filterConditions.pageIndex - 1) * filterConditions.pageSize + (index + 1),
                            };
                        }),
                    );
                    setTotal(res.paging.totalCount);
                }
            },
        });
        setSearchParams(removeUndefinedAttribute(filterConditions));
    }, [filterConditions]);
    useEffect(() => {
        getSupplierList();
    }, [filterConditions]);

    // Edit
    const handleOpenModal = useCallback(
        (row) => {
            if (row !== undefined) setdetailData(row);
            else setdetailData({});
            setOpen(!open);
        },
        [open],
    );

    // Add user
    const handleOpenModelAddUser = useCallback(
        (row) => {
            if (row !== undefined) setdetailData(row);
            else setdetailData({});
            setOpen2(!open2);
            console.log(detailData);
        },
        [open2],
    );

    const handleCancel = useCallback(() => {
        setOpen(false);
        setOpen2(false);
    }, []);

    // Handler Search

    const onChangePagination = (paging, filters, sorter) => {
        handlePagination(paging, sorter, setFilterConditions);
    };

    const handleSearch = useCallback((values) => {
        console.log(JSON.stringify(values));
        setFilterConditions((oldState) => ({
            ...oldState,
            ...values,
            pageIndex: DEFAULT_PAGEINDEX,
            pageSize: DEFAULT_PAGESIZE,
        }));
    }, []);

    const handleExportExcel = useCallback(async (values) => {
        const query = buildQueryString(values);
        const params = `/${Endpoint.EX_EXCEL_SUPPLIER}?${query}`;
        const res = await downLoadFile(params);

        const fileName = 'NCC.xlsx';
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
    });

    const columns = [
        {
            title: 'Tác vụ',
            width: '10%',
            fixed: 'left',

            key: 'id',
            render: (row) => (
                <div>
                    <a className="edit-icons">
                        <Tooltip title="Sửa">
                            <EditOutlined onClick={() => handleOpenModal(row)} />
                        </Tooltip>
                    </a>
                    <a className="add-users-icons">
                        <Tooltip title="Thêm người dùng">
                            <UsergroupAddOutlined onClick={() => handleOpenModelAddUser(row)} />
                        </Tooltip>
                    </a>
                </div>
            ),
        },
        {
            title: 'Tên người LH',
            width: '15%',
            dataIndex: 'contactName',
            fixed: 'left',
        },
        {
            title: 'SĐT LH người đặt hàng',
            width: '15%',
            dataIndex: 'contactPhone',
            fixed: 'left',
        },
        {
            title: 'Email',
            width: '15%',
            dataIndex: 'contactEmail',
            fixed: 'left',
        },
        {
            title: 'Mã nhà cung cấp',
            width: '20%',
            dataIndex: 'code',
            fixed: 'center',
        },
        {
            title: 'Tên nhà cung cấp',
            width: '25%',
            dataIndex: 'name',
            fixed: 'center',
        },

        {
            title: 'Ngành',
            width: '10%',
            dataIndex: 'branchName',
            fixed: 'center',
        },
        {
            title: 'Loại hợp đồng',
            width: '15%',
            dataIndex: 'contractType',
            fixed: 'center',
            render: (contractType) => {
                if (contractType === 1) {
                    return <div>Thanh lý</div>;
                } else if (contractType === 2) {
                    return <div>Mua bán</div>;
                } else {
                    return null;
                }
            },
        },
        {
            title: 'MOQ Mart',
            width: '20%',
            dataIndex: 'moqMart',
            fixed: 'center',
        },
        {
            title: 'MOQ Mini MB',
            width: '20%',
            dataIndex: 'moqMiniMB',
            fixed: 'center',
        },
        {
            title: 'MOQ MINI MN',
            width: '20%',
            dataIndex: 'moqMiniMN',
            fixed: 'center',
        },
        {
            title: 'Nhóm ĐK đổi trả',
            width: '15%',
            dataIndex: 'isReturn',
            fixed: 'center',
            render: (isReturn) =>
                isReturn ? (
                    <span style={{ color: '#18b428', fontWeight: 'bold' }}>Có đổi trả</span>
                ) : (
                    <span style={{ color: '#ff3500', fontWeight: 'bold' }}>Không đổi trả</span>
                ),
        },
        {
            title: 'ĐK đổi trả',
            width: '15%',
            dataIndex: 'returnNode',
            fixed: 'center',
        },
        {
            title: 'Thời hạn thanh toán trên HĐ',
            width: '15%',
            dataIndex: 'paymentTerm',
            fixed: 'center',
        },
        {
            title: 'Số ngày thanh toán',
            width: '15%',
            dataIndex: 'paymentDays',
            fixed: 'center',
        },
        {
            title: 'Công nợ gối đầu',
            width: '15%',
            dataIndex: 'debtPillow',
            fixed: 'center',
        },
    ];

    return (
        <div className="table-container">
            <Spin spinning={loading}>
                <Modal open={open2} title={'Thêm người dùng'} onCancel={handleCancel} footer={[]} width="800px">
                    <AddUser getSupplierList={getSupplierList} close={handleCancel} detailData={detailData} />
                </Modal>
                <Modal
                    className="centered-modal"
                    open={open}
                    title={detailData.id ? 'Cập nhật Supplier' : 'Thêm mới'}
                    onCancel={handleCancel}
                    footer={[]}
                    width="900px"
                    style={{ top: 'auto', paddingTop: 20 }}
                    closable={false}
                >
                    <CreateSupplier getSupplierList={getSupplierList} close={handleCancel} detailData={detailData} />
                </Modal>
                <div className="filter-table">
                    <FormBoLoc handleSearch={handleSearch} handleExportExcel={handleExportExcel} form={form} />
                </div>
                <div className="table-list">
                    <Table
                        columns={columns}
                        scroll={{ x: 2300 }}
                        dataSource={data}
                        rowKey={(record) => record.id}
                        onChange={onChangePagination}
                        pagination={{
                            total: total ? total : 0,
                            defaultpageSize: DEFAULT_PAGESIZE,
                            defaultCurrent: 1,
                            current: parseInt(filterConditions.pageIndex),
                            pageSize: parseInt(filterConditions.pageSize),
                            showSizeChanger: true,
                            showLessItems: true,
                            pageSizeOptions: ['5', '10', '20', '50', '100'],
                            showTotal: (total) => `Tổng ${total} bản ghi`,
                        }}
                        bordered
                    />
                </div>
            </Spin>
        </div>
    );
}
