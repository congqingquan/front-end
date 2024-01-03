import PropTypes from "prop-types";

let boxStyle = {
    width: 200,
    height: 200,
    backgroundColor: 'black',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
};

// 1. ES6
// const Component = ({ name = 'cortana', age = 20 }) => {
//     return (
//         <div style={boxStyle}>
//             Child component. Name: [{name}], age: [{age}]
//         </div>
//     );
// };

// 2. React 的 defaultProps
const Component = ({ name, age }) => {
    return (
        <div style={boxStyle}>
            Child component. Name: [{name}], age: [{age}]
        </div>
    );
};
Component.defaultProps = {
    name: 'cortana',
    age: 20,
};
// 3. React 的 defaultProps 的类型
Component.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number
};
const App = () => {
    return (
        <>
            <Component age="19" />
        </>
    );
};

export default App;
