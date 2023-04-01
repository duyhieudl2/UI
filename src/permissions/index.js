const userPage = {
    qtht1_user: 'qtht1',
    qtht1_view: 'qtht1v',
    qtht1_tao: 'qtht1t',
    qtht1_sua: 'qtht1s',
    qtht1_xoa: 'qtht1x',
    qtht1_phanquyen: 'qtht1pq',
};

const menuPage = {
    qtht2_menu: 'qtht2',
    qtht2_view: 'qtht2v',
    qtht2_tao: 'qtht2t',
    qtht2_sua: 'qtht2s',
    qtht2_xoa: 'qtht2x',
};
const rolePage = {
    qtht3_role: 'qtht3',
    qtht3_view: 'qtht3v',
    qtht3_tao: 'qtht3t',
    qtht3_sua: 'qtht3s',
    qtht3_xoa: 'qtht3x',
};

const divisionPage = {
    dm1_division: 'dm1',
    dm1_view: 'dm1v',
    dm1_tao: 'dm1t',
    dm1_sua: 'dm1s',
    dm1_xoa: 'dm1x',
};
const departmentPage = {
    dm2_department: 'dm2',
    dm2_view: 'dm2v',
    dm2_tao: 'dm2t',
    dm2_sua: 'dm2s',
    dm2_xoa: 'dm2x',
};
const employeePage = {
    dm3_employee: 'dm3',
    dm3_view: 'dm3v',
    dm3_tao: 'dm3t',
    dm3_sua: 'dm3s',
    dm3_xoa: 'dm3x',
};
const positionPage = {
    dm4_position: 'dm4',
    dm4_view: 'dm4v',
    dm4_tao: 'dm4t',
    dm4_sua: 'dm4s',
    dm4_xoa: 'dm4x',
};
const shiftPage = {
    dm5_shift: 'dm5',
    dm5_view: 'dm5v',
    dm5_tao: 'dm5t',
    dm5_sua: 'dm5s',
    dm5_xoa: 'dm5x',
};
const sectionPage = {
    dm6_section: 'dm6',
    dm6_view: 'dm6v',
    dm6_tao: 'dm6t',
    dm6_sua: 'dm6s',
    dm6_xoa: 'dm6x',
};
const baoCaoChamCongPage = {
    bccc_inout: 'bcc1',
    bccc_doicalamviec: 'bcc2',
    bccc_dangkynghi: 'bcc3',
    bccc_lamthemgio: 'bcc4',
    bccc_kiennghicong: 'bcc5',
    bccc_congchitiet: 'bcc6',
    bccc_bangchamcongthang: 'bcc7',
    bccc_dimuonvesom: 'bcc8',
};
const nhaCungCapPage = {
    ncc_thongtin: 'ncc1',
    ncc_thongtin_xem: 'ncc1v',
    ncc_thongtin_sua: 'ncc1s',
    ncc_thongtin_phanquyen: 'ncc1pq',
    // tài khoản ncc
    ncc_taikhoan: 'ncc2',
    ncc_taikhoan_xem: 'ncc2v',
    ncc_taikhoan_them: 'ncc2t',
    ncc_taikhoan_sua: 'ncc2s',
    ncc_taikhoan_xoa: 'ncc2x',
};
export const permission = {
    ...userPage,
    ...menuPage,
    ...rolePage,
    // Quản trị danh mục
    ...divisionPage,
    ...departmentPage,
    ...employeePage,
    ...positionPage,
    ...shiftPage,
    ...sectionPage,
    // Báo cáo chấm công
    ...baoCaoChamCongPage,
    ...nhaCungCapPage,
};
