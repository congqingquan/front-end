import React from 'react'
import { Select } from 'antd'
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'

const IconSelect: React.FC< { defaultValue?: string, onSelected: (value: string) => void } > = ({ defaultValue, onSelected }) => {

    const iconList = Object.keys(icons).filter((item) => typeof icons[item]  === 'object' && icons[item] !== 'default' );
    const iconOptions = iconList.map(icon => (
        {
            lable: icon,
            value: icon,
        }
    ));

    return (
        <Select
            placeholder='请选择图标'
            showSearch
            allowClear
            style={{ width: '100%' }}
            defaultValue={defaultValue}
            options={iconOptions}
            optionRender={(origin) => {
                    return <>
                        <Icon component={icons[origin.key.toString()]} style={{ marginRight: '8px' }}></Icon>
                        {origin.key.toString()}
                    </>
                }
            }
            onSelect={(value) => onSelected(value)}
        >
        </Select>
    )
}

export default IconSelect;