import * as AntdIcons from '@ant-design/icons-vue';

// antd icons
let { default: temp, setTwoToneColor, getTwoToneColor, createFromIconfontCN, ...rest } = AntdIcons
const Icons = Object.assign({}, rest)

export default Icons as {
    [key: string]: any
}