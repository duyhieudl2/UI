import React, { useState } from 'react';
import { FileDoneOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Tooltip } from 'antd';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import * as commonServices from '../../api/commonServices';
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
    let location = useLocation();

    const [dataMenu, setDataMenu] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApi = async () => {
            const result = await commonServices.listMenu();
            setDataMenu(result);
            dispatch(allActions.moduleActions.setModule(result));
        };
        fetchApi();
    }, []);

    const naviagete = useNavigate();

    const items = dataMenu?.map((array, index) => {
        return getItem(
            <Tooltip placement="right" title={array.name}>
                {array.name}
            </Tooltip>,
            array.name,
            <SettingOutlined />,

            array.subItems?.map((item, index2) => {
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
        console.log('cleear');
        localStorage.clear();
        naviagete('/login');
    };

    const [submenu, setSubmenu] = useState([]);

    useEffect(() => {
        console.log(
            'find: ' +
                JSON.stringify(
                    dataMenu.find(
                        (item) => item.subItems && item.subItems.find((item) => item.url === location.pathname),
                    ),
                ),
        );
        if (!dataMenu.find((item) => item.url === location.pathname)) {
            if (
                dataMenu.find((item) => item.subItems && item.subItems.find((item) => item.url === location.pathname))
            ) {
                const currentSubItem = dataMenu.find(
                    (item) => item.subItems && item.subItems.find((item) => item.url === location.pathname),
                );
                console.log('currenItem: ' + currentSubItem);
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
        <div className="menu-left">
            <Menu
                onClick={onClick}
                style={
                    {
                        // width: 256,
                    }
                }
                mode="inline"
                items={items}
                selectedKeys={location.pathname}
                openKeys={submenu}
                onOpenChange={(openKeys) => {
                    setSubmenu(openKeys);
                }}
            />
            <div style={{ textAlign: 'center', paddingTop: 25 }}>
                <button onClick={logoutHanlder} style={{ fontWeight: 800, color: 'red', borderColor: '#acabab' }}>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}
