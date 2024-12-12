import { useMemberInfoStore } from "@/stores/modules/MemberInfo"
import { ApiResult, RequestOptionsExt } from "@/types"

class UniRequestExt {

    // =================================================== Interceptor ===================================================

    private static onResponseFulfiled: (response: UniApp.RequestSuccessCallbackResult) => any = (response) => response

    private static onResponseRejected: (reason: any) => any = (reason) => reason

    // 注册 request 默认前置拦截
    public static registerDefaultRequestInterceptor() {
        // 本机发送请求前
        uni.addInterceptor('request', {
            invoke(options: UniApp.RequestOptions) {
                // 1. Source-Client
                options.header = {
                    ...options.header,
                    'Client-Platform': uni.getSystemInfoSync().uniPlatform
                }
                // 2. token 
                const memberInfoStore = useMemberInfoStore()
                const token = memberInfoStore.member.token
                if (token) {
                    options.header.Authorization = token
                }
            }
        })
    }

    // 注册 response 默认前置拦截
    public static registerDefaultResponseInterceptor() {
        // 服务响应成功
        UniRequestExt.onResponseFulfiled = (response: UniApp.RequestSuccessCallbackResult) => {
            switch (response.statusCode) {
                case 200: {
                    let apiResponseData = response.data
                    // 检查接口的业务响应码
                    if (typeof apiResponseData === 'object') {
                        if (!(apiResponseData instanceof ArrayBuffer) && apiResponseData.code !== 0) {
                            uni.showToast({
                                icon: 'none',
                                title: apiResponseData.message
                            })
                            return Promise.reject(apiResponseData.message)
                        }
                    }
                    return apiResponseData
                }

                case 401:
                    uni.showToast({
                        icon: 'none',
                        title: '未登录'
                    })
                    uni.navigateTo({
                        url: '/pages/login/login'
                    })
                    return Promise.reject("未登录")

                case 500:
                    uni.showToast({
                        icon: 'none',
                        title: '服务器异常'
                    })
                    return Promise.reject("服务器异常")

                default:
                    return Promise.reject('无法处理的 HttpStatus')
            }
        }

        // 本机发起请求失败
        UniRequestExt.onResponseRejected = (reason) => {
            uni.showToast({
                icon: 'none',
                title: '网络异常'
            })
            return Promise.reject(reason)
        }
    }

    // =================================================== HTTP API ===================================================

    private static doUniRequest<D, R>(options: RequestOptionsExt<D>): Promise<R> {
        return uni.request(options as UniNamespace.RequestOptions).then(UniRequestExt.onResponseFulfiled, UniRequestExt.onResponseRejected)
    }

    public static get<D, R>(
        url: string,
        urlParams: D,
        header?: AnyObject
    ): Promise<R> {
        return UniRequestExt.doUniRequest({
            method: 'GET',
            url: url,
            header,
            data: urlParams
        })
    }

    public static postForm<D, R>(
        url: string,
        data: D,
        header?: AnyObject
    ): Promise<R> {
        return UniRequestExt.doUniRequest({
            method: 'POST',
            url: url,
            header: {
                ...header,
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            data,
            dataType: 'form'
        })
    }

    public static postJSON<D, R>(
        url: string,
        data: D,
        header?: AnyObject
    ): Promise<R> {
        return UniRequestExt.doUniRequest<D, R>({
            method: 'POST',
            url: url,
            header: {
                ...header,
                'Content-Type': 'application/json; charset=utf-8'
            },
            data,
            dataType: 'json'
        })
    }
}

export default UniRequestExt