import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';
<<<<<<< HEAD
import Login from '../Login';
=======
import './style.css';
>>>>>>> 2430ac4bad2a6e94d8bc4dfbc2801d39cf5e6ee3

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