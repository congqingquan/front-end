import { ErrorBoundary } from 'react-error-boundary';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// 第三方支持库：react-error-boundary
// 默认情况下，如果您的应用程序在渲染期间抛出错误，React 将从屏幕上移除其 UI。
// 为防止这种情况，您可以将 UI 的一部分包装到错误边界中。错误边界是一种特殊组件，可让您显示一些后备 UI而不是崩溃的部分，例如错误消息

const Component = () => {
    callUnknownFunc();
    return <div style={boxStyle}>My Component</div>;
};

const App = () => {
    return (
        <div style={boxStyle}>
            APP Component
            {/* 包裹将需要被捕捉的元素，并设置发生异常无法渲染时的备用 UI */}
            <ErrorBoundary fallback={<div>Error</div>}>
                <Component />
            </ErrorBoundary>
        </div>
    );
};

export default App;
