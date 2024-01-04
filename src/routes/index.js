import React from 'react';
import Root from '../root/';

import Main from '../pages/Main/';
import Login from '../pages/Login';
import Statistics from '../pages/Statistics';
import Attendance from '../pages/Attendance';

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
                element: <Statistics />,
                path: '/statistics'
            },
            {
                element: <Attendance />,
                path: '/attendance'
            }

        ]
    }
]