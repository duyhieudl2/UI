import React, { useState } from 'react';
import { FileDoneOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as commonServices from '../../api/commonServices';
import { useEffect } from 'react';

function getItem(label, key, icon, children, type, link) {
    return {
        key,
        icon,
        children,
        label,
        type,
        link,
    };
}

export default function Sidebar(props) {
    const dataMenu = props.dataMenu;

    const items = dataMenu?.map((array, index) => {
        return getItem(
            array.name,
            'sub' + index,
            <SettingOutlined />,
            array.subItems?.map((item, index2) => {
                return getItem(
                    <Link to={item.url} className="link">
                        {item.name}
                    </Link>,
                    'g' + index + index2,
                );
            }),
        );
    });

    // getItem('Quản trị hệ thống', 'sub1', <SettingOutlined />, [
    //     getItem(
    //         <Link to="/users" className="link">
    //             Quản lý người dùng
    //         </Link>,
    //         'g1',
    //     ),
    // ]),

    // getItem(
    //     'Báo cáo',
    //     'sub2',
    //     <FileDoneOutlined />,
    //     dateMenu?.map((array, index) =>
    //         getItem(
    //             <Link to={array.url} className="link">
    //                 {array.name}
    //             </Link>,
    //         ),
    //     ),
    // ),
    const onClick = (e) => {
        console.log('click ', e);
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
}
