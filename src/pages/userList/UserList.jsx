import React from 'react';
import { Table } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import CreateUser from './CreateOrEditUser';
import { Button, Modal, Pagination } from 'antd';
import { DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, STATUSCODE_200 } from '~/utils/constants';
import { FormBoLoc } from './list-bo-loc';

const columns = [
    {
        title: 'Họ và tên',
        width: 300,
        dataIndex: 'name',
        fixed: 'left',
    },
    {
        title: 'Tên đăng nhập',
        width: 200,
        dataIndex: 'userName',
        key: 'id',
        fixed: 'left',
    },
    {
        title: 'Email',
        width: 300,
        dataIndex: 'email',
        fixed: 'left',
    },
    {
        title: 'Ngày sinh',
        width: 200,
        dataIndex: 'age',
        fixed: 'left',
    },
    {
        width: 300,
        title: 'Chức vụ',
        dataIndex: 'positionName',
    },
    {
        title: 'Trạng thái',
        fixed: 'right',
        width: 150,
        render: () => <a>Hoạt động</a>,
    },
];

export default function UserList() {
    const [loading, setLoading] = useState(false);
    const [, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const location = useLocation();
    const [total, setTotal] = useState();

    const [filterConditions, setFilterConditions] = useState({
        pageSize: DEFAULT_PAGESIZE,
        pageIndex: DEFAULT_PAGEINDEX,
        ...parseParams(location.search),
    });

    // Get List
    const getUserList = useCallback(() => {
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
        getUserList();
    }, [filterConditions]);

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

    return (
        <div className="table-container">
            <div className="filter-table">
                <FormBoLoc handleSearch={handleSearch} />
            </div>
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
        </div>
    );
}
