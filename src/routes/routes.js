import UserList from '~/pages/userList/UserList';
import Role from '~/pages/role/Role';
import Menu from '~/pages/menu/Menu';
import Division from './pages/danhmuc/bophan/Division';
import Department from './pages/danhmuc/phongban/Department';
import Shift from './pages/danhmuc/calamviec/Shift';
import Section from './pages/danhmuc/section/Section';
import Position from './pages/danhmuc/chucvu/Position';
import Employee from './pages/danhmuc/nhanvien/Employee';
import Supplier from './pages/nhacungcap/supplier/Supplier';
import AccountSupplier from './pages/nhacungcap/account/AccountSupplier';
import BaoCaoChamCong from './pages/baocao/BaoCaoChamCong';
import { permission } from '~/permissions/index';

const routesQuanTriHeThong = [
    {
        title: 'Trang chủ',
        path: mainPath,
        privateRoute: true,
        component: TrangChu,
        subItems: [],
        permissionCode: '',
    },
    {
        title: 'Quản lý người dùng',
        path: mainPath + '/users',
        component: UserList,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.qtht1_user,
    },
    {
        title: 'Quản lý phân quyền',
        path: mainPath + '/phan-quyen',
        component: Role,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.qtht3_role,
    },
    {
        title: 'Quản lý menu',
        path: mainPath + '/menu',
        component: Menu,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.qtht2_menu,
    },
];
const routesQuanTriDanhMuc = [
    {
        title: 'Quản lý bộ phận',
        path: mainPath + '/bo-phan',
        component: Division,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.qtht1_user,
    },
    {
        title: 'Quản lý phân quyền',
        path: mainPath + '/phan-quyen',
        component: Role,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.qtht3_role,
    },
    {
        title: 'Quản lý menu',
        path: mainPath + '/menu',
        component: Menu,
        privateRoute: true,
        subItems: [],
        permissionCode: permission.qtht2_menu,
    },
];

export default routes;
