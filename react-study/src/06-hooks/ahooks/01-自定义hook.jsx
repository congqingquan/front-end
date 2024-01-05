import useMouse from './useMouse.jsx';

export default () => {
    let mouse = useMouse();
    console.log(mouse);

    return (
        <div>
            PageX: {mouse.pageX}, PageY: {mouse.pageY}
        </div>
    );
};
