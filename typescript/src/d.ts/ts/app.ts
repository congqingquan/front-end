import getNamePropFun from "./ts-component";

// 等价于: import {PropsType} from './Props.d.ts'; 省略了后缀 > .d.ts
import {PropsType} from "./Props";

let type: PropsType = {name: "str"};
getNamePropFun(type);