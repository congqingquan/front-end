import { useState } from 'react';

let boxStyle = {
    width: 300,
    height: 200,
    backgroundColor: 'black',
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
};

const Component = ({ checked, onChange }) => {
    return (
        <div style={boxStyle}>
            <input type="checkbox" checked={checked} onChange={onChange} />
        </div>
    );
};
const App = () => {
    let [checked, setChecked] = useState(true);
    let onChange = () => {
        setChecked((prevState) => {
            console.log(!prevState);
            return !prevState;
        });
    };
    console.log('init component');
    return (
        <>
            <Component checked={checked} onChange={onChange} />
        </>
    );
};

export default App;
