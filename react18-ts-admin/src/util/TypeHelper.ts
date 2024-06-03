// 1. 部分属性可选
export type SomePropPartial<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] } & { [P in K]?: T[P] }