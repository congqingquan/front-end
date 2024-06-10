import { Supplier } from "./Functions";

class Cache {

    private static readonly CACHE_MAP = new Map<any, any>();

    // ==================== Sync ====================

    public static set<V>(key: any, value: V): V {
        Cache.CACHE_MAP.set(key, value);
        return value;
    }

    public static get<V>(key: any): V | undefined {
        return Cache.CACHE_MAP.get(key);
    }

    public static getAndSet<V>(key: any, defaultValue: Supplier<V>): V {
        const value = Cache.get<V>(key);
        return value ? value : Cache.set(key, defaultValue());
    }

    public static delete(key: any): void {
        Cache.CACHE_MAP.delete(key);
    }

    // ==================== Async ====================

    public static async setAsync<V>(key: any, value: Promise<V>): Promise<V> {
        const v = await value;
        Cache.set(key, v);
        return v;
    }

    public static async getAndSetAsync<V>(key: any, defaultValue: Supplier<Promise<V>>): Promise<V> {
        const value = Cache.get<V>(key);
        return value ? value : Cache.setAsync(key, defaultValue());
    }
}

export default Cache;