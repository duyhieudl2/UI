import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '~/components/sidebar/Sidebar';
import Topbar from '~/components/topbar/Topbar';
import * as commonServices from '~/api/commonServices';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from 'query-string';

export { PrivateRoute };

function PrivateRoute({ children }) {
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
        <>
            <Topbar></Topbar>
            <div className="container" style={{ paddingTop: '10px' }}>
                <Sidebar />
                {children}
            </div>
        </>
    );
}
