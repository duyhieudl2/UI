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
import routes from '~/routes/routes';

function App() {
    const dataMenu = useSelector((state) => state.module);

    console.log(JSON.stringify(routes));
    const menuBaoCao =
        Object.keys(dataMenu).length !== 0
            ? dataMenu.moduleList.find((obj) => {
                  return obj.code === 'bccc';
              })
            : null;

    return (
        <Router>
            <Routes>
                {routes.map(({ title, path, component: Component, permissionCode }) => {
                    return (
                        <Route
                            exac
                            path={path}
                            element={
                                <PrivateRoute permissionCode={permissionCode} title={title}>
                                    <Component />
                                </PrivateRoute>
                            }
                        ></Route>
                    );
                })}

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
            </Routes>
        </Router>
    );
}

export default App;
