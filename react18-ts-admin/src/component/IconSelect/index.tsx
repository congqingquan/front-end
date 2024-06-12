import React from 'react'
import { Select } from 'antd'
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'

const IconSelect: React.FC = () => {
    const iconList = Object.keys(icons).filter((item) => typeof icons[item] === 'object' && item !== 'default');
    return (
        <Select
            placeholder='请选择图标'
            showSearch
            allowClear
            style={{ width: '100%' }}
        >
            {iconList.map(item => {
                return <Select.Option value={item} key={item}>
                    <Icon component={icons[item]} style={{ marginRight: '8px' }} />
                    {item}
                </Select.Option>
            })}
        </Select>
    )
}

export default IconSelect;