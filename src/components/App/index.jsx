import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import './style.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

const App = () => {

    const location = useLocation();

    const noNavLink = ['/'];

    const hideNavbarFooter = noNavLink.includes(location.pathname);

    const content = useRoutes(routes);

    return (
        <div>
            {!hideNavbarFooter && <Navbar />}
            {content}
            {!hideNavbarFooter && <Footer />}
        </div >
    )
}

export default App;