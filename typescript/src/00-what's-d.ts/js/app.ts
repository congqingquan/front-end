// 等价于: import {data} from './js-component.d.ts'; 省略了后缀 > .d.ts
import { JS_DATA } from "./js-component";

let jsDataType: string = typeof JS_DATA; // number
