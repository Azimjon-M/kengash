import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import './style.css';
import Navbar from '../Navbar';

const App = () => {

    const location = useLocation();

    const noNavLink = ['/'];

    const hideNavbar = noNavLink.includes(location.pathname);

    const content = useRoutes(routes);
    
    return (
        <div>
            {!hideNavbar && <Navbar />}
            {content}
        </div>
    )
}

export default App;