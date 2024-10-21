let boxStyle = { width: 200, height: 200, backgroundColor: 'red', margin: 10 };

const Component1 = () => {
    return <div style={boxStyle}>Component 1</div>;
};

const Component2 = () => {
    return <div style={boxStyle}>Component 2</div>;
};

const App = () => {
    return (
        <>
            <Component1 />
            <Component2></Component2>
            <div style={boxStyle}>App</div>
        </>
    );
};

export default App;
