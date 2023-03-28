import React, { Fragment, useState } from 'react';
import { FileDoneOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Tooltip, Spin } from 'antd';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '~/store/actions';
import './sidebar.css';

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

export default function Sidebar() {
    const [loading, setLoading] = useState(false);
    let location = useLocation();
    const token = localStorage.getItem('accessToken');
    // const permissions = useSelector((state) => state.currentUser.user.permissions);
    const [dataMenu, setDataMenu] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        authGetData({
            url: `${Endpoint.LIST_MENU_HAS_PERMISSION}`,
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === 200) {
                    setDataMenu(res.data);
                    dispatch(allActions.moduleActions.setModule(res.data));
                }
            },
        });
    }, [token]);

    const naviagete = useNavigate();

    const items = dataMenu.map((array, index) => {
        return getItem(
            <Tooltip placement="right" title={array.name}>
                {array.name}
            </Tooltip>,
            array.name,
            <SettingOutlined />,

            array.subItems.map((item, index2) => {
                return getItem(
                    <Tooltip placement="right" title={item.name}>
                        <Link to={item.url} className="link" key={item.link}>
                            {item.name}
                        </Link>
                    </Tooltip>,
                    item.url,
                );
            }),
        );
    });

    const logoutHanlder = () => {
        localStorage.clear();
        naviagete('/login');
    };

    const [submenu, setSubmenu] = useState([]);

    useEffect(() => {
        if (!dataMenu.find((item) => item.url === location.pathname)) {
            if (
                dataMenu.find((item) => item.subItems && item.subItems.find((item) => item.url === location.pathname))
            ) {
                const currentSubItem = dataMenu.find(
                    (item) => item.subItems && item.subItems.find((item) => item.url === location.pathname),
                );
                setSubmenu([currentSubItem.name]);
            } else {
                setSubmenu([]);
            }
            return;
        }
    }, [dataMenu, location.pathname]);

    const onClick = (e) => {
        console.log('click ', e.keyPath[1]);
    };

    return (
        <Spin spinning={loading}>
            <Menu
                onClick={onClick}
                style={
                    {
                        // width: 256,
                    }
                }
                theme="dark"
                mode="inline"
                items={items}
                selectedKeys={location.pathname}
                openKeys={submenu}
                onOpenChange={(openKeys) => {
                    setSubmenu(openKeys);
                }}
            />
            {/* <div style={{ textAlign: 'center', paddingTop: 25 }}>
                <button onClick={logoutHanlder} style={{ fontWeight: 800, color: 'red', borderColor: '#acabab' }}>
                    Đăng xuất
                </button>
            </div> */}
        </Spin>
    );
}
