import React from 'react';
import { Table } from 'antd';
import { buildQueryString, parseParams, handlePagination } from '~/utils/function';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import CreateUser from './CreateOrEditUser';
import { Button, Modal, Pagination } from 'antd';
import { ListFilter } from './list-bo-loc';

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
    const [data, setUserList] = useState([]);
    const location = useLocation();
    const [filterConditions, setFilterConditions] = useState({
        pageSize: 10,
        pageIndex: 1,
        ...parseParams(location.search),
    });

    const getUserList = useCallback(() => {
        authGetData({
            url: `${Endpoint.LIST_USERS}?${buildQueryString(filterConditions)}`,
            onSuccess: (res) => {
                if (res.statusCode === 200) {
                    setUserList(res.data);
                }
            },
        });
    }, [filterConditions]);

    useEffect(() => {
        authGetData({
            url: `${Endpoint.LIST_USERS}?${buildQueryString(filterConditions)}`,
            onSuccess: (res) => {
                if (res.statusCode === 200) {
                    setUserList(res.data);
                }
            },
        });
    }, [filterConditions]);

    console.log('userData: ' + JSON.stringify(data));

    // // Create Or Edit
    // const [open, setOpen] = useState(false);
    // const showModal = () => {
    //     setOpen(true);
    // };
    // const handleCancel = () => {
    //     setOpen(false);
    // };
    // Handler Search

    const onChangePagination = (paging, filters, sorter) => {
        console.log('change: ' + JSON.stringify(filterConditions));
        handlePagination(paging, sorter, setFilterConditions);
    };

    const handleSearch = useCallback((values) => {
        setFilterConditions((oldState) => ({
            ...filterConditions,
            ...oldState,
            ...values,
        }));
    }, []);

    return (
        <div>
            <ListFilter handleSearch={handleSearch} />
            <div>
                <Table
                    columns={columns}
                    dataSource={data.data}
                    rowKey={(record) => record.id}
                    onChange={onChangePagination}
                    pagination={{
                        defaultPageSize: filterConditions.pageSize,
                        showSizeChanger: true,
                        total: data.paging ? data.paging.totalCount : 0,
                        pageSizeOptions: ['5', '10', '20', '50', '100'],
                    }}
                />
            </div>
        </div>
    );
}
