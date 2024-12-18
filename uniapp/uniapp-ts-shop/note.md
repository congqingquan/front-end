1. nativator 跳转的路径如果是一个 tabBar，必须设置 open-type="switchTab" 才能跳转。反之无需指定即可跳转。
2. 骨架屏的生成可以在对应的开发者工具中生成
3. scroll-view 组件，必须是 snake-case，不能是 camel 格式
4. 在父组件中，通过子组件标签上的 className 设置对应的样式不会生效。需要将样式传递到子组件内并进行应用