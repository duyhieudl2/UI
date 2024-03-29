import { Navigate } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '~/components/sidebar/Sidebar';
import * as commonServices from '~/api/commonServices';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme, Avatar, Dropdown, Tooltip } from 'antd';
import logo from '~/images/logo.png';
import { useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './topbar/topbar.css';

export { PrivateRoute };

function PrivateRoute({ children, permissionCode, title }) {
    const [open, setOpen] = useState(false);
    const { Content, Header, Sider } = Layout;
    const navigate = useNavigate();
    const logoutHanlder = () => {
        localStorage.clear();
        navigate('/login');
    };
    const changPassword = () => {};
    const userMenu = (
        <Menu>
            {/* <Menu.Item key="1">Thông tin tài khoản</Menu.Item> */}
            <Menu.Item key="2" onClick={changPassword}>
                Đổi mật khẩu
            </Menu.Item>
            <Menu.Item key="3" onClick={logoutHanlder}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const currentUser = useSelector((state) => state.currentUser);
    const accessToken = localStorage.getItem('accessToken');

    // const [dataMenu, setMenu] = useState([]);

    if (accessToken == null || currentUser.loggedIn !== true) {
        return <Navigate to="/login" />;
    }
    if (
        permissionCode !== '' &&
        permissionCode !== null &&
        !currentUser.user.permissions.includes(permissionCode) &&
        !currentUser.user.isAdministrator
    ) {
        return <Navigate to="/" />;
    }
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    height: '100vh',
                    // position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    maxWidth: '260px',
                }}
                width={250}
            >
                <div className="logo" style={{ paddingTop: 10, paddingLeft: 10, height: 62 }}>
                    <span className="logo" onClick={() => navigate('/')}>
                        <img src={logo} alt="logo" />
                    </span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <hr></hr>
                </div>
                <Sidebar />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <Tooltip title={collapsed ? 'Phóng to' : 'Thu nhỏ'}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger-icon',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Tooltip>

                    <div className="header-right">
                        <span className="user-name">{currentUser.user.fullName}</span>
                        <Dropdown overlay={userMenu} trigger={['hover']}>
                            <Avatar icon={<UserOutlined />} className="user-avatar" />
                        </Dropdown>
                    </div>
                </Header>

                <Content
                    style={{
                        overflowBlock: 'auto',
                        margin: '10px 10px 5px 10px',
                        padding: '20px 5px 0px 15px',
                        minHeight: 280,
                        background: colorBgContainer,
                        boxShadow: '4px 2px 8px rgba(0, 0, 0, 0.15)',
                        height: 'calc(100vh - 80px)',
                    }}
                >
                    <div className="nav-breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="#">{title}</a>
                            </Breadcrumb.Item>
                            {/* <Breadcrumb.Item>
                                <a href="/application-center">Application Center</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="/application-list">Application List</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
                        </Breadcrumb>
                    </div>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
