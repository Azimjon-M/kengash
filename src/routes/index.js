import React from 'react';
import Root from '../root/';

import Main from '../pages/Main/';
import Login from '../pages/Login';
import Statistika from '../pages/Statistika';
import Azolar from '../pages/Azolar';
import Davomat from '../pages/Davomat';

export const routes = [
    {
        element: <Root />,
        path: '/',
        children: [
            {
                element: <Login />,
                path: '/'
            },
            {
                element: <Main />,
                path: '/asosiy'
            },
            {
                element: <Azolar />,
                path: '/azolar'
            },
            {
                element: <Davomat />,
                path: '/davomat'
            },
            {
                element: <Statistika />,
                path: '/statistics'
            },
        ]
    }
]