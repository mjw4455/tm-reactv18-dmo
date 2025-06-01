import "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/theme.less";
import "./global.less";
//方式一
// import { BrowserRouter } from "react-router-dom";
// import BaseRouter from "./router";

// createRoot(document.getElementById("root")!).render(
//   <BrowserRouter>
//     <BaseRouter />
//   </BrowserRouter>
// );

// //方式二
// import { RouterProvider } from "react-router-dom";
// import router from "./router";
// createRoot(document.getElementById("root")!).render(
//   <RouterProvider router={router} />
// );

createRoot(document.getElementById("root")!).render(
  <App />
);
