import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import type { Plugin, ConfigEnv } from "vite";
import mockjs from "mockjs";
import url from "node:url";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

const viteMockServer = (): Plugin => {
  return {
    name: "vite-plugin-mock-server",
    configureServer(server) {
      server.middlewares.use("/api/mock/list", (req, res) => {
        const { name } = url.parse(req.originalUrl!, true).query;
        res.setHeader("Content-Type", "application/json");
        const data = mockjs.mock({
          "list|100": [
            {
              id: "@guid",
              name: name,
              "age|18-30": 1,
              address: "@county(true)",
            },
          ],
        });
        res.end(JSON.stringify(data));
      });
    },
  };
};

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log(666, env);
  return {
    base: "/",
    plugins: [react(), viteMockServer(), visualizer()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: "https://m1.apifoxmock.com/m1/6217356-5910844-default",
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          // 确保文件名包含内容哈希，只有内容变化时文件名才会变化
          entryFileNames: "js/[name].[hash].js",
          chunkFileNames: "js/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]",
          manualChunks: {
            // 框架相关库
            framework: ["react", "react-dom"],
            // UI 组件库
            "ui-lib": ["antd", "@ant-design/icons"],
            // 工具库
            utils: ["lodash", "axios"],
          },
        },
      },
    },
  };
});
