export function isEmpty(arr: any[]) {
    return !arr || arr.length <= 0;
}

export function isNotEmpty(arr: any[]) {
    return !isEmpty(arr);
}