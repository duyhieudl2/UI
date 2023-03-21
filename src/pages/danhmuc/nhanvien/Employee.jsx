import React, { Fragment } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Form, Spin, Modal, Tooltip } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CreateOrEditEmployee from './CreateOrEditEmployee';
import { DEFAULT_PAGESIZE, DEFAULT_PAGEINDEX, STATUSCODE_200 } from '~/utils/constants';
import { authGetData, authDeleteData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import FormBoLoc from './list-bo-loc';

export default function Employee() {
    const [open, setOpen] = useState(false);
    const [detailData, setDetailData] = useState({});

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
        status: 1,
        ...parseParams(location.search),
    });

    // Get List NHÂN VIÊN
    const getEmployeeList = useCallback(() => {
        const query = buildQueryString(filterConditions);
        authGetData({
            url: `${Endpoint.CRUD_EMPLOYEE}?${query}`,
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
        getEmployeeList();
    }, [filterConditions]);

    // Edit
    const handleOpenModal = useCallback(
        (row) => {
            if (row !== undefined) setDetailData(row);
            else setDetailData({});
            setOpen(!open);
        },
        [open],
    );

    const handleDelete = useCallback((id) => {
        authDeleteData({
            url: `${Endpoint.CRUD_EMPLOYEE}/${id}`,
            setLoading,
            onSuccess: () => {
                getEmployeeList();
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
        setFilterConditions((oldState) => ({
            ...oldState,
            ...values,
            pageIndex: DEFAULT_PAGEINDEX,
            pageSize: DEFAULT_PAGESIZE,
        }));
    }, []);

    const columns = [
        {
            title: 'STT',
            width: '5%',
            dataIndex: 'STT',
            fixed: 'left',
        },
        {
            title: 'Tên nhân viên',
            width: '20%',
            dataIndex: 'name',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Mã nhân viên',
            width: '10%',
            dataIndex: 'code',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Phòng ban',
            width: '20%',
            dataIndex: 'departmentName',
        },
        {
            title: 'Chức vụ',
            width: '25%',
            dataIndex: 'positionName',
        },
        {
            title: 'Mã quản lý',
            width: '10%',
            dataIndex: 'qlCode',
        },
        {
            title: 'Tác vụ',
            width: 100,
            fixed: 'center',
            render: (row) => (
                <div>
                    <a className="edit-icons">
                        <Tooltip title="Sửa">
                            <EditOutlined onClick={() => handleOpenModal(row)} />
                        </Tooltip>
                    </a>

                    {/* <a className="delete-icons">
                        <Tooltip title="Xóa">
                            <DeleteOutlined onClick={() => handleDelete(row.id)} />
                        </Tooltip>
                    </a> */}
                </div>
            ),
        },
    ];

    console.log('filterConditions.pageIndex ' + filterConditions.pageIndex);
    return (
        <>
            <Spin spinning={loading}>
                <FormBoLoc handleSearch={handleSearch} handleOpenModal={handleOpenModal} form={form} />
                <div>
                    <Modal
                        open={open}
                        title={detailData.id ? 'Cập nhật nhân viên' : 'Thêm mới'}
                        onCancel={handleCancel}
                        footer={[]}
                        width="800px"
                    >
                        <CreateOrEditEmployee
                            getEmployeeList={getEmployeeList}
                            close={handleCancel}
                            detailData={detailData}
                        />
                    </Modal>
                </div>
                {/* <ListFilter handleSearch={handleSearch} /> */}
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey={(record) => record.id}
                        onChange={onChangePagination}
                        pagination={{
                            current: filterConditions.pageIndex,
                            defaultPageSize: filterConditions.pageSize,
                            defaultPageIndex: filterConditions.pageIndex,
                            showSizeChanger: true,
                            total: total ? total : 0,
                            pageSizeOptions: ['5', '10', '20', '50', '100'],
                        }}
                    />
                </div>
            </Spin>
        </>
    );
}
