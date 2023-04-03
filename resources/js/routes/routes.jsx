import Welcome from '../pages/Welcome';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/AUth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
/*
import Archive from '../pages/Archive';
import NoMatch from '../pages/NoMatch';
*/

const routes = [
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login,
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register,
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword,
    },
    {
        path: '/reset-password',
        exact: true,
        auth: false,
        component: ResetPassword,
    },
   /* {
        path: '/archive',
        exact: true,
        auth: true,
        component: Archive,
    },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch,
    },*/
];
export const privateRoutes = [
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: Dashboard,
        fallback: Welcome,
    },
]

export default routes;
