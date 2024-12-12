class ArrayUtils {

    public static isEmpty(arr: any[]) {
        return !arr || arr.length <= 0;
    }
    
    public isNotEmpty(arr: any[]) {
        return !ArrayUtils.isEmpty(arr);
    }
}

export default ArrayUtils;