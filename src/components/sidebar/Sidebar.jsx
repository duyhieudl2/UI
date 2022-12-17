import React, { useState } from "react";
import { FileDoneOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import * as commonServices from "../../api/commonServices";
import { useEffect } from "react";

function getItem(label, key, icon, children, type, link) {
  return {
    key,
    icon,
    children,
    label,
    type,
    link,
  };
}

export default function Sidebar() {
  const [dateMenuBaoCao, setMenuBaoCao] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await commonServices.listMenuBaoCao();
      setMenuBaoCao(result);
    };
    fetchApi();
  }, []);

  console.log(dateMenuBaoCao);

  const items = [
    getItem("Quản trị hệ thống", "sub1", <SettingOutlined />, [
      getItem(
        <Link to="/users" className="link">
          Quản lý người dùng
        </Link>,
        "g1"
      ),
      getItem(
        <Link to="/menu-report" className="link">
          Quản lý trang báo cáo
        </Link>,
        "g2"
      ),
    ]),

    getItem(
      "Báo cáo",
      "sub2",
      <FileDoneOutlined />,
      dateMenuBaoCao?.map((array, index) => 
        getItem(
          <Link to={array.url} className="link">
            {array.name}
          </Link>
        )
      )
    ),
  ];

  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
}
