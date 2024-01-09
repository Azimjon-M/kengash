import React, {useState} from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import './style.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Main from '../../pages/Main';

const App = () => {

    const [ token, setToken ] = useState(window.localStorage.getItem('token'))

    const location = useLocation();

    const noNavLink = ['/'];

    const hideNavbarFooter = noNavLink.includes(location.pathname);

    const content = useRoutes(routes);

    return (
        <div>
            {
                token ? (
                    <Main />
                ) : (
                    < div >
                        {!hideNavbarFooter && <Navbar />}
                        {content}
                        {!hideNavbarFooter && <Footer />}
                    </div>
                )

            }
        </div >
    )
}

export default App;