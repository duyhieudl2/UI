import React, { Fragment } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Form, Spin, Modal, Tooltip } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CreateOrEditShift from './CreateOrEditShift';
import { STATUSCODE_200 } from '~/utils/constants';
import { authGetData, authDeleteData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import FormBoLoc from './list-bo-loc';
import { DEFAULT_PAGESIZE, DEFAULT_PAGEINDEX } from '~/utils/constants';

export default function Shift() {
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
        ...parseParams(location.search),
    });

    // Get List PHÒNG BAN
    const getShiftList = useCallback(() => {
        const query = buildQueryString(filterConditions);
        authGetData({
            url: `${Endpoint.CRUD_SHIFT}?${query}`,
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
        getShiftList();
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
            url: `${Endpoint.CRUD_SHIFT}/${id}`,
            setLoading,
            onSuccess: () => {
                getShiftList();
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
            title: 'Tên ca',
            width: '20%',
            dataIndex: 'name',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Mã ca',
            width: '10%',
            dataIndex: 'code',
        },
        {
            title: 'Loại',
            width: '10%',
            dataIndex: 'type',
        },
        {
            title: 'Thời gian',
            width: '15%',
            dataIndex: 'timeOne',
            render: (value) => (
                <span>
                    {value[0]} - {value[1]}
                </span>
            ),
        },
        {
            title: 'Thời gian',
            width: '15%',
            dataIndex: 'timeTwo',
            render: (value) => (
                <span>
                    {value[0]} - {value[1]}
                </span>
            ),
        },
        {
            title: 'Thời gian làm việc',
            width: '10%',
            dataIndex: 'workTime',
        },
        {
            title: 'Giải lao',
            width: '5%',
            dataIndex: 'idleTime',
        },
        {
            title: 'Tác vụ',
            width: 150,
            fixed: 'center',
            render: (row) => (
                <div>
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
                        title={detailData.id ? 'Cập nhật phòng ban' : 'Thêm mới'}
                        onCancel={handleCancel}
                        footer={[]}
                        width="800px"
                    >
                        <CreateOrEditShift getShiftList={getShiftList} close={handleCancel} detailData={detailData} />
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
