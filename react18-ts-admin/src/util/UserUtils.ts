import Constants from "@/constants";

export interface User {
    userId: string
    username: string
    name: string
    avatar: string | null
    email: string | null
    gender: string
    status: string
}

class UserUtils {

    public static getToken(): string | null {
        let userInfoJson = localStorage.getItem(Constants.LOGINED_USER_INFO_KEY);
        if (!userInfoJson) {
            return null;
        }
        return JSON.parse(userInfoJson).token;
    }

    public static getUser(): User | null {
        let userInfoJson = localStorage.getItem(Constants.LOGINED_USER_INFO_KEY);
        if (!userInfoJson) {
            return null;
        }
        return JSON.parse(userInfoJson).info;
    }

    public static logout(): void {
        localStorage.removeItem(Constants.LOGINED_USER_INFO_KEY);
    }
}

export default UserUtils;