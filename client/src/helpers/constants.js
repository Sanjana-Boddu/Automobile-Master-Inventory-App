import { Add } from '../Add/Add';
import { Cars } from '../Cars/Cars';
import { Login } from '../Login/Login';

export const API = 'http://localhost:3001';

export const list = [
    {
        route: '/',
        text: 'Cars',
        component: <Cars />,
    },
    {
        route: '/add',
        text: 'Add Car',
        component: <Add />,
    },
    {
        route: '/login',
        text: 'Login',
        component: <Login />,
    },
];
