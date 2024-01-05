import { useEffect, useState } from 'react';

const useMouse = () => {
    let [state, setState] = useState({
        pageX: NaN,
        pageY: NaN,
    });

    console.log('before');

    useEffect(() => {
        const changeState = (e) => {
            setState({
                pageX: e.pageX,
                pageY: e.pageY,
            });
        };
        document.addEventListener('mousemove', changeState);
        return () => {
            // 由于 return 的没有渲染内容，目前看来 after 永远不会被打印
            console.log('after ');
            document.removeEventListener('mousemove', changeState);
        };
    }, []);

    return state;
};

export default useMouse;
