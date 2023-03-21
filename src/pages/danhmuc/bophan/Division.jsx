import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Form, Spin, Modal, Tooltip } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CreateDivision from './CreateDivision';
import { DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, STATUSCODE_200 } from '~/utils/constants';
import { authGetData, authDeleteData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import moment from 'moment';
import { FORMAT_DATE } from '~/utils/constants';
import FormBoLoc from './list-bo-loc';

export default function Division() {
    const [open, setOpen] = useState(false);
    const [detailDivision, setDetailDivision] = useState({});

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

    // Get List Bộ phận
    const getDivisionList = useCallback(() => {
        const query = buildQueryString(filterConditions);
        authGetData({
            url: `${Endpoint.CRUD_DIVISION}?${query}`,
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
        getDivisionList();
    }, [filterConditions]);

    // Edit
    const handleOpenModal = useCallback(
        (row) => {
            if (row !== undefined) setDetailDivision(row);
            else setDetailDivision({});
            setOpen(!open);
            console.log(detailDivision);
        },
        [open],
    );

    const handleDelete = useCallback((id) => {
        authDeleteData({
            url: `${Endpoint.CRUD_DIVISION}/${id}`,
            setLoading,
            onSuccess: () => {
                getDivisionList();
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
            title: 'STT',
            width: 100,
            dataIndex: 'STT',
            fixed: 'left',
        },
        {
            title: 'Tên bộ phận',
            width: '30%',
            dataIndex: 'name',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Mã bộ phận',
            width: '20%',
            dataIndex: 'code',
            fixed: 'center',
        },
        {
            title: 'Ngày tạo',
            width: '10%',
            dataIndex: 'createdDate',
            fixed: 'center',
            render: (createdDate) => <span>{createdDate ? moment(createdDate).format(FORMAT_DATE) : null}</span>,
        },
        {
            title: 'Ngày cập nhật',
            width: '10%',
            dataIndex: 'updatedDate',
            fixed: 'center',
            render: (createdDate) => <span>{createdDate ? moment(createdDate).format(FORMAT_DATE) : null}</span>,
        },
        {
            title: 'Thao tác',
            width: '10%',
            render: () => <a>Hoạt động</a>,
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
    return (
        <>
            <Spin spinning={loading}>
                <div>
                    <FormBoLoc handleSearch={handleSearch} handleOpenModal={handleOpenModal} form={form} />
                    <Modal
                        open={open}
                        title={detailDivision.id ? 'Cập nhật bộ phận' : 'Thêm mới'}
                        onCancel={handleCancel}
                        footer={[]}
                        width="800px"
                    >
                        <CreateDivision
                            getDivisionList={getDivisionList}
                            close={handleCancel}
                            detailDivision={detailDivision}
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
