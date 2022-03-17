import { lazy } from 'react';
import Main from 'pages/Main';

const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Home = lazy(() => import('pages/Home'));
const User = lazy(() => import('pages/User'));

const Routes = () => [
  {
    path: '/admin',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

export default Routes;
