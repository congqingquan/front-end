import React from 'react';

// ModuleMapping: 解决 Vite 动态导入组件时，不支变量参数
const ModuleMapping = {
    antdIcon(name: string) {
        return async () => import('@ant-design/icons').then(module => {  
            return { default: module[name] };
        })
    },
    // adminPage(name: string) {
    //     const pages = import.meta.glob('@/pages/**.tsx');
    //     console.log(pages);
        
    //     return async () => import.meta.glob(`@/pages/index.tsx`).then()
    //     // .then(module => {  
    //     //     return { default: module[name] };
    //     // })
    // }
}

const AsyncComponent: React.FC<{ module: keyof typeof ModuleMapping, name: string }> = ({ module, name }) => {
    return module && name && <React.Suspense fallback={<></>}>
        {
            React.createElement(
                React.lazy(
                    ModuleMapping[module](name)
                ), {}
            )
        }
    </React.Suspense>
}

export default AsyncComponent;