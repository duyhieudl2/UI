// import { HETHONG_Endpoint } from '~/utils/endpoints/endpoint_hethong';
import { BASE_API_URL } from '~/utils/constants';
export const Endpoint = {
    //hệ thống
    LOGIN: `${BASE_API_URL}/auth/login`,

    // Common
    LIST_POSITION: `${BASE_API_URL}/common/list-position`,
    LIST_LOCATION_STORE: `${BASE_API_URL}/common/vi-tri-cua-hang`,
    LIST_MENU_BAOCAO: `${BASE_API_URL}/common/list-menu-baocao`,
    LIST_MENU: `${BASE_API_URL}/common/list-menu`,
    LIST_DEPARTMENT: `${BASE_API_URL}/common/list-department`,

    // User
    LIST_USERS: `${BASE_API_URL}/user`,

    // Menu
    MENU: `${BASE_API_URL}/menu`,

    // Danh mục

    LIST_DIVISION: `${BASE_API_URL}/division`,
    CREATE_DIVISION: `${BASE_API_URL}/division`,
    DELETE_DIVISION: `${BASE_API_URL}/division`,
};
