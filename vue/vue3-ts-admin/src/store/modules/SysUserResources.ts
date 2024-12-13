import Api from '@/api/Api'
import SysResourceViewVO from '@/api/vo/SysResourceViewVO'
import PinaKeys from '@/store/PinaKeys'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { Store } from '..'

export class MenuButtonIdentifier {
    public static readonly BTN_USER_PAGE = 'BTN_USER_PAGE'
    public static readonly BTN_USER_VIEW = 'BTN_USER_VIEW'
    public static readonly BTN_USER_ADD = 'BTN_USER_ADD'
    public static readonly BTN_USER_EDIT = 'BTN_USER_EDIT'
    public static readonly BTN_USER_DELETE = 'BTN_USER_DELETE'
    public static readonly BTN_ROLE_PAGE = 'BTN_ROLE_PAGE'
    public static readonly BTN_ROLE_VIEW = 'BTN_ROLE_VIEW'
    public static readonly BTN_ROLE_ADD = 'BTN_ROLE_ADD'
    public static readonly BTN_ROLE_EDIT = 'BTN_ROLE_EDIT'
    public static readonly BTN_ROLE_DELETE = 'BTN_ROLE_DELETE'
    public static readonly BTN_MENU_PAGE = 'BTN_MENU_PAGE'
    public static readonly BTN_MENU_VIEW = 'BTN_MENU_VIEW'
    public static readonly BTN_MENU_ADD = 'BTN_MENU_ADD'
    public static readonly BTN_MENU_EDIT = 'BTN_MENU_EDIT'
    public static readonly BTN_MENU_DELETE = 'BTN_MENU_DELETE'
    public static readonly BTN_API_PAGE = 'BTN_API_PAGE'
    public static readonly BTN_API_VIEW = 'BTN_API_VIEW'
    public static readonly BTN_API_ADD = 'BTN_API_ADD'
    public static readonly BTN_API_EDIT = 'BTN_API_EDIT'
    public static readonly BTN_API_DELETE = 'BTN_API_DELETE'
    public static readonly BTN_DICTIONARY_PAGE = 'BTN_DICTIONARY_PAGE'
    public static readonly BTN_DICTIONARY_VIEW = 'BTN_DICTIONARY_VIEW'
    public static readonly BTN_DICTIONARY_ADD = 'BTN_DICTIONARY_ADD'
    public static readonly BTN_DICTIONARY_EDIT = 'BTN_DICTIONARY_EDIT'
    public static readonly BTN_DICTIONARY_DELETE = 'BTN_DICTIONARY_DELETE'
}

type ResourceMap = { 
    [key: string]: SysResourceViewVO 
}

interface SysUserResourcesStore extends Store {
    resources: Ref<SysResourceViewVO[]>,
    resourcesMap: Ref<ResourceMap>,
    menuButtonsMap: Ref<ResourceMap>,
    init: () => Promise<void>
}

export const useSysUserResourcesStore = defineStore<string, SysUserResourcesStore>(PinaKeys.SYS_USER_RESOURCES,
    () => {
        // states
        const resources = ref<SysResourceViewVO[]>([])
        const resourcesMap = ref<ResourceMap>({})
        const menuButtonsMap = ref<ResourceMap>({})

        // actions
        const init = async () => {
            const response = await Api.sysResourcePage({
                pageNo: 1,
                pageSize: -1,
                queryType: 'USER'
            })
            
            const responseData = response.data.data.records
            
            resources.value = cloneDeep(responseData).map(resource => { return { ...resource } })
            resources.value.forEach(resource => resourcesMap.value[resource.identifier] = cloneDeep(resource))
            resources.value.forEach(resource => {
                if (resource.type === 'MENU_BUTTON') {
                    menuButtonsMap.value[resource.identifier] = cloneDeep(resource)
                }
            })
        }

        const clear = async () => {
            // clear memory
            resources.value = []
            resourcesMap.value = {}
            menuButtonsMap.value = {}
            // clear disk
            localStorage.removeItem(PinaKeys.SYS_USER_RESOURCES)
        }

        return {
            resources,
            resourcesMap,
            menuButtonsMap,
            init,
            name: 'SysUserResources',
            clear
        }
    }, {
    persist: true
})