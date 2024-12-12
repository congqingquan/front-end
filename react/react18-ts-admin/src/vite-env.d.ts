// <reference types="vite/client" />
// type ReducerState = ReturnType<typeof import('@/store').getState>
declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.png' {
    const classes: string;
    export default classes;
}
