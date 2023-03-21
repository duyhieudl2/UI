import { Navigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import Sidebar from '~/components/sidebar/Sidebar';
import Topbar from '~/components/topbar/Topbar';
import * as commonServices from '~/api/commonServices';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import logo from '~/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { height } from '@mui/system';

const { Content, Header, Sider } = Layout;

export { PrivateRoute };

function PrivateRoute({ children }) {
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
        <Layout style={{ maxHeight: '100vh' }}>
            <Header className="header" style={{ height: 70, background: '#e4eff6' }}>
                <div className="logo" style={{ paddingTop: 13 }}>
                    <span className="logo" onClick={() => navigate('/')}>
                        <img src={logo} alt="logo" />
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider
                    width={250}
                    height={'auto'}
                    style={{
                        background: '#ffffff',
                    }}
                >
                    <Sidebar />
                </Sider>

                <Layout
                    className="site-layout"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        padding: '0 5px 0 5px',
                        background: '#f1f2f2e6',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '5px 0',
                        }}
                    ></Breadcrumb>
                    <Content
                        style={{
                            padding: 15,
                            margin: 0,
                            minHeight: 280,

                            // overflowY: 'scroll',
                            // overflowX: 'scroll',
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
