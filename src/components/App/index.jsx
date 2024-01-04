import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';
import Login from '../Login';

const App = () => {
    const content = useRoutes(routes);
    return (
        <div>
            <Login />
            {content}
        </div>
    )
}

export default App;