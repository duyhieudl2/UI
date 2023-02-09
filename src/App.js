import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './app.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserList from './pages/userList/UserList';
import Division from './pages/danhmuc/bophan/Division';
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
