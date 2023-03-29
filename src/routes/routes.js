import TrangChu from '~/pages/home/Home';
import UserList from '~/pages/userList/UserList';
import Role from '~/pages/role/Role';
import Division from '~/pages/danhmuc/bophan/Division';
import Department from '~/pages/danhmuc/phongban/Department';
import Shift from '~/pages/danhmuc/calamviec/Shift';
import Section from '~/pages/danhmuc/section/Section';
import Position from '~/pages/danhmuc/chucvu/Position';
import Employee from '~/pages/danhmuc/nhanvien/Employee';
import Supplier from '~/pages/nhacungcap/supplier/Supplier';
import AccountSupplier from '~/pages/nhacungcap/account/AccountSupplier';
import { permission } from '~/permissions/index';

const routes = [
    {
        title: 'Trang chủ',
        path: '/',
        privateRoute: true,
        component: TrangChu,
        subItems: [],
        permissionCode: '',
    },
    {
        title: 'Quản lý người dùng',
        path: '/users',
        component: UserList,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.qtht1_user,
    },
    {
        title: 'Quản lý phân quyền',
        path: '/nhom-quyen',
        component: Role,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.qtht3_role,
    },
    // Quản trị danh mục
    {
        title: 'Quản lý bộ phận',
        path: '/bo-phan',
        component: Division,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.dm1_division,
    },
    {
        title: 'Quản lý phòng ban',
        path: '/phong-ban',
        component: Department,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.dm2_department,
    },
    {
        title: 'Quản lý nhân viên',
        path: '/nhan-vien',
        component: Employee,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.dm3_employee,
    },
    {
        title: 'Quản lý chức vụ',
        path: '/chuc-vu',
        component: Position,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.dm4_position,
    },
    {
        title: 'Ca làm việc',
        path: '/ca-lam-viec',
        component: Shift,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.dm5_shift,
    },
    {
        title: 'Quản lý section',
        path: '/section',
        component: Section,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.dm6_section,
    },
    // Nhà cung cấp
    {
        title: 'Thông tin nhà cung cấp',
        path: '/nha-cung-cap',
        component: Supplier,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.ncc_thongtin,
    },
    {
        title: 'Tài khoản nhà cung cấp',
        path: '/tai-khoan-nha-cung-cap',
        component: AccountSupplier,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.ncc_taikhoan,
    },
];

export default routes;
