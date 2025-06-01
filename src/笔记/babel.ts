//1、babel 是什么？
//babel 是一个 JavaScript 编译器，它可以将 ES6 的代码转换为 ES5 的代码，从而在低版本的浏览器中运行。

//2、babel 的核心库
//@babel/core
//@babel/parser
//@babel/traverse
//@babel/generator

//@babel/core 是 babel 的核心库，它提供了 babel 的编译功能。
//@babel/parser 是 babel 的解析器，它可以将代码解析为抽象语法树（AST）。
//@babel/traverse 是 babel 的遍历器，它可以将 AST 转换为另一种形式。
//@babel/generator 是 babel 的生成器，它可以将 AST 转换为代码。

// import * as babel from "@babel/core";

// import fs from "node:fs";

//index.js 代码如下
//const fn = (a,b) => a+b
//const res = [1,2,3].filter(item => item > 1) 此处需要用到corejs,babel会先去找Array.prototype.filter
//如果找不到，会去找corejs的polyfill垫片

// const code = fs.readFileSync("./src/index.js", "utf-8");

// //npm i corejs
// const result = babel.transform(code, {
//   presets: [
//     [
//       "@babel/preset-env",
//       {
//         corejs: 3,
//         useBuiltIns: "usage",//按需引入
//       },
//     ],
//   ],
// });

// console.log(result);


//jsx转化成js
// import react from 'react'
// import { createRoot } from 'react-dom/client'

// const root = createRoot(document.getElementById('root'))
// root.render(<div>hello</div>)

// const result = babel.transform(code, {
//     presets: [
//       [
//         "@babel/preset-env",
//         {
//           corejs: 3,
//           useBuiltIns: "usage",//按需引入
//         },
//       ],
//       [
//         "@babel/preset-react",
//         {
//           runtime: "automatic",//自动引入
//         },
//       ],
//     ],
//   });



//swc
//npm i @swc/core @swc/helpers

//swc 是一个基于 Rust 的 JavaScript 和 TypeScript 编译器，它比 Babel 更快。
//@swc/core 是 swc 的核心库，它提供了 swc 的编译功能。
//@swc/helpers 是 swc 的辅助库，它提供了 swc 的辅助功能。

// import { transform } from '@swc/core'

// const code = `
//   const fn = (a, b) => a + b
//   const res = [1, 2, 3].filter(item => item > 1)
// `

// const result = transform(code, {
//   jsc: {
//     target: 'es5',
//   },
// })

// console.log(result)


