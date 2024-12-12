1. 组件内代码
2. useLayout (JSX 渲染前, 此时还获取不到 dom 元素)
3. useLayoutEffect (JSX 渲染后，同步执行)
4. useEffect (JSX 渲染后，异步执行)
5. useEffect.returnFunction
   1. 卸载组件时触发
   2. 更新组件时，重新渲染组件前触发 (其实可以理解为也是在卸载组件时触发)