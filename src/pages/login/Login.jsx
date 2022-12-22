import { Form, Input, Checkbox, Button } from 'antd';
import './login.css';
import companyLogo from '~/images/loginImage.jpg';
import * as userServices from '~/api/userServices';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '~/actions';

const { isAuthenticated, user } = useSelector((state) => state.currentUser);

export default function Login() {
    var token = localStorage.getItem('accessToken');

    useEffect(() => {
        dispatch(allActions.userActions.setUser(user));
    }, []);

    const naviagete = useNavigate();
    const onFinish = (values) => {
        const fetchApi = async () => {
            const result = await userServices.login(values);
            console.log('dataRS1: ' + result);
            if (result != undefined && result.statusCode === 200) {
                localStorage.setItem('accessToken', JSON.stringify(result.data));

                console.log('loginBefore' + JSON.stringify(useSelector((state) => state.currentUser)));
                const user = { accessToken: result.data };
                const dispatch = useDispatch();
                dispatch(allActions.userActions.setUser(user));

                console.log('loginAfter' + JSON.stringify(useSelector((state) => state.currentUser)));
                naviagete('/');
            }
        };
        fetchApi();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return token != null && token != undefined ? (
        <Navigate to="/" />
    ) : (
        <div className="login-page">
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img src={companyLogo} alt="Login" />
                </div>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <p className="form-title" style={{ textAlign: 'center' }}>
                        Đăng nhập
                    </p>
                    <p></p>
                    <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập username!' }]}>
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập password!' }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <p></p>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            LOGIN
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
