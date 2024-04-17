import { Outlet } from 'react-router-dom';

const App = () => {
    return (
        <div className="App">
            This is App page
            <hr />
            {/* children */}
            <Outlet></Outlet>
        </div>
    );
};

export default App;
