import { BASE_API_URL } from '~/utils/constants';
export const Endpoint = {
    //hệ thống
    LOGIN: `${BASE_API_URL}/auth/login`,

    // Common
    LIST_POSITION: `${BASE_API_URL}/common/list-position`,
    LIST_LOCATION_STORE: `${BASE_API_URL}/common/vi-tri-cua-hang`,
    LIST_MENU_BAOCAO: `${BASE_API_URL}/common/list-menu-baocao`,
    LIST_MENU: `${BASE_API_URL}/common/list-menu`,
    LIST_MENU_HAS_PERMISSION: `${BASE_API_URL}/common/list-menu-permission`,
    LIST_DEPARTMENT: `${BASE_API_URL}/common/list-department`,

    LIST_BOPHAN: `${BASE_API_URL}/common/list-bo-phan`,
    LIST_PHONGBAN: `${BASE_API_URL}/common/list-phong-ban`,
    LIST_CHUCVU: `${BASE_API_URL}/common/list-chuc-vu`,
    LIST_CHUCDANH: `${BASE_API_URL}/common/list-chuc-danh`,
    LIST_MANAGER: `${BASE_API_URL}/employee/manager`,

    LIST_NGANHHANG: `${BASE_API_URL}/common/list-nganh-hang`,
    LIST_PERMISSION: `${BASE_API_URL}/permission`,
    LIST_ROLE: `${BASE_API_URL}/common/list-nhom-quyen`,

    // User Role
    LIST_USERS: `${BASE_API_URL}/user`,
    CRUD_ROLE: `${BASE_API_URL}/role`,
    ADD_USER_ROLE: `${BASE_API_URL}/user/add-user-role`,
    USERS_CHANGE_MYPASS: `${BASE_API_URL}/user/chang-my-pass`,

    // Menu
    CRUD_MENU: `${BASE_API_URL}/menu`,
    LIST_PARENT_MENU: `${BASE_API_URL}/common/list-parent-menu`,

    // Danh mục
    CRUD_DIVISION: `${BASE_API_URL}/division`,

    CRUD_SECTION: `${BASE_API_URL}/section`,
    CRUD_DEPARTMENT: `${BASE_API_URL}/department`,
    CRUD_POSITION: `${BASE_API_URL}/position`,
    CRUD_EMPLOYEE: `${BASE_API_URL}/employee`,
    CRUD_SHIFT: `${BASE_API_URL}/shift`,

    // Báo cáo Chấm công
    GET_MONTH: `${BASE_API_URL}/ReportTimekeeping/thang-cham-cong`,

    // Nhà cung cấp
    GET_LIST_CONTACT: `${BASE_API_URL}/supplier/list-contact`,
    CRUD_SUPPLIER: `${BASE_API_URL}/supplier`,
    CRUD_SUPPLIER_NCC: `${BASE_API_URL}/supplier/ncc`,
    GET_LIST_CONTACT_HISTORY: `${BASE_API_URL}/supplier/lich-su-lien-he`,
    EX_EXCEL_SUPPLIER: `supplier/excel`,

    CRUD_ACCOUNT_SUPPLIER: `${BASE_API_URL}/accountsupplier`,
    SELECT_ALL_ACCOUNT_SUPPLIER: `${BASE_API_URL}/accountsupplier/all-account`,
    ADD_ACCOUNT_SUPPLIER_ROLE: `${BASE_API_URL}/accountsupplier/add-role`,

    ADD_CONTACT_SUPPLIER: `${BASE_API_URL}/supplier/add-contact`,
    DELETE_CONTACT: `${BASE_API_URL}/contact`,
};
