import SysUserViewVO from '@/api/vo/SysUserViewVO'
import PinaKeys from '@/store/PinaKeys'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { Store } from '..'

interface SysLoginedUserData { token: string, info: SysUserViewVO, logined: boolean }

interface SysLoginedUserStore extends Store { 
    // 最好使用 ref，使用 reactive 有很多暂不清楚的问题
    // user: Reactive<SysLoginedUser>
    user: Ref<SysLoginedUserData>
}

export const useSysLoginedUserStore = defineStore<string, SysLoginedUserStore>(PinaKeys.SYS_LOGINED_USER,
    () => {
        // states
        const user = ref<SysLoginedUserData>({
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

        const init = async () => {
            // Do nothing
        }

        // actions
        const clear = async () => {
            // clear memory
            user.value = {
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
            }
            // clear disk
            localStorage.removeItem(PinaKeys.SYS_LOGINED_USER)
        }

        return {
            user,
            name: 'SysLoginedUser',
            init,
            clear
        }
}, {
    persist: true
})