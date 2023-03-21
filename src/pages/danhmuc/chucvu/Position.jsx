import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Form, Spin, Modal, Tooltip } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CreateOrEditPosition from './CreateOrEditPosition';
import { DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, STATUSCODE_200 } from '~/utils/constants';
import { authGetData, authDeleteData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import moment from 'moment';
import { FORMAT_DATE } from '~/utils/constants';
import FormBoLoc from './list-bo-loc';

export default function Position() {
    const [open, setOpen] = useState(false);
    const [detailPosition, setDetailPosition] = useState({});

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
    const getPositionList = useCallback(() => {
        const query = buildQueryString(filterConditions);
        authGetData({
            url: `${Endpoint.CRUD_POSITION}?${query}`,
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
        getPositionList();
    }, [filterConditions]);

    // Edit
    const handleOpenModal = useCallback(
        (row) => {
            if (row !== undefined) setDetailPosition(row);
            else setDetailPosition({});
            setOpen(!open);
            console.log(detailPosition);
        },
        [open],
    );

    const handleDelete = useCallback((id) => {
        authDeleteData({
            url: `${Endpoint.CRUD_POSITION}/${id}`,
            setLoading,
            onSuccess: () => {
                getPositionList();
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
        console.log('search: ' + JSON.stringify(values));
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
            title: 'Tên chức vụ',
            width: '30%',
            dataIndex: 'name',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Mã chức vụ',
            width: '20%',
            dataIndex: 'code',
        },
        {
            title: 'Ngày tạo',
            width: '15%',
            dataIndex: 'createdDate',
            fixed: 'center',
            render: (createdDate) => <span>{createdDate ? moment(createdDate).format(FORMAT_DATE) : null}</span>,
        },
        {
            title: 'Ngày cập nhật',
            width: '15%',
            dataIndex: 'updatedDate',
            fixed: 'center',
            render: (createdDate) => <span>{createdDate ? moment(createdDate).format(FORMAT_DATE) : null}</span>,
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
                <FormBoLoc handleSearch={handleSearch} handleOpenModal={handleOpenModal} form={form} />
                <div>
                    <Modal
                        open={open}
                        title={detailPosition.id ? 'Cập nhật bộ phận' : 'Thêm mới'}
                        onCancel={handleCancel}
                        footer={[]}
                        width="800px"
                    >
                        <CreateOrEditPosition
                            getPositionList={getPositionList}
                            close={handleCancel}
                            detailPosition={detailPosition}
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
