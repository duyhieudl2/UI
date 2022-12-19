import * as request from '../utils/request';

export const chiTietInOut = async (params) => {
    try {
        console.log('params' + params);
        const res = await request.get(`/reportTimekeeping?${params}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const downLoadFile = async (params) => {
    try {
        console.log('params : ' + params);
        const res = await request.downLoadFile(`/reportTimekeeping?${params}`);
        console.log('resAPI' + res);
        console.log('resAPIData' + res.data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
