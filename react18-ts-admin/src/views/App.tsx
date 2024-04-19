import { Outlet } from 'react-router-dom';

const App = () => {
    return (
        <div className="App">
            {/*<Link to="/home">Home</Link>*/}
            {/*<Link to="/about">About</Link>*/}
            {/*<hr />*/}

            {/* children */}
            <Outlet></Outlet>
        </div>
    );
};

export default App;
