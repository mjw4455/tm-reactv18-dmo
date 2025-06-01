import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  MailOutlined,
  PieChartOutlined,
  UserOutlined,
  MenuOutlined,
  SolutionOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

import * as Icon from "@ant-design/icons";

import { useStore } from "@/store";
import { useNavigate, useLocation, useRouteLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";

type MenuItem = Required<MenuProps>["items"][number];

export default function MenuComponent() {
  const navigate = useNavigate();

  const { menuList } = useRouteLoaderData("layout");
  const { pathname } = useLocation();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { collapsed, updateCurrentMenu } = useStore();

  // const items: MenuItem[] = [
  //   { key: "/dashboard", icon: <PieChartOutlined />, label: "dashboard  " },
  //   {
  //     key: "/user",
  //     label: "用户模块",
  //     icon: <MailOutlined />,
  //     children: [
  //       { key: "/userList", label: "用户列表", icon: <UserOutlined /> },
  //       { key: "/menuList", label: "菜单管理", icon: <MenuOutlined /> },
  //       { key: "/roleList", label: "角色管理", icon: <SolutionOutlined /> },
  //       { key: "/deptList", label: "部门管理", icon: <LaptopOutlined /> },
  //     ],
  //   },
  // ];

  function getItem(
    key: React.Key,
    label: React.ReactNode,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ) {
    return {
      key,
      label,
      icon,
      children,
    };
  }

  function createIcon(name?: string) {
    if (!name) return <></>;
    const customerIcons: { [key: string]: any } = Icon;
    const icon = customerIcons[name];
    if (!icon) return <></>;
    return React.createElement(icon);
  }

  const getTreeMenu = (menuList: any[], treeList: MenuItem[] = []) => {
    menuList.forEach((item) => {
      if (item.menuType === 1 && item.menuState === 1) {
        console.log(item);
        if (item.buttons) {
          //叶子节点，没有子菜单
          //左边按钮权限
          return treeList.push(
            getItem(item.path, item.menuName, createIcon(item.icon))
          );
        }
        //有子菜单的父级菜单
        treeList.push(
          getItem(
            item.path,
            item.menuName,
            createIcon(item.icon),
            getTreeMenu(item.children)
          )
        );
      }
    });
    return treeList;
  };

  const menuClick = ({ key }: { key: string }) => {
    navigate(key);
    updateCurrentMenu(key);
    setSelectedKeys([key]);
  };

  useEffect(() => {
    const menu = getTreeMenu(menuList);
    // console.log(6666, getTreeMenu(menuList));
    setMenu(menu);
    setSelectedKeys([pathname]);
  }, []);

  return (
    <>
      <Menu
        defaultOpenKeys={["/user"]}
        mode="inline"
        theme="dark"
        onClick={menuClick}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        items={menu}
      />
    </>
  );
}
