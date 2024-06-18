// 1. 部分属性可选
export type SomePropPartial<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] } & { [P in K]?: T[P] };

export type ExtractLiteralValue<T, K extends keyof T> = T[K];

export type ExtractAllPropsType<T> = T[keyof T];