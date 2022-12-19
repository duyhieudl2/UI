import * as request from '../utils/request';

export const listPosition = async () => {
    try {
        const res = await request.get('/common/list-position', {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const listViTriCuaHang = async () => {
    try {
        const res = await request.get('/common/vi-tri-cua-hang', {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const listMenuBaoCao = async () => {
    try {
        const res = await request.get('/common/list-menu-baocao', {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const listMenu = async () => {
    try {
        const res = await request.get('/common/list-menu', {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const listPhongBan = async () => {
    try {
        const res = await request.get('/common/list-department', {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
