class ArrayUtils {

    public static isEmpty(arr: any[]) {
        return !arr || arr.length <= 0;
    }
    
    public static isNotEmpty(arr: any[]) {
        return !ArrayUtils.isEmpty(arr);
    }
}

export default ArrayUtils;