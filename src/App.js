import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './app.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import UserList from './pages/userList/UserList';
import BaoCaoChamCong from './pages/baocao/BaoCaoChamCong';
import { useEffect, useState } from 'react';
import * as commonServices from './api/commonServices';

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
            <Topbar />
            <div className="container">
                <Sidebar dataMenu={dataMenu} />

                <Routes>
                    <Route exac path="/" element={<Home />}></Route>
                    <Route path="/users" element={<UserList />}></Route>

                    {menuBaoCao?.subItems.map((item) => (
                        <Route
                            key={item.url}
                            path={item.url}
                            element={<BaoCaoChamCong link={item.url} params={item.params} spName={item.spName} />}
                        ></Route>
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
