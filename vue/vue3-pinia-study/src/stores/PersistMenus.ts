import {defineStore} from 'pinia'
import {computed, reactive, ref} from 'vue'
import {v4 as uuidv4} from "uuid";

export const usePersistMenusStore = defineStore("PersistMenus", () => {
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
            add
        }
    },
    // 指定 persist 配置后，结合 pinia-plugin-persistedstate 插件即可实现存储在 localStorage 中
    // 注意：
    //      1. 当配置了持久化后，需要将实际存储的 data 暴露，否则不知道该存储什么数据
    //      2. localStorage 中无法存储函数
    {
        persist: true
    }
)
