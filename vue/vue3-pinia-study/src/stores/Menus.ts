import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import { v4 as uuidv4 } from 'uuid';

// 命名规范：use + ModuleName + Store

// 1. setup 函数风格
export const useMenusStore = defineStore("Menus", () => { // id 规范：一般取文件名
    // state
    const data = ref<{
        id: number,
        name: string
    }[]>([])

    // getters

    // actions
    const add = () => {
        const _data = data.value
        const lastedEl = _data[_data.length - 1]
        const newId = lastedEl ? lastedEl.id + 1 : 1
        _data.push({
            id: newId,
            name: `菜单${newId}`
        })
    }

    return {
        name: uuidv4(),
        data,
        add,
    }
})

// 2. 选项式风格: 繁琐，见官网吧：https://pinia.web3doc.top/
