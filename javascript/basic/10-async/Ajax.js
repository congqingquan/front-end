class HttpForbiddenError extends Error {
    status = 403;
    constructor(message) {
        super(message);
    }
}

class HttpNotFoundError extends Error {
    status = 404;
    constructor(message) {
        super(message);
    }
}

class Ajax {
    static get(url, params) {

        url = url.concat("?", Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&"));

        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", url);
            request.send();
            request.onload = function () {
                // 与服务器建立连接成功后的各种请求情况
                switch (this.status) {
                    case 200:
                        resolve(JSON.parse(this.response));
                        break;
                    case 403:
                        reject(new HttpForbiddenError());
                        break;
                    case 404:
                        reject(new HttpNotFoundError());
                        break;
                    default:
                        reject(this);
                }
            }
            // 未能与服务器建立连接
            request.onerror = function () {
                reject(this);
            }
        });
    }
}

export {
    Ajax as default,
    HttpForbiddenError, HttpNotFoundError
}