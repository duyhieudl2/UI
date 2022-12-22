import React, { useState } from 'react';
import { FileDoneOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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

    const naviagete = useNavigate();

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

    const onClick = (e) => {
        console.log('click ', e);
    };

    const logoutHanlder = () => {
        console.log('cleear');
        localStorage.clear();
        naviagete('/login');
    };
    return (
        <div>
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
            <div style={{ textAlign: 'center', paddingTop: 25 }}>
                <button onClick={logoutHanlder} style={{ fontWeight: 800, color: 'red', borderColor: '#acabab' }}>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}
