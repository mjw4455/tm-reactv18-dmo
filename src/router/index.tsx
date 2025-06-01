//方式一
// import { useRoutes } from "react-router-dom";
// function Router() {
//   return useRoutes([
//     {
//       path: "/",
//       element: <App />,
//     },
//     {
//       path: "/react",
//       element: <div>react</div>,
//     },
//     {
//       path: "*",
//       element: <div>404</div>,
//     },
//   ]);
// }
// export default Router;

//方式二
import { lazy } from "react";
import { lazyLoader } from "./lazyLoader";
import { createBrowserRouter, Navigate } from "react-router-dom";
// import Login from "../views/login";
// import Welcome from "../views/welcome";
// import Layout from "../layout";
// import Dashboard from "../views/dashboard";
// import Dept from "../views/dept";
// import Role from "../views/role";
// import User from "../views/user";
// import Menu from "../views/menu";
import AuthLoader from "./AuthLoader";
// import NotFound403 from "@/views/welcome/NotFound403";


export const routerList = [
  {
    id: "layout",
    element: lazyLoader(lazy(() => import("../layout"))),
    loader: AuthLoader,
    children: [
      {
        path: "/welcome",
        element: lazyLoader(lazy(() => import("../views/welcome"))),
        meta: {
          auth: true,
        },
      },
      {
        path: "/dashboard",
        element: lazyLoader(lazy(() => import("../views/dashboard"))),
      },
      {
        path: "/deptList",
        element: lazyLoader(lazy(() => import("../views/dept"))),
      },
      {
        path: "/roleList",
        element: lazyLoader(lazy(() => import("../views/role"))),
      },
      {
        path: "/userList",
        element: lazyLoader(lazy(() => import("../views/user"))),
      },
      {
        path: "/menuList",
        element: lazyLoader(lazy(() => import("../views/menu"))),
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/welcome" />,
  },
  {
    path: "/login",
    element: lazyLoader(lazy(() => import("../views/login"))),
  },
  {
    path: "/403",
    element: lazyLoader(
      lazy(() => import("@/views/welcome/NotFound403"))
    ),
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];
export default createBrowserRouter(routerList);
