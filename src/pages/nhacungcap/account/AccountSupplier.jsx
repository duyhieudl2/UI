import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Form, Spin, Modal, Tooltip } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CreateAccountSupplier from './CreateOrEditAccountSupplier';
import { DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, STATUSCODE_200 } from '~/utils/constants';
import { authGetData, authDeleteData, downLoadFile } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import moment from 'moment';
import { FORMAT_DATE } from '~/utils/constants';
import FormBoLoc from './list-bo-loc';
import * as reportServices from '~/api/reportServices';

export default function AccountSupplier() {
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
        pageSize: DEFAULT_PAGESIZE,
        pageIndex: DEFAULT_PAGEINDEX,
        ...parseParams(location.search),
    });

    // Get List AccountSupplier
    const getAccountSupplierList = useCallback(() => {
        const query = buildQueryString(filterConditions);
        authGetData({
            url: `${Endpoint.CRUD_ACCOUNT_SUPPLIER}?${query}`,
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
        getAccountSupplierList();
    }, [filterConditions]);

    // Edit
    const handleOpenModal = useCallback(
        (row) => {
            if (row !== undefined) setdetailData(row);
            else setdetailData({});
            setOpen(!open);
            console.log(detailData);
        },
        [open],
    );

    const handleDelete = useCallback((id) => {
        authDeleteData({
            url: `${Endpoint.CRUD_ACCOUNT_SUPPLIER}/${id}`,
            setLoading,
            onSuccess: () => {
                getAccountSupplierList();
            },
        });
    });

    const handleCancel = useCallback(() => {
        setOpen(false);
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

    const columns = [
        {
            title: 'Tên đăng nhập',
            width: '15%',
            dataIndex: 'userName',
            fixed: 'center',
        },
        {
            title: 'Họ và tên',
            width: '15%',
            dataIndex: 'name',
            fixed: 'center',
        },
        {
            title: 'Số điện thoại',
            width: '15%',
            dataIndex: 'phone',
            fixed: 'center',
        },
        {
            title: 'Email',
            width: '15%',
            dataIndex: 'email',
            fixed: 'center',
        },
        {
            title: 'Tác vụ',
            width: '5%',
            fixed: 'center',

            key: 'id',
            render: (row) => (
                <div>
                    <a className="edit-icons">
                        <Tooltip title="Sửa">
                            <EditOutlined onClick={() => handleOpenModal(row)} />
                        </Tooltip>
                    </a>

                    <a className="delete-icons">
                        <Tooltip title="Xóa">
                            <DeleteOutlined onClick={() => handleDelete(row.id)} />
                        </Tooltip>
                    </a>
                </div>
            ),
        },
    ];
    return (
        <div className="table-container">
            <Spin spinning={loading}>
                <Modal
                    open={open}
                    title={detailData.id ? 'Cập nhật AccountSupplier' : 'Thêm mới'}
                    onCancel={handleCancel}
                    footer={[]}
                    width="800px"
                >
                    <CreateAccountSupplier
                        getAccountSupplierList={getAccountSupplierList}
                        close={handleCancel}
                        detailData={detailData}
                    />
                </Modal>
                <div className="filter-table">
                    <FormBoLoc handleSearch={handleSearch} handleOpenModal={handleOpenModal} form={form} />
                </div>
                {/* <ListFilter handleSearch={handleSearch} /> */}
                <div className="table-list">
                    <Table
                        columns={columns}
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
