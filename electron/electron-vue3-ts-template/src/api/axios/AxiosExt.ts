import {Axios, AxiosResponse, AxiosRequestConfig} from "axios";

type AxiosMethod = <ResponseData, RequestData = unknown>
(url: string, data?: RequestData, config?: AxiosRequestConfig) => Promise<AxiosResponse<ResponseData>>

export interface AxiosInstanceExt {
	postJSON: AxiosMethod;
}

export default class AxiosExt extends Axios implements AxiosInstanceExt {

	public constructor(config?: AxiosRequestConfig) {
		super(config);
	}

	public postJSON: AxiosMethod = (url, data, config = { headers: {'Content-Type': 'application/json'} }) => {
		// reset header > content-type
		if (config.headers) {
			config.headers["Content-Type"] = 'application/json'
		}
		return this.post(url, JSON.stringify(data), config);
	}

	public postMultipartForm: AxiosMethod = (url, data, config = {headers: {'Content-Type': 'multipart/form-data'}}) => {
		// reset header > content-type
		if (config.headers) {
			config.headers["Content-Type"] = 'multipart/form-data'
		}
		const form = new FormData();
		Object.entries(data ?? {}).forEach(([key, value]) => {
			let finalValue: string | Blob;
			if (value instanceof Blob) {
				finalValue = value;
			} else if (typeof value === 'string') {
				finalValue = value;
			} else {
				finalValue = JSON.stringify(value);
			}
			form.append(key, finalValue);
		});

		return this.post(url, form, config);
	}
}
