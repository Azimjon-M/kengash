import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';
import './style.css';
import Navbar from '../Navbar';

const App = () => {
    const content = useRoutes(routes);
    return (
        <div>
            <Navbar />
            {content}
        </div>
    )
}

export default App;