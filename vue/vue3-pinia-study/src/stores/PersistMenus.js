import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const usePersistMenusStore = defineStore("PersistMenus", () => {
    const menus = reactive({
        data: [
            {
                id: 1,
                name: "菜单1"
            },
            {
                id: 2,
                name: "菜单2"
            },
            {
                id: 3,
                name: "菜单3"
            }
        ],
        addMenu() {
            const newId = this.data[this.data.length - 1].id + 1
            this.data.push({ 
                id: newId, 
                name: `菜单${newId}`
            })
        }
    })

    return {
        menus
    }
}, 
// 指定 persist 配置后，结合 pinia-plugin-persistedstate 插件即可实现存储在 localStorage 中
{
    persist: true
})