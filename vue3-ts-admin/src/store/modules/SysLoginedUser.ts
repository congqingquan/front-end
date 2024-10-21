import SysUserLoginVO from '@/api/vo/SysUserLoginVO'
import { defineStore } from 'pinia'
import { reactive, Ref, ref } from 'vue'

export const useSysLoginedUserStore = defineStore<string, /* 返回结构-> */ { user: SysUserLoginVO & { logined: boolean } /* <-返回结构 */ }>("SysLoginedUser", 
    () => {
    const user = reactive<SysUserLoginVO & { logined: boolean }>({
        token: '',
        info: {
            userId: '',
            username: '',
            password: '',
            name: '',
            gender: '',
            email: '',
            avatar: '',
            status: '',
            roles: []
        },
        logined: false
    })

    return {
        user
    }
}, {
    persist: true
})