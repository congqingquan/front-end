import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import StoreKeys from '../StoreKeys'
import { Store } from '@/types'

interface MemberInfo {
    token: string,
    name: string
}

interface MemberInfoStore extends Store {
    member: Ref<MemberInfo>
}

export const useMemberInfoStore = defineStore<string, MemberInfoStore>(StoreKeys.MEMBER_INFO,
    () => {
        // states
        const member = ref<MemberInfo>({
            token: '',
            name: ''
        })

        
        // actions
        const init = async () => {
            // Do nothing
        }

        const clear = async () => {
            // clear memory
            member.value = {
                token: '',
                name: ''
            }
            // clear disk
            uni.removeStorageSync(StoreKeys.MEMBER_INFO)
        }

        return {
            member,
            name: StoreKeys.MEMBER_INFO,
            init,
            clear
        }
}, {
    persist: {
        storage: {
            setItem(key, value) {
                uni.setStorageSync(key, value)
            },
            getItem(key) {
                return uni.getStorageSync(key)
            }
        }
    }
})

