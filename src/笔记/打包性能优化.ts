//tsc -b 语法检查

//项目体积分析
//安装rollup-plugin-visualizer

//使用react-lazy、suspense实现懒加载，按需加载组件
// import { lazy, Suspense } from 'react';
// const lazyComponent = lazy(() => import('./lazyComponent'));

//rel preload  prefetch
//执行时机，prefetch在浏览器空闲时，加载资源
//preload在浏览器解析到rel="preload"的资源时，立即加载资源

//使用vite的manualChunks进行对某些第三方库拆分包
// UI 组件库包：ElementPlus/Ant Design 等
// 工具库包：axios/lodash 等
// 图表库包：ECharts/D3 等（体积大的单独拆）
// 业务代码包：按模块/页面拆分
// manualChunks: {
//     // 将 React 相关库打包到一个单独的 chunk 中
//     'react-vendor': ['react', 'react-dom'],
//     // 将 UI 库打包到一个单独的 chunk 中
//     'ui-lib': ['antd', '@ant-design/icons'],
//     // 将工具类库打包到一个 chunk 中
//     'utils': ['lodash', 'axios'],
//     'user-vendor': ['./src/views/user/', './src/views/dept']
//   }