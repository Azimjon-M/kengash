import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';
import './style.css';

const App = () => {
    const content = useRoutes(routes);
    return (
        <div>
            {content}
        </div>
    )
}

export default App;