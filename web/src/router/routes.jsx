import { lazy } from 'react';

import AdminIndex from 'pages/admin/Index';
import WebIndex from 'pages/web/Index';
// admin 路由组件
const Main = lazy(() => import('pages/admin/Main'));
const Login = lazy(() => import('pages/admin/Login'));
const Register = lazy(() => import('pages/admin/Register'));
const Home = lazy(() => import('pages/admin/Home'));
const User = lazy(() => import('pages/admin/User'));

// web 路由组件

const Routes = () => [
  {
    path: '/admin',
    element: <AdminIndex />,
    children: [
      {
        path: 'home',
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
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: <WebIndex />,
    children: [],
  },
];

export default Routes;
