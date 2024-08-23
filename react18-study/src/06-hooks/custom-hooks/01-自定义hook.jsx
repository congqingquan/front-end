import useMouse from './useMouse.jsx';

// 自定义 hook 是一个函数，函数内部可以调用其他 hook 函数，且以 use 开头命名。主要作用是对逻辑功能进行封装，达到一种复用能力。

export default () => {
    let mouse = useMouse();
    console.log(mouse);

    return (
        <div>
            PageX: {mouse.pageX}, PageY: {mouse.pageY}
        </div>
    );
};
