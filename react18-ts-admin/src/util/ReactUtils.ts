import React from 'react';

export function loadComponent(module: string, component: string): React.ReactNode {
    return React.createElement(
        React.lazy(
            () => import(module).then(module => {
                return { default: module[component] };
            })
        ), 
    {});
}