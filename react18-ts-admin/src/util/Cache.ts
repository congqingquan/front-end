import { Supplier } from "./Functions";

class Cache {

    private static readonly cacheMap = new Map<any, any>();

    public static set(key: any, value: any): void {
        this.cacheMap.set(key, value);
    }

    public static get<V>(key: any): V | undefined {
        return this.cacheMap.get(key);
    }

    public static getAndSet<V>(key: any, defaultValue: Supplier<V>): V {
        const value = this.cacheMap.get(key);
        return value ? value : defaultValue();
    }
}

export default Cache;