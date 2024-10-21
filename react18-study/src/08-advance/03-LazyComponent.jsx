let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const App = () => {
    // callUnknownFunc();
    console.log('init component');
    return <div style={boxStyle}>Lazy Component</div>;
};
export default App;
