import './app.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BaoCaoChamCong from './pages/baocao/BaoCaoChamCong';
import NormalLoginForm from './pages/login/Login';
import { PrivateRoute } from '~/components/PrivateRoute';
import { useSelector } from 'react-redux';
import routes from '~/routes/routes';

function App() {
    const dataMenu = useSelector((state) => state.module);

    const menuBaoCao =
        Object.keys(dataMenu).length !== 0
            ? dataMenu.moduleList.find((obj) => {
                  return obj.code === 'bccc';
              })
            : null;

    console.log(menuBaoCao);
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
                            <PrivateRoute permissionCode={item.code} title={item.name}>
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
