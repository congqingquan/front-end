import React from 'react'
import { Select } from 'antd'
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'

const IconSelect: React.FC< { value?: string, onChange?: (value: string) => void } > = ({ value, onChange }) => {

    const iconList = Object.keys(icons).filter((item) => typeof icons[item]  === 'object' && icons[item] !== 'default' );
    const iconOptions = iconList.map(icon => (
        {
            key: icon,
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
            value={value}
            labelRender={(lable) => <><Icon component={icons[lable.value]} style={{ marginRight: '8px' }}/>{lable.value}</>}
            options={iconOptions}
            optionRender={(origin) => {
                    return <>
                        <Icon component={icons[origin.key.toString()]} style={{ marginRight: '8px' }}></Icon>
                        {origin.key.toString()}
                    </>
                }
            }
            onChange={(value) => onChange && onChange(value)}
        >
        </Select>
    )
}

export default IconSelect;