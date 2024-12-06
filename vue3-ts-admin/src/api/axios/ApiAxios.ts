import { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import AxiosExt from "./AxiosExt"
import router from '@/router'
import { message } from 'ant-design-vue';
import { useSysLoginedUserStore } from "@/store/modules/SysLoginedUser"

// 1. request
// before request
const requestOnFulfilled: (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> = (config) => {
    // 如果 store 中有 token，每次请求都携带 token
    const sysLoginedUserStore = useSysLoginedUserStore()
    if (sysLoginedUserStore.user.logined) {
        config.headers.set("Authorization", sysLoginedUserStore.user.token)
    }
    return config
}
// request failed
const requestOnRejected: (error: any) => any = (error: any): any => {
    console.log(`请求失败: ${error}`)
    return Promise.reject(error)
}

// 2. response
// response success
const responseOnFulfilled: ((response: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) = (response: AxiosResponse<any, any>) => {
    const responseStatusCode = response.status

    response.data = JSON.parse(response.data)    

    switch (responseStatusCode) {
        case 200: {
            if (response.data.code !== 0) {
                message.error(response.data.message)
                return Promise.reject(response.data.message)
            }
            return response
        }

        case 401:
            router.push(
                { path: '/login', query: { tip: "后端拦截：登录过期，请重新登录" } }
            )
            break
            
        case 403:
            router.push({ path: '/403', replace: true })
            break

        case 500:
            message.error("服务器异常")
            break

        default:
            break
    }

    return Promise.reject(response.data.message) 
}
// response failed
const responseOnRejected: (error: any) => any = (error) => {
    console.log(`响应异常: ${error}`)
    return Promise.reject(error)
}

const ApiAxios = new AxiosExt({
    baseURL: import.meta.env.VITE_API_URL
})
ApiAxios.interceptors.request.use(requestOnFulfilled, requestOnRejected)
ApiAxios.interceptors.response.use(responseOnFulfilled, responseOnRejected,)

export default ApiAxios