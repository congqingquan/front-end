import Api from "@/api/Api"
import { cloneDeep } from "lodash"
import { Ref, ref } from "vue"
import { ProviderKeys } from "./ProviderKeys"
import Provider from "./Provider"
import SysResourceViewVO from "@/api/vo/SysResourceViewVO"

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
}

type ResourceMap = { 
    [key: string]: SysResourceViewVO
}

export interface SysUserResourcesProviderData {
        resources: Ref<SysResourceViewVO[]>
        resourcesMap: Ref<ResourceMap>
        menuButtonsMap: Ref<ResourceMap>
}

export interface SysUserResourcesProvider extends Provider {
    data: SysUserResourcesProviderData
}

export const initData = async (): Promise<void> => {
    const response = await Api.sysResourcePage({
        pageNo: 1,
        pageSize: -1,
        queryType: 'USER'
    })
    
    const responseData = response.data.data.records
    
    const resources = sysUserResourcesProvider.data.resources
    const resourcesMap = sysUserResourcesProvider.data.resourcesMap
    const menuButtonsMap = sysUserResourcesProvider.data.menuButtonsMap

    resources.value = cloneDeep(responseData).map(resource => { return { ...resource } })
    resources.value.forEach(resource => resourcesMap.value[resource.identifier] = cloneDeep(resource))
    resources.value.forEach(resource => {
        if (resource.type === 'MENU_BUTTON') {
            menuButtonsMap.value[resource.identifier] = cloneDeep(resource)
        }
    })
}

export const sysUserResourcesProvider: SysUserResourcesProvider = {
    key: ProviderKeys.SYS_USER_RESOURCES,
    data: {
        resources: ref<SysResourceViewVO[]>([]),
        resourcesMap: ref<ResourceMap>({}),
        menuButtonsMap: ref<ResourceMap>({})
    },
    initData
}