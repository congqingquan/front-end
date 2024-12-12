## 项目命名

kebab-case

## 文件目录命名

### 1. 全局 components
PascalCase

### 2. 非全局 components
1. 单个单词：小写 + 复数
2. 多个单词：camelCase

## 文件命名

### 1. 全局 components
PascalCase + index.vue

### 2. 非全局 components
常见的有两种选择方式：
1. PascalCase
2. Kebab-case

推荐使用 PascalCase 的形式，原因如下：
1. 在 tempalte 中，大驼峰命名的组件文件，使用时，也可以被写为 短横线 格式的标签。而短横线格式只能是短横线格式。
    ```html
    <my-component />
    <MyComponent />
    ```
2. 可以有效利用 ES6 的属性速写，短横线不可。
    ```ts
    import MyComponent from './MyComponent.vue'

    import my-component from './my-component.vue' // 编译报错
    ```
3. 组件文件名为单个单词的情况下，大驼峰可以避免与原生 html 标签冲突。例如已有一个组件文件：button.vue，短横线格式就会和原生的 button 元素冲突。

### 3. 页面文件
camelCase + index.vue

### 4. 图像文件
snake

### 5. html / js / css / ts
camelCase