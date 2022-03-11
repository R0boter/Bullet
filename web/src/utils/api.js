import http from './http';

export const LoginApi = (model) => http.post('/admin/login', model);

export const RegisterApi = (model) => http.post('/admin/register', model);

export const UserApi = () => http.get('/admin/user');

export const UserEditApi = (model) => http.put('/admin/user', model);
