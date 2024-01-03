import React from 'react';
import { Link } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';

const App = () => {
    const content = useRoutes(routes);
    return (
        <div>
            <button className="btn btn-neutral">
                <Link to="/">Main</Link>
            </button>
            <button className="btn btn-accent">
                <Link to="/login">Login</Link>
            </button>
            {content}
        </div>
    )
}

export default App;