import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import router from "./router";
import { useStore } from "@/store/index";
// import './笔记/调度器源码.ts'
import "./App.css";

//新知识：ahook、useRouteLoaderData、useImperativeHandle

function App() {
  const { isDark } = useStore();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
