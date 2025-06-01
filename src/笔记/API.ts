//1、const [state, dispatch] = useReducer(reducer, initialState, initFn?)
//reducer: 一个函数，接受两个参数：当前状态和动作，返回新的状态。
//initialState: 初始状态。
//initFn: 可选参数，用于初始化状态,会覆盖initialState。

//例子
// const initialState = {count: 0}
// function reducer(state, action) {
//     switch (action.type) {
//         case 'increment':
//             return {count: state.count + action.payload}
//     }
// }
// const [state, dispatch] = useReducer(reducer, initialState)
// dispatch({type: 'increment',payload: 1})

//2、useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
//subscribe: 一个函数，接受一个回调函数，当状态变化时，回调函数会被调用。
//getSnapshot: 一个函数，接受一个回调函数，当状态变化时，回调函数会被调用。
//getServerSnapshot: 一般用于服务端渲染使用。

// function useStorage(key: string, initialValue: any) {
//   const subscribe = (callback: () => void) => {
//     window.addEventListener("storage", callback);
//     return () => window.removeEventListener("storage", callback);
//   };
//   const getSnapshot = () => {
//     return localStorage.getItem(key) || initialValue;
//   };
//   const res = useSyncExternalStore(subscribe, getSnapshot);
//   const setValue = (value: any) => {
//     localStorage.setItem(key, value);
//     window.dispatchEvent(new StorageEvent("storage"));
//   };
//   return [res, setValue];
// }

//3、const [isPending, startTransition] = useTransition
//useTransition 是 React 提供的一个用于管理状态过渡的 Hook。
//它可以帮助开发者更好地控制组件的渲染过程，避免因状态更新导致的频繁重渲染。
// 使用场景
// 1. 处理复杂或耗时操作
// 2. 处理大量数据渲染
// 3. 处理动画效果

//4、useDeferredValue(value) 用于延迟值的使用，适用于优化展示值的渲染

//5、useRef()
// 1. 组件重新渲染时，ref 不会重新赋值
// 2. 改变ref.current 不会触发组件重新渲染
// 3. 不能用于useEffect的依赖项
// 4. 不能直接获取子组件实例，需要使用forwardRef

//6、useImperativeHandle(ref, ()=>{return {}}, [deps]) 类似vue的defineExpose
// 0. 可以自定义暴露给父组件的实例值
// 1. 如果不传入第三个参数，组件挂载时，会调用一次，状态更新时，都会执行一次
// 2. 如果第三个参数是空数组，组件挂载时，会调用一次，状态更新时，不会执行
// 3. 如果第三个参数是依赖项，组件挂载时，会调用一次，状态更新时，只有依赖项变化时，才会执行

//7、const context = useContext(context) 上下文
// function App() {
//   const value = { name: "张三", age: 18 };
//   const context = useContext(context);
//   return (
//     <>
//       <context.Provider value={value}>
//         <Child />
//       </context.Provider>
//     </>
//   );
// }
// Child组件：
// function Child(){
//     const context = useContext()
//     return <div>{context.name}</div>
// }

//8、useMemo(()=>{return value}, [deps]) 记忆化
// 1. 如果依赖项不变，组件重新渲染时，不会重新计算
// 2. 如果依赖项变化，组件重新渲染时，会重新计算
// 3. 如果依赖项是空数组，组件挂载时，会计算一次，状态更新时，不会计算
// 4. 如果依赖项是依赖项，组件挂载时，会计算一次，状态更新时，只有依赖项变化时，才会计算

//9、useCallback(()=>{return value}, [deps]) 记忆化
