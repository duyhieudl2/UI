import './app.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserList from './pages/userList/UserList';
import Division from './pages/danhmuc/bophan/Division';
import Department from './pages/danhmuc/phongban/Department';
import Shift from './pages/danhmuc/calamviec/Shift';
import Section from './pages/danhmuc/section/Section';
import Position from './pages/danhmuc/chucvu/Position';
import Employee from './pages/danhmuc/nhanvien/Employee';
import Supplier from './pages/nhacungcap/supplier/Supplier';
import Role from './pages/role/Role';
import AccountSupplier from './pages/nhacungcap/account/AccountSupplier';
import BaoCaoChamCong from './pages/baocao/BaoCaoChamCong';
import NormalLoginForm from './pages/login/Login';
import { PrivateRoute } from '~/components/PrivateRoute';
import { useSelector } from 'react-redux';

function App() {
    const dataMenu = useSelector((state) => state.module);

    // console.log(Object.keys(dataMenu).length);
    const menuBaoCao =
        Object.keys(dataMenu).length !== 0
            ? dataMenu.moduleList.find((obj) => {
                  return obj.code === 'bccc';
              })
            : null;

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
                <Route
                    path="/bo-phan"
                    element={
                        <PrivateRoute>
                            <Division />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/phong-ban"
                    element={
                        <PrivateRoute>
                            <Department />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/chuc-vu"
                    element={
                        <PrivateRoute>
                            <Position />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/nhan-vien"
                    element={
                        <PrivateRoute>
                            <Employee />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/ca-lam-viec"
                    element={
                        <PrivateRoute>
                            <Shift />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/section"
                    element={
                        <PrivateRoute>
                            <Section />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/nha-cung-cap"
                    element={
                        <PrivateRoute>
                            <Supplier />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/tai-khoan-nha-cung-cap"
                    element={
                        <PrivateRoute>
                            <AccountSupplier />
                        </PrivateRoute>
                    }
                ></Route>

                <Route
                    path="/nhom-quyen"
                    element={
                        <PrivateRoute>
                            <Role />
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
