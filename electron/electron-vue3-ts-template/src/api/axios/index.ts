// import {AxiosResponse, InternalAxiosRequestConfig} from "axios"
// import AxiosExt from "./AxiosExt"
// import {message} from 'ant-design-vue';
// import {ApiResult} from "@/api/Types";
//
// // 1. request
// // before request
// const requestOnFulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
// 	= (config) => {
// 	// 如果 store 中有 token，每次请求都携带 token & tenantId
// 	const sysLoginUserStore = useSysLoginUserStore()
// 	if (sysLoginUserStore.user.login) {
// 		if (sysLoginUserStore.user.token) {
// 			config.headers.set("Authorization", sysLoginUserStore.user.token)
// 		}
// 		if (sysLoginUserStore.user.tenantId) {
// 			config.headers.set("TenantId", sysLoginUserStore.user.tenantId)
// 		}
// 	}
// 	return config
// }
// // request failed
// const requestOnRejected = (error: unknown) => {
// 	return Promise.reject(error)
// }
//
// // 2. response
// // response success
// const responseOnFulfilled = async (response: AxiosResponse) => {
// 	const contentType = response.headers['content-type'] || response.headers['Content-Type']
// 	// 1. Handle json data
// 	if (contentType && contentType.includes('application/json')) {
// 		const data: ApiResult<unknown> = JSON.parse(response.data)
// 		// reset response data
// 		response.data = data
// 		const responseMessage = data.message
// 		switch (response.status) {
// 			case 200: {
// 				if (data.code !== 0) {
// 					await message.error(responseMessage)
// 					throw new Error(responseMessage)
// 				}
// 				return response
// 			}
// 			case 401:
// 				await router.push(
// 					// {path: '/login', query: {tip: "后端拦截：登录过期，请重新登录"}}
// 					{path: '/login', query: {tip: "登录过期，请重新登录"}}
// 				)
// 				break
// 			case 403:
// 				await router.push({path: '/403', replace: true})
// 				break
// 			case 404:
// 				await router.push({path: '/404', replace: true})
// 				break
// 			case 500:
// 				await message.error("服务器异常")
// 				break
// 			default: break
// 		}
// 	}
// 	// 2. Handle other data
// 	// else if (contentType.includes('')) {}
// 	return response
// }
// // response failed
// const responseOnRejected = (error: unknown) => {
// 	return Promise.reject(error)
// }
//
// const axios = new AxiosExt({
// 	baseURL: import.meta.env.VITE_API_URL
// })
// axios.interceptors.request.use(requestOnFulfilled, requestOnRejected)
// axios.interceptors.response.use(responseOnFulfilled, responseOnRejected)
//
// export default axios
