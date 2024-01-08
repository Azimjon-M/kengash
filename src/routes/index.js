import React from 'react';
import Root from '../root/';

import Main from '../pages/Main/';
import Login from '../pages/Login';
import Statistika from '../pages/Statistika';
import Azolar from '../pages/Azolar';
import Davomat from '../pages/Davomat';
import Takliflar from '../pages/Takliflar';
import AddAzoCom from '../components/AddAzoCom';

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
                element: <AddAzoCom />,
                path: '/azolar/addAzo'
            },
            {
                element: <Davomat />,
                path: '/davomat'
            },
            {
                element: <Takliflar />,
                path: "/takliflar"
                
            },
            {
                element: <Statistika />,
                path: '/statistika'
            },
        ]
    }
]