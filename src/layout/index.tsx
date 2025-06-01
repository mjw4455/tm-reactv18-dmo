import React from "react";
import { Layout, theme } from "antd";
import styles from "./index.module.less";
import {
  Outlet,
  Navigate,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import NavHeader from "./header";
import MenuComponent from "./menu";
// import { routerList } from "@/router/index";
import { useStore } from "@/store";
// import { getMenuMeta } from "@/utils/common";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const { collapsed } = useStore();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const { pathname } = useLocation();
  const { menuPathList } = useRouteLoaderData("layout");
  const staticPathList = ["/welcome"];

  //根据路由meta做单独处理
  // const findRoute = getMenuMeta(pathname, routerList);

  // if (findRoute && findRoute.meta) {
  //   //单独处理
  // }

  // 权限校验
  if (!menuPathList.includes(pathname) && !staticPathList.includes(pathname)) {
    return <Navigate to="/403" />;
  }

  return (
    <div className={styles.layoutContainer}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <MenuComponent />
        </Sider>
        <Layout>
          <NavHeader />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "var(--dark-bg-color)",
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
