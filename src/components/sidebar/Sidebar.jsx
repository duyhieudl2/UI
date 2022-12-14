import React from 'react';
import { FileDoneOutlined , SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
function getItem(label, key, icon, children, type, link) {
  return {
    key,
    icon,
    children,
    label,
    type,
    link
  };
}
const items = [
  
  getItem('Quản trị hệ thống', 'sub1', <SettingOutlined /> , [

    getItem(<Link to="/users" className="link">Quản lý người dùng</Link>, 'g1' ),

    getItem('Quản lý vai trò', 'g2'),
  ]),
  getItem('Báo cáo', 'sub2', <FileDoneOutlined /> , [

    getItem(<Link to="/bao-cao-chi-tiet-in-out" className="link">Báo cáo chi tiết In/Out</Link>, 'bc1' ),

  ]),

];
const Sidebar = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default Sidebar;