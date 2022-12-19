import axios from 'axios';

const request = axios.create({
    baseURL: 'http://172.16.71.134/api',
});

export const downLoadFile = async (parmas) => {
    const res = axios({
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
