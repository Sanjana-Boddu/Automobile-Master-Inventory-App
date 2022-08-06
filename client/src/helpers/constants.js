import { Add } from '../Add/Add';
import { Cars } from '../Cars/Cars';
import { Login } from '../Login/Login';
import { Logout } from '../Logout/Logout';

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
    {
        route: '/logout',
        text: 'Logout',
        component: <Logout />,
    }
];

export const privateList = [
    {
        route: '/',
        text: 'Cars',
    },
    {
        route: '/add',
        text: 'Add Car',
    },
    {
        route: '/logout',
        text: 'Logout',
    },
];

export const publicList = [
    {
        route: '/login',
        text: 'Login',
    },
];

