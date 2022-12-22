import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './app.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import UserList from './pages/userList/UserList';
import BaoCaoChamCong from './pages/baocao/BaoCaoChamCong';
import { useEffect, useState } from 'react';
import * as commonServices from './api/commonServices';
import NormalLoginForm from './pages/login/Login';
import { PrivateRoute } from '~/components/PrivateRoute';

function App() {
    const [dataMenu, setMenu] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await commonServices.listMenu();
            setMenu(result);
        };
        fetchApi();
    }, []);
    const menuBaoCao = dataMenu.find((obj) => {
        return obj.code === 'bccc';
    });

    return (
        <Router>
            <Routes>
                <Route
                    exac
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <UserList />
                        </PrivateRoute>
                    }
                ></Route>

                {menuBaoCao?.subItems.map((item) => (
                    <Route
                        key={item.url}
                        path={item.url}
                        element={
                            <PrivateRoute>
                                <BaoCaoChamCong
                                    link={item.url}
                                    params={item.params}
                                    spName={item.spName}
                                    reportName={item.name}
                                />
                            </PrivateRoute>
                        }
                    ></Route>
                ))}

                <Route path="/login" element={<NormalLoginForm />} />
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
