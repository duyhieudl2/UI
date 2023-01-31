import {
    DEBOUNCE_INPUT_SEARCH_DELAY,
    METHOD_DELETE,
    METHOD_GET,
    METHOD_POST,
    NAVIGATE_DANGNHAP,
    STATUSCODE_200,
    STATUSCODE_401,
    STATUSCODE_500,
    TOKEN_NAME,
} from './constants';
import { Modal, notification } from 'antd';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { alertMessage, debounce } from './function';
notification.config({
    maxCount: 1,
    duration: 2,
});

Axios.interceptors.response.use(
    (response) => {
        // do something with the response data

        if (response && response.data.statusCode === STATUSCODE_500) {
            notification.error({
                message: 'Thông báo!',
                description: response.data.message,
            });
        }
        if (response && response.data.statusCode === STATUSCODE_200 && response.data.message) {
            notification.success({
                message: 'Thông báo!',
                description: response.data.message,
            });
        }
        return response;
    },
    (error) => {
        notification.config({
            maxCount: 1,
            duration: 2,
        });
        let mess = '';
        if (error.response.status === STATUSCODE_401) {
            window.location.href = NAVIGATE_DANGNHAP;
            localStorage.clear();
            return;
        }
        if (error && error.response) {
            mess = error.response.data.message;
            if (mess) {
                console.log('res', mess);

                notification.error({
                    message: 'Thông báo!',
                    description: (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: mess,
                            }}
                        />
                    ),
                });
            }
        } else {
            notification.error({
                message: 'Thông báo!',
                description: 'Lỗi hệ thống',
                maxCount: 1,
            });
        }
        return error.response;
    },
);

async function defaultPost(endpoint, method, payload) {
    const body = {};
    Object.keys(payload).forEach((key) => {
        body[key] = payload[key];

        if (payload[key] || typeof payload[key] === 'boolean' || typeof payload[key] === 'number') {
            body[key] = payload[key];
        }
        return null;
    });
    return await Axios({
        headers: {},
        method: method,
        url: endpoint,
        data: body,
    });
}
export async function postData({ url, payload, method = METHOD_POST, setLoading, onSuccess }) {
    setLoading(true);
    try {
        const res = await defaultPost(url, method, payload);
        if (res && res.data) {
            onSuccess(res.data);
        }
    } catch (err) {
        console.log('err' + err);
    } finally {
        setLoading(false);
    }
}

const request = Axios.create({
    baseURL: 'http://172.16.71.134/api',
});

export const downLoadFile = async (parmas) => {
    const res = Axios({
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
        method: 'GET',
        url: `http://172.16.71.134/api${parmas}`,
    });
    return res;
};

export const get = async (url, options = {}) => {
    const response = await request.get(url, options);
    return response.data;
};

export const post = async (url, payload) => {
    const body = {};
    Object.keys(payload).forEach((key) => {
        if (payload[key] || typeof payload[key] === 'boolean' || typeof payload[key] === 'number') {
            body[key] = payload[key];
        }
        return {};
    });

    const response = await request.post(url, body);
    return response.data;
};

export default request;
