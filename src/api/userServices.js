import * as request from '../utils/request';
import { notification } from 'antd';

export const listUser = async (params) => {
    try {
        const res = await request.get(`/user?${params}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async (values) => {
    try {
        const res = await request.post('/auth/login', values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (values) => {
    try {
        const res = await request.post('/auth/login', values);
        console.log('resAPI: ' + res);
        return res;
    } catch (error) {
        notification.error({ message: error.response.data.message });
    }
};
