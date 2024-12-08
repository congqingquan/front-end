import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { message } from "antd";
import AxiosExt from ".";
import { RouterTable } from '@/router';
import Constants from "@/common/Constants";

// 1. request
// before request
const requestOnFulfilled: (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> = (config) => {
    // 如果 local storage 中有 token，每次请求都携带 token
    let adminToken = window.localStorage.getItem(Constants.LOGINED_USER_INFO_KEY);
    if (adminToken) {
        config.headers.set("Authorization", JSON.parse(adminToken).token);
    }
    return config;
}
// request failed
const requestOnRejected: (error: any) => any = (error: any): any => {
    console.log(`请求失败: ${error}`);
    return Promise.reject(error);
}

// 2. response
// response success
const responseOnFulfilled: ((response: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) = (response: AxiosResponse<any, any>) => {
    const responseStatusCode = response.status;

    response.data = JSON.parse(response.data);

    switch (responseStatusCode) {
        case 200: {
            if (response.data.code !== 0) {
                message.error(response.data.message);
                return Promise.reject(response.data.message);
            }
            break;
        }

        case 401:
            RouterTable.navigate("/login?tip=后端拦截：登录过期，请重新登录");
            break;

        case 403:
            RouterTable.navigate("/403");
            break;

        case 500:
            message.error("服务器异常");
            break;

        default:
            break;
    }
    return response;
}
// response failed
const responseOnRejected: (error: any) => any = (error) => {
    console.log(`响应异常: ${error}`);
    return Promise.reject(error);
}

const AdminAxios = new AxiosExt({
    baseURL: "http://localhost:7070/api"
});
AdminAxios.interceptors.request.use(requestOnFulfilled, requestOnRejected);
AdminAxios.interceptors.response.use(responseOnFulfilled, responseOnRejected, );

export default AdminAxios;