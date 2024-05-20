import axios, { AxiosInstance } from "axios"

const AdminAxios: AxiosInstance = axios.create({
    baseURL: "http://localhost:9090/admin",
});

AdminAxios.interceptors.request.use(config => {
    // 如果 local storage 中的 token 未过期，每次请求都携带 token
    let adminToken = window.localStorage.getItem("admin-token");
    if (adminToken) {
        config.headers.set("admin-token", adminToken)
    }
    return config;
}, error => {
    console.log(`请求失败: ${error}`);
});


// 测试 export new Object()，否是每次 import 都会创建一个对象

export {
    AdminAxios
};