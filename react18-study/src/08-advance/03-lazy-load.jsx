import { lazy, Suspense, useState } from 'react';
import lazyComponent from './03-LazyComponent.jsx';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// lazy 函数与 Suspense 组件结合实现组件懒加载

const delay = (importPromise, timeout) => {
    return new Promise((resolve) => setTimeout(() => resolve(importPromise), timeout)).then(
        (onFulfilled) => onFulfilled,
    );
};

console.log('import: ', import('./03-LazyComponent.jsx'));
console.log('lazy: ', lazyComponent);
const LazyComponent = lazy(() => delay(import('./03-LazyComponent.jsx'), 2000));

const App = () => {
    const [showLazy, setShowLazy] = useState(false);

    return (
        <div style={boxStyle}>
            <label>
                <input type="checkbox" checked={showLazy} onChange={(e) => setShowLazy(e.target.checked)} />
                Trigger load
            </label>
            <hr />
            {showLazy && (
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent />
                </Suspense>
            )}
        </div>
    );
};

export default App;
