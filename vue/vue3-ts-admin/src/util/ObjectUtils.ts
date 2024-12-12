export default class ObjectUtils {
    
    public static default<T>(obj: any, defaultValue: T): T {
        return obj ? obj : defaultValue
    }
}