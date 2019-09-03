import React from 'react';
import { Redirect } from 'react-router-dom';

import { PlatformerConfig } from 'pages/Platformer/PlatformerConfig';


let routeConfig = [
    PlatformerConfig
]

export const routes: object[] = [
    ...routeConfig,
    {
        path: '/',
        component: () => <Redirect to="/game" />
    }
];