import { Navigate } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '~/components/sidebar/Sidebar';
import Topbar from '~/components/topbar/Topbar';
import * as commonServices from '~/api/commonServices';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme, Avatar, Dropdown, Tooltip } from 'antd';
import logo from '~/images/logo.png';
import { useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './topbar/topbar.css';

const { Content, Header, Sider } = Layout;

export { PrivateRoute };

function PrivateRoute({ children }) {
    const userMenu = (
        <Menu>
            <Menu.Item key="1">Thông tin tài khoản</Menu.Item>
            <Menu.Item key="2">Đổi mật khẩu</Menu.Item>
            <Menu.Item key="3">Đăng xuất</Menu.Item>
        </Menu>
    );
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUser.loggedIn);
    const accessToken = localStorage.getItem('accessToken');

    const [dataMenu, setMenu] = useState([]);

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await commonServices.listMenu();
    //         setMenu(result);
    //     };
    //     if (accessToken !== null) {
    //         fetchApi();
    //     }
    // }, []);

    if (accessToken == null || currentUser !== true) {
        return <Navigate to="/login" />;
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
                        <span className="user-name">John Doe</span>
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
                    {children}
                </Content>
            </Layout>
        </Layout>

        // <Layout style={{ maxHeight: '100vh' }}>
        //     <Header className="header" style={{ height: 70, background: '#e4eff6' }}>
        //         <div className="logo" style={{ paddingTop: 13 }}>
        //             <span className="logo" onClick={() => navigate('/')}>
        //                 <img src={logo} alt="logo" />
        //             </span>
        //         </div>
        //     </Header>
        //     <Layout>
        //         <Sider
        //             width={250}
        //             height={'auto'}
        //             style={{
        //                 background: '#ffffff',
        //             }}
        //         >
        //             <Sidebar />
        //         </Sider>

        //         <Layout
        //             className="site-layout"
        //             style={{
        //                 maxWidth: '100%',
        //                 maxHeight: '100%',
        //                 padding: '0 5px 0 5px',
        //                 background: '#f1f2f2e6',
        //             }}
        //         >
        //             <Breadcrumb
        //                 style={{
        //                     margin: '5px 0',
        //                 }}
        //             ></Breadcrumb>
        //             <Content
        //                 style={{
        //                     padding: 15,
        //                     margin: 0,
        //                     minHeight: 280,

        //                     // overflowY: 'scroll',
        //                     // overflowX: 'scroll',
        //                 }}
        //             >
        //                 {children}
        //             </Content>
        //         </Layout>
        //     </Layout>
        // </Layout>
    );
}
