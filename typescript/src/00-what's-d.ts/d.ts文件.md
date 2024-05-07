## 一、d.ts 文件是什么

在TypeScript中，".d.ts"文件被用来提供关于JavaScript API的类型信息。
当你使用像jQuery或underscore这样的现有JavaScript库时，你可能会希望从你的TypeScript代码中调用这些库。
为了避免重写整个库，你可以编写一个".d.ts"文件，其中只包含类型注解。
然后，你可以在TypeScript代码中享受静态类型检查的好处，同时仍然使用纯JavaScript库。


### app.ts
```ts
// 等价于: import {data} from './js-component.d.ts'; 省略了后缀 > .d.ts
import { JS_DATA } from "./js-component";

let newVar: string = typeof JS_DATA;
```

### js-component.js
```js
const JS_DATA = 10;

export default JS_DATA;
```

### js-component.d.ts
```ts
export declare const JS_DATA: number;
```

我们可以看到.d.ts文件如何允许我们在不改变原有JavaScript代码的前提下，使用TypeScript的类型系统。


## 二、".d.ts"文件的起源和作用

".d.ts"文件是“声明文件”，在TypeScript编译过程中，有一个选项可以生成它。编译器会剥离所有函数和方法体，只保留导出类型的签名。`生成的声明文件可以用来描述当第三方开发者从TypeScript中使用JavaScript库或模块时，导出的虚拟TypeScript类型`。

声明文件的概念类似于C/C++中的头文件概念。它们可以为现有的JavaScript库手动编写，例如jQuery和Node.js，也有大量的声明文件集合托管在GitHub的DefinitelyTyped中，供流行的JavaScript库使用​。

## 三、".d.ts"文件与".ts"和".js"文件的关系

".d.ts"文件与".ts"和".js"文件的关系可以从两个角度来理解：文件关系和使用关系。

### 文件关系
如前所述，".d.ts"文件是TypeScript编译过程中生成的一个选项，它剥离了所有的函数和方法体，仅保留了导出类型的签名。因此，可以看作是".ts"文件的一个“裁剪”版本，只包含类型信息，不包含实现代码。另一方面，".js"文件是".ts"文件经过编译后生成的JavaScript代码，它包含实现细节，但没有类型信息。".d.ts"文件补充了这一点，为".js"文件提供了丢失的类型信息。

### 使用关系
在实际使用中，".d.ts"文件主要用于提供在JavaScript环境中使用TypeScript的类型信息，使得开发者可以在TypeScript中使用现有的JavaScript库，同时享受到TypeScript的静态类型检查的优势。".d.ts"文件并不能替代".ts"或".js"文件，它们之间是互补的关系，而不是取代的关系。".ts"文件提供了TypeScript代码的实现，".js"文件提供了JavaScript环境的运行代码，而".d.ts"文件则提供了类型信息。

因此，".d.ts"文件并不能知道哪个JS文件映射到它自己。当你在TypeScript中引用一个文件时，如果文件旁边有一个对应的".d.ts"文件，TypeScript会自动包含它的内容。这是因为TypeScript不允许你在import语句的末尾添加".ts"扩展名。如果你引用的文件有一个同名的".d.ts"文件，TypeScript就会使用它的类型信息。

## 四、如何使用".d.ts"文件
在使用".d.ts"文件来映射JavaScript项目时，你需要将".d.ts"文件的名称与".js"文件的名称保持一致。每个".js"文件都需要与具有相同名称的".d.ts"文件保持内联（即在同一目录中）。需要从".d.ts"文件中获取类型的JS/TS代码应该指向".d.ts"文件​。

## 五、".d.ts"文件的最佳实践

与JavaScript文件保持一致：".d.ts"文件应与相应的JavaScript文件具有相同的名称，并与之保持内联。

为导出的类型提供定义：".d.ts"文件允许你为JavaScript库中的各种导出类型（包括函数、对象、类等）提供明确的类型定义。这对于提高代码的可读性和可维护性是非常有用的。

尽量使用模块化的方式组织代码：".d.ts"文件支持模块化的代码组织方式。你可以创建多个小的、具有明确职责的".d.ts"文件，而不是一个大的包含所有类型定义的文件。这有助于提高代码的可维护性。

为第三方库创建类型声明文件：如果你正在使用的第三方JavaScript库没有提供类型声明文件，那么你可以自己创建一个。这样，你就可以在使用这个库的同时，享受到TypeScript的类型检查功能。

使用DefinitelyTyped：DefinitelyTyped是一个大型的类型声明文件集合，包含了许多流行的JavaScript库的类型声明文件。如果你正在使用的库的类型声明文件已经存在于DefinitelyTyped中，那么你可以直接使用它，而不需要自己从头开始创建。