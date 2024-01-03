import React from 'react';
import Root from '../root/';

import Main from '../pages/Main/';
import Login from '../pages/Login';

export const routes = [
    {
        element: <Root />,
        path: '/',
        children: [
            {
                element: <Main />,
                path: '/'
            },
            {
                element: <Login />,
                path: '/login'
            }

        ]
    }
]