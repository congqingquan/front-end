import * as AntdIcons from '@ant-design/icons-vue';
import {Any} from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { default: temp, setTwoToneColor, getTwoToneColor, createFromIconfontCN, ...rest } = AntdIcons
const Icons = Object.assign({}, rest)

export default Icons as {
	[key: string]: Any
}
