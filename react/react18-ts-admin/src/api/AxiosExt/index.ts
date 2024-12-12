import { Axios, AxiosResponse, AxiosRequestConfig } from "axios";

export interface AxiosInstanceExt extends Axios {
    postJSON: <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D) => Promise<R>;
}

class AxiosExt extends Axios implements AxiosInstanceExt {
    public constructor(config?: AxiosRequestConfig) {
        super(config);
    }
    public postJSON: <T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined) => Promise<R> = (url, data) => {
        return this.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default AxiosExt;