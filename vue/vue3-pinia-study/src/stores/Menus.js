import { defineStore } from 'pinia'
import { reactive } from 'vue'

// 命名规范：use + ModuleName + Store

// 1. setup 函数风格
export const useMenusStore = defineStore("Menus", () => { // id 规范：一般取文件名
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
})

// 2. 选项式风格: 繁琐，见官网吧：https://pinia.web3doc.top/