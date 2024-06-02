import React from 'react';

const Icon: React.FC<{ name: string }> = ({ name }) => {
    return <React.Suspense fallback={<></>}>
        {
            React.createElement(
                React.lazy(
                    () => import('@ant-design/icons').then(module => {
                        return { default: module[name] };
                    })
                ), {}
            )
        }
    </React.Suspense>
}

export default Icon;